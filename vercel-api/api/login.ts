
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { lucia } from "../lib/lucia.js";
import { pg } from "../lib/pg.js";

function setCorsHeaders(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://plowsters.github.io/csumb-ilp");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Login handler started");
    console.log("Environment variables check:", {
      hasAdminUsername: !!process.env.ADMIN_USERNAME,
      hasAdminPassword: !!process.env.ADMIN_PASSWORD,
      hasDbUrl: !!process.env.NEON_TECH_DB_URL
    });
    
    // Parse body manually to avoid undefined issues
    let body;
    if (req.body) {
      body = req.body;
    } else {
      const rawBody = await new Promise((resolve, reject) => {
        let data = "";
        req.on("data", (chunk: any) => (data += chunk));
        req.on("end", () => resolve(data));
        req.on("error", reject);
      });
      body = JSON.parse(rawBody as string);
    }

    const { username, password } = body;

    console.log("Login attempt for username:", username);

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      console.log("Invalid credentials provided");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("Credentials valid, querying database...");
    
    // Test database connection with detailed error handling
    try {
      const rows = await pg`SELECT id, username FROM users WHERE username = ${username}`;
      console.log("Database query successful, found rows:", rows.length);
      
      if (!rows[0]) {
        console.log("User not found in database");
        return res.status(401).json({ error: "User not found" });
      }

      console.log("Creating session for user:", rows[0].username);
      const session = await lucia.createSession(rows[0].id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      
      res.setHeader("Set-Cookie", sessionCookie.serialize());
      console.log("Login successful");
      return res.status(200).json({ success: true, user: { username: rows[0].username } });
    } catch (dbError) {
      console.error("Database error:", dbError);
      throw dbError; // Re-throw to be caught by outer catch
    }
  } catch (error) {
    console.error("Login error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : "No stack trace";
    console.error("Error stack:", errorStack);
    return res.status(500).json({ 
      error: "Internal server error", 
      details: errorMessage,
      type: error?.constructor?.name || "Unknown"
    });
  }
}

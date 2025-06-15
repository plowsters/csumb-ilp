
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { lucia } from "../lib/lucia.js";
import { pg } from "../lib/pg.js";

function setCorsHeaders(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://plowsters.github.io");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
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
    console.log("Environment check - ADMIN_USERNAME exists:", !!process.env.ADMIN_USERNAME);
    console.log("Environment check - ADMIN_PASSWORD exists:", !!process.env.ADMIN_PASSWORD);

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Use postgres library syntax - call pg directly as a function
    const rows = await pg`SELECT id, username FROM users WHERE username = ${username}`;

    if (!rows[0]) {
      return res.status(401).json({ error: "User not found" });
    }

    const session = await lucia.createSession(rows[0].id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    
    res.setHeader("Set-Cookie", sessionCookie.serialize());
    return res.status(200).json({ success: true, user: { username: rows[0].username } });
  } catch (error) {
    console.error("Login error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: "Internal server error", details: errorMessage });
  }
}

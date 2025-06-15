
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { lucia } from "../lib/lucia.js";

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

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Auth check - Cookie header:", req.headers.cookie ? "exists" : "missing");
    
    const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
    
    if (!sessionId) {
      console.log("No session ID found in cookies");
      return res.status(401).json({ error: "Not authenticated" });
    }

    console.log("Session ID found, validating...");
    const { session, user } = await lucia.validateSession(sessionId);
    
    if (!session) {
      console.log("Session validation failed");
      return res.status(401).json({ error: "Invalid session" });
    }

    console.log("Session valid for user:", user.username);
    return res.status(200).json({ user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error("Auth validation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: "Authentication failed", details: errorMessage });
  }
}

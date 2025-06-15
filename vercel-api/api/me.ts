
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
    const authorizationHeader = req.headers.authorization;
    const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
    
    if (!sessionId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { session, user } = await lucia.validateSession(sessionId);
    
    if (!session) {
      return res.status(401).json({ error: "Invalid session" });
    }

    return res.status(200).json({ user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error("Auth validation error:", error);
    return res.status(401).json({ error: "Authentication failed" });
  }
}


import type { VercelRequest, VercelResponse } from '@vercel/node';
import { lucia } from "../lib/lucia.js";

const ALLOWED_ORIGINS = [
  "https://plowsters.github.io",
  "https://plowsters.github.io/csumb-ilp"
];

function setCorsHeaders(res: VercelResponse, origin?: string) {
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin || '') ? origin : ALLOWED_ORIGINS[0];
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization");
  res.setHeader("Access-Control-Max-Age", "86400");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;
  setCorsHeaders(res, origin);

  if (req.method === "OPTIONS") {
    console.log("Preflight request received from origin:", origin);
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

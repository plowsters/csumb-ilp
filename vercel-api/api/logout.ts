
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { lucia } from "../lib/lucia.js";

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
    const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
    
    if (sessionId) {
      await lucia.invalidateSession(sessionId);
    }

    const blankCookie = lucia.createBlankSessionCookie();
    res.setHeader("Set-Cookie", blankCookie.serialize());
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: "Internal server error", details: errorMessage });
  }
}

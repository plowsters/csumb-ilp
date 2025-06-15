
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { lucia, authError } from "../lib/lucia.js";

const ALLOWED_ORIGINS = [
  "https://plowsters.github.io",
  "https://plowsters.github.io/csumb-ilp"
];

function setCorsHeaders(res: VercelResponse, origin?: string) {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
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
    console.log("Preflight request received for /api/logout, responding with 200 OK.");
    return res.status(200).end();
  }
  
  if (authError) {
    console.error("Auth/DB Initialization Error:", authError);
    return res.status(500).json({ error: "Server initialization failed", details: authError.message });
  }

  if (!lucia) {
    console.error("Critical Error: Lucia is null without a corresponding authError.");
    return res.status(500).json({ error: "Server misconfiguration" });
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
    const cookieString = blankCookie.serialize();
    const enhancedCookie = cookieString.replace(/SameSite=lax/i, 'SameSite=None; Secure');
    
    res.setHeader("Set-Cookie", enhancedCookie);
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: "Internal server error", details: errorMessage });
  }
}

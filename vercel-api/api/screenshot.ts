
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';
import { lucia, authError } from "../lib/lucia.js";
import { pg, pgError } from "../lib/pg.js";

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
    console.log("Preflight request received for screenshot, responding with 200 OK.");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Check auth
  if (authError || !lucia) {
    console.error("Auth/DB Initialization Error on protected route:", authError);
    return res.status(500).json({ error: "Server authentication misconfigured" });
  }

  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
  if (!sessionId) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const { session } = await lucia.validateSession(sessionId);
  if (!session) {
    return res.status(401).json({ error: "Invalid session" });
  }

  // Check database
  if (pgError) {
    console.error("DB Initialization Error:", pgError);
    return res.status(500).json({ error: "Database connection failed", details: pgError.message });
  }

  if (!pg) {
    console.error("Critical Error: PG is null without a corresponding pgError.");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const apiKey = process.env.SCREENSHOT_API_KEY;
  if (!apiKey) {
    console.error("SCREENSHOT_API_KEY environment variable not set");
    return res.status(500).json({ error: "Screenshot service not configured" });
  }

  try {
    console.log(`Generating screenshot for URL: ${url}`);
    
    // Generate screenshot using screenshotmachine.com API with your key
    const screenshotUrl = `https://api.screenshotmachine.com?key=${apiKey}&url=${encodeURIComponent(url)}&dimension=1920x1080&format=png`;
    
    console.log(`Fetching screenshot from: ${screenshotUrl}`);
    
    // Fetch the screenshot image
    const screenshotResponse = await fetch(screenshotUrl);
    
    if (!screenshotResponse.ok) {
      throw new Error(`Screenshot API returned ${screenshotResponse.status}`);
    }
    
    const screenshotBuffer = await screenshotResponse.arrayBuffer();
    
    // Generate a filename based on the URL
    const urlObj = new URL(url);
    const filename = `screenshots/${urlObj.hostname}-${Date.now()}.png`;
    
    // Save to Vercel blob storage
    const blob = await put(filename, screenshotBuffer, {
      access: 'public',
      contentType: 'image/png',
    });
    
    console.log(`Screenshot saved to blob storage: ${blob.url}`);
    
    return res.status(200).json({ 
      screenshotUrl: blob.url,
      success: true 
    });

  } catch (error) {
    console.error("Screenshot generation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: "Screenshot generation failed", details: errorMessage });
  }
}

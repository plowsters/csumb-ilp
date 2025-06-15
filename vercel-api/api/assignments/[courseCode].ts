
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { lucia } from "../../lib/lucia.js";
import { pg } from "../../lib/pg.js";

function setCorsHeaders(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://plowsters.github.io");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { courseCode } = req.query;
  
  try {
    if (req.method === "GET") {
      // Public endpoint - get assignments for a course
      const rows = await pg`SELECT * FROM assignments WHERE course_code = ${courseCode} ORDER BY created_at DESC`;
      return res.status(200).json(rows);
    }

    // For POST/PUT/DELETE, require authentication
    const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
    if (!sessionId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { session } = await lucia.validateSession(sessionId);
    if (!session) {
      return res.status(401).json({ error: "Invalid session" });
    }

    if (req.method === "POST") {
      const { title, description, fileUrl, fileType, type } = req.body;
      
      const rows = await pg`INSERT INTO assignments (course_code, title, description, file_url, file_type, type, created_at) VALUES (${courseCode}, ${title}, ${description}, ${fileUrl}, ${fileType}, ${type || 'assignment'}, NOW()) RETURNING *`;
      
      return res.status(201).json(rows[0]);
    }

    if (req.method === "PUT") {
      const { id, title, description, fileUrl, fileType } = req.body;
      
      const rows = await pg`UPDATE assignments SET title = ${title}, description = ${description}, file_url = ${fileUrl}, file_type = ${fileType} WHERE id = ${id} AND course_code = ${courseCode} RETURNING *`;
      
      return res.status(200).json(rows[0]);
    }

    if (req.method === "DELETE") {
      const { id } = req.body;
      
      await pg`DELETE FROM assignments WHERE id = ${id} AND course_code = ${courseCode}`;
      
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Assignment API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: "Internal server error", details: errorMessage });
  }
}

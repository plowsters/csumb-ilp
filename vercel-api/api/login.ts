
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { lucia } from "../lib/lucia.js";
import { pg } from "../lib/pg.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  try {
    const { rows } = await pg.query(
      "SELECT id, username FROM users WHERE username = $1", 
      [username]
    );

    if (!rows[0]) {
      return res.status(401).json({ error: "User not found" });
    }

    const session = await lucia.createSession(rows[0].id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    
    res.setHeader("Set-Cookie", sessionCookie.serialize());
    return res.status(200).json({ success: true, user: { username: rows[0].username } });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

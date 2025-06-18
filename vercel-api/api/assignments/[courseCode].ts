import { VercelRequest, VercelResponse } from '@vercel/node';
import { lucia } from '../../lib/lucia';
import { pool } from '../../lib/pg';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'https://plowsters.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { courseCode } = req.query;

  if (req.method === 'GET') {
    try {
      const result = await pool.query(
        'SELECT id, course_code, title, description, file_url, file_type, type, created_at, position, screenshot_url FROM assignments WHERE course_code = $1 ORDER BY position ASC, created_at ASC',
        [courseCode]
      );
      
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    }
    return;
  }

  // For POST, PUT, DELETE, PATCH - require authentication
  const sessionId = req.cookies.auth_session;
  if (!sessionId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const { session } = await lucia.validateSession(sessionId);
    if (!session) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    if (req.method === 'POST') {
      const { title, description, fileUrl, fileType, screenshotUrl, type } = req.body;
      
      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const result = await pool.query(
        'INSERT INTO assignments (course_code, title, description, file_url, file_type, screenshot_url, type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [courseCode, title, description, fileUrl, fileType, screenshotUrl, type || 'assignment']
      );
      
      res.status(201).json(result.rows[0]);
    } else if (req.method === 'PUT') {
      const { id, title, description, fileUrl, fileType, screenshotUrl } = req.body;
      
      if (!id || !title) {
        return res.status(400).json({ error: 'ID and title are required' });
      }

      const result = await pool.query(
        'UPDATE assignments SET title = $1, description = $2, file_url = $3, file_type = $4, screenshot_url = $5 WHERE id = $6 AND course_code = $7 RETURNING *',
        [title, description, fileUrl, fileType, screenshotUrl, id, courseCode]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Assignment not found' });
      }
      
      res.status(200).json(result.rows[0]);
    } else if (req.method === 'DELETE') {
      const { id } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'ID is required' });
      }

      const result = await pool.query(
        'DELETE FROM assignments WHERE id = $1 AND course_code = $2 RETURNING *',
        [id, courseCode]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Assignment not found' });
      }
      
      res.status(200).json({ message: 'Assignment deleted successfully' });
    } else if (req.method === 'PATCH') {
      const { orderedIds } = req.body;
      
      if (!Array.isArray(orderedIds)) {
        return res.status(400).json({ error: 'orderedIds must be an array' });
      }

      // Update positions based on array order
      for (let i = 0; i < orderedIds.length; i++) {
        await pool.query(
          'UPDATE assignments SET position = $1 WHERE id = $2 AND course_code = $3',
          [i, orderedIds[i], courseCode]
        );
      }
      
      res.status(200).json({ message: 'Order updated successfully' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
}

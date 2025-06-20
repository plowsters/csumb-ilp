
import { VercelRequest, VercelResponse } from '@vercel/node';

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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Get API key from environment variables
    const API_KEY = process.env.SCREENSHOT_API_KEY;
    if (!API_KEY) {
      console.log('Screenshot API key not configured, returning null');
      return res.status(200).json({ screenshotUrl: null });
    }

    // Generate screenshot using ScreenshotMachine API
    const screenshotUrl = `https://api.screenshotmachine.com?key=${API_KEY}&url=${encodeURIComponent(url)}&dimension=1200x900&format=png`;
    
    // For now, just return the screenshot URL without storing in blob
    // This avoids potential @vercel/blob dependency issues
    return res.status(200).json({ screenshotUrl });
  } catch (error) {
    console.error('Screenshot generation error:', error);
    return res.status(200).json({ screenshotUrl: null });
  }
}

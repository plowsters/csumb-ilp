
import { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
      return res.status(500).json({ error: 'Screenshot API key not configured' });
    }

    // Generate screenshot using ScreenshotMachine API
    const screenshotUrl = `https://api.screenshotmachine.com?key=${API_KEY}&url=${encodeURIComponent(url)}&dimension=1200x900&format=png`;
    
    // Fetch the screenshot
    const screenshotResponse = await fetch(screenshotUrl);
    
    if (!screenshotResponse.ok) {
      throw new Error('Failed to generate screenshot');
    }

    const screenshotBuffer = await screenshotResponse.arrayBuffer();
    
    // Generate a unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const domain = new URL(url).hostname.replace(/[^a-zA-Z0-9]/g, '-');
    const filename = `screenshot-${domain}-${timestamp}.png`;

    // Store the screenshot in Vercel Blob
    const blob = await put(filename, screenshotBuffer, {
      access: 'public',
      contentType: 'image/png'
    });

    return res.status(200).json({ screenshotUrl: blob.url });
  } catch (error) {
    console.error('Screenshot generation error:', error);
    return res.status(500).json({ error: 'Failed to generate screenshot' });
  }
}

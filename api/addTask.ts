
import { sql } from '@vercel/postgres';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Vercel automatically parses the JSON body
    const { text } = request.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return response.status(400).json({ error: 'Task text is required' });
    }
    
    await sql`INSERT INTO tasks (text) VALUES (${text});`;
    
    return response.status(201).json({ message: 'Task added successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown server error';
    return response.status(500).json({ error: errorMessage });
  }
}

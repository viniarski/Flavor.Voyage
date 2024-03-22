// pages/api/search.js
import { executeQuery } from '../../db';

export default async function handler(req, res) {
  const { query } = req.query;

  try {
    const searchResults = await executeQuery(`
      SELECT * FROM recipes
      WHERE recipe_title ILIKE '%${query}%'
        OR recipe_ingredients ILIKE '%${query}%'
        OR cooking_instructions ILIKE '%${query}%'
    `);

    res.status(200).json(searchResults);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

import connectDB from "../../lib/connectDB";
import mongoose from "mongoose";

export default async function handler(req, res) {
  // Allow both GET and POST methods
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Get the User collection
    const User = mongoose.models.User || mongoose.model('User');

    // List all indexes
    const indexes = await User.collection.indexes();
    console.log('Current indexes:', indexes);

    // Check if the problematic index exists
    const hasProblematicIndex = indexes.some(index => index.name === 'links.shortCode_1');

    if (hasProblematicIndex) {
      // Drop the problematic index
      await User.collection.dropIndex('links.shortCode_1');
      res.status(200).json({ message: 'Index dropped successfully', indexes: await User.collection.indexes() });
    } else {
      res.status(200).json({ message: 'Problematic index not found', indexes });
    }
  } catch (error) {
    console.error('Error dropping index:', error);

    // If the index doesn't exist, that's fine
    if (error.code === 27 && error.message.includes('index not found')) {
      return res.status(200).json({ message: 'Index does not exist, no action needed' });
    }

    res.status(500).json({
      error: 'Failed to drop index',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

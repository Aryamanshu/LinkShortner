import userModel from "../../model/userModel";
import connectDB from "../../lib/connectDB";

export default async function handler(req, res) {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username } = req.body;

    // Validate input
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    await connectDB();

    // Find the user by username
    const user = await userModel.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return user data with links
    res.status(200).json({
      data: {
        _id: user._id,
        username: user.username,
        links: user.links || []
      }
    });
  } catch (error) {
    console.error("Get user by username error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

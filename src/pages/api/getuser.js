import userModel from "../../model/userModel";
import connectDB from "../../lib/connectDB";

export default async function handler(req, res) {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userID } = req.body;

    // Validate input
    if (!userID || userID === 'undefined') {
      return res.status(400).json({
        error: "Invalid user ID",
        data: {
          _id: null,
          username: 'Guest',
          email: null
        }
      });
    }

    await connectDB();

    // Find the user by ID
    let user;
    try {
      user = await userModel.findById(userID);

      if (!user) {
        return res.status(404).json({
          error: "User not found",
          data: {
            _id: null,
            username: 'Guest',
            email: null
          }
        });
      }
    } catch (err) {
      // Handle invalid ObjectId format
      console.error("Invalid ObjectId format:", err);
      return res.status(400).json({
        error: "Invalid user ID format",
        data: {
          _id: null,
          username: 'Guest',
          email: null
        }
      });
    }

    // Return user data without links (for efficiency)
    res.status(200).json({
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

import userModel from "../../model/userModel";
import connectDB from "../../lib/connectDB";
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    await connectDB();

    // Check if the user exists
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Check if the password matches using bcrypt compare
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Don't send the password back to the client
    const userData = {
      _id: user._id,
      username: user.username,
      links: user.links
    };

    res.status(200).json({
      message: "Login successful",
      data: userData
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

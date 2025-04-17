import userModel from "@/model/userModel";
import connectDB from "@/lib/connectDB";

export default async function handler(req, res) {
  try {
    await connectDB();
    const { userId, linkId, updates } = req.body;
    
    // Validate inputs
    if (!userId || !linkId || !updates) {
      return res.status(400).json({ error: "userId, linkId, and updates are required" });
    }
    
    // Check if the user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Find the link in the user's links array
    const linkIndex = user.links.findIndex(link => link._id.toString() === linkId);
    if (linkIndex === -1) {
      return res.status(404).json({ error: "Link not found" });
    }
    
    // Update the link with the provided updates
    Object.keys(updates).forEach(key => {
      user.links[linkIndex][key] = updates[key];
    });
    
    // Save the updated user document
    await user.save();
    
    // Don't send the password back to the client
    const userData = {
      _id: user._id,
      username: user.username,
      links: user.links
    };
    
    res.status(200).json({
      message: "Link updated successfully",
      data: userData
    });
  } catch (error) {
    console.error("Update link error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

import userModel from "@/model/userModel";
import connectDB from "@/lib/connectDB";

export default async function handler(req, res) {
  try {
    const { shortCode } = req.query;
    
    if (!shortCode) {
      return res.status(400).json({ error: "Short code is required" });
    }
    
    await connectDB();
    
    // Find the user with the link that has the given short code
    const user = await userModel.findOne({
      "links.shortCode": shortCode,
      "links.status": "active" // Only redirect active links
    });
    
    if (!user) {
      return res.status(404).json({ error: "Link not found or inactive" });
    }
    
    // Find the specific link with the short code
    const link = user.links.find(link => link.shortCode === shortCode && link.status === "active");
    
    if (!link) {
      return res.status(404).json({ error: "Link not found or inactive" });
    }
    
    // Increment the click count
    link.clicks += 1;
    await user.save();
    
    // Return the original URL for redirection
    res.status(200).json({ url: link.link });
  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

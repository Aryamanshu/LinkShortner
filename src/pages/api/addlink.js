import userModel from "@/model/userModel";
import connectDB from "@/lib/connectDB";
import { generateShortCode, isValidUrl, normalizeUrl } from "@/lib/shortCode";

export default async function handler(req, res) {
  try {
    await connectDB();
    const { title, link, status, userId } = req.body;

    // Validate inputs
    if (!title || !link || !userId) {
      return res.status(400).json({ error: "Title, link, and userId are required" });
    }

    // Validate URL format
    if (!isValidUrl(normalizeUrl(link))) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    // Check if the user exists
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Generate a unique short code
    let shortCode = generateShortCode();
    let isUnique = false;
    let attempts = 0;

    // Make sure the short code is unique
    while (!isUnique && attempts < 5) {
      const existingUser = await userModel.findOne({
        "links.shortCode": shortCode
      });

      if (!existingUser) {
        isUnique = true;
      } else {
        shortCode = generateShortCode();
        attempts++;
      }
    }

    if (!isUnique) {
      return res.status(500).json({ error: "Could not generate a unique short code" });
    }

    // Normalize the URL (ensure it has http/https)
    const normalizedLink = normalizeUrl(link);

    // Push new link object to the links array
    user.links.push({
      title,
      link: normalizedLink,
      shortCode,
      status: status || 'active',
      createdAt: new Date(),
      clicks: 0
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
      message: "Link added successfully",
      data: userData,
      shortCode
    });
  } catch (error) {
    console.error("Add link error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

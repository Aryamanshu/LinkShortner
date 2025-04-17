import userModel from "../../../model/userModel";
import connectDB from "../../../lib/connectDB";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

// Google OAuth configuration
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_BASE_URL + '/api/auth/google/callback';

console.log('Google OAuth configuration:', {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: GOOGLE_CLIENT_SECRET ? '***' : undefined,
  GOOGLE_REDIRECT_URI
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Google authorization code is required' });
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        code,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code'
      })
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('Google token error:', tokenData.error);
      return res.status(400).json({ error: 'Failed to authenticate with Google' });
    }

    // Get user data from Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });

    const userData = await userResponse.json();

    if (userResponse.status !== 200) {
      console.error('Google user data error:', userData);
      return res.status(400).json({ error: 'Failed to get user data from Google' });
    }

    if (!userData.email) {
      return res.status(400).json({ error: 'No email found in Google account' });
    }

    // Connect to database
    await connectDB();

    // Check if user already exists
    let user = await userModel.findOne({ email: userData.email });

    if (!user) {
      // Create a new user
      const username = userData.name?.replace(/\s+/g, '') || `google_${userData.id}`;
      const randomPassword = uuidv4();
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = new userModel({
        username,
        email: userData.email,
        password: hashedPassword,
        googleId: userData.id,
        avatar: userData.picture,
        links: []
      });

      await user.save();
    } else if (!user.googleId) {
      // Update existing user with Google ID
      user.googleId = userData.id;
      user.avatar = userData.picture || user.avatar;
      await user.save();
    }

    // Return user data
    res.status(200).json({
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

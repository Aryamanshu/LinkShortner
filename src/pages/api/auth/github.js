import userModel from "../../../model/userModel";
import connectDB from "../../../lib/connectDB";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

import { BASE_URL } from '../../../source';

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_REDIRECT_URI = BASE_URL + '/api/auth/github/callback';

console.log('GitHub OAuth configuration:', {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: GITHUB_CLIENT_SECRET ? '***' : undefined,
  GITHUB_REDIRECT_URI
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'GitHub authorization code is required' });
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: GITHUB_REDIRECT_URI
      })
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('GitHub token error:', tokenData.error);
      return res.status(400).json({ error: 'Failed to authenticate with GitHub' });
    }

    // Get user data from GitHub
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${tokenData.access_token}`
      }
    });

    const userData = await userResponse.json();

    if (userResponse.status !== 200) {
      console.error('GitHub user data error:', userData);
      return res.status(400).json({ error: 'Failed to get user data from GitHub' });
    }

    // Get user email from GitHub
    const emailResponse = await fetch('https://api.github.com/user/emails', {
      headers: {
        'Authorization': `token ${tokenData.access_token}`
      }
    });

    const emailData = await emailResponse.json();
    const primaryEmail = emailData.find(email => email.primary)?.email || emailData[0]?.email;

    if (!primaryEmail) {
      return res.status(400).json({ error: 'No email found in GitHub account' });
    }

    // Connect to database
    await connectDB();

    // Check if user already exists
    let user = await userModel.findOne({ email: primaryEmail });

    if (!user) {
      // Create a new user
      const username = userData.login || `github_${userData.id}`;
      const randomPassword = uuidv4();
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = new userModel({
        username,
        email: primaryEmail,
        password: hashedPassword,
        githubId: userData.id,
        avatar: userData.avatar_url,
        links: []
      });

      await user.save();
    } else if (!user.githubId) {
      // Update existing user with GitHub ID
      user.githubId = userData.id;
      user.avatar = userData.avatar_url || user.avatar;
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
    console.error('GitHub auth error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

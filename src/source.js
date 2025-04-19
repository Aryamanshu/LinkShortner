// Define the base URI for API calls
export const URI = process.env.NODE_ENV === 'production'
  ? '' // Empty string for relative URLs in production
  : 'http://localhost:3000';

// Define the full base URL for OAuth redirects
// For Netlify deployment, we need to use the environment variable
// rather than window.location.origin to ensure consistency
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Log the BASE_URL for debugging
if (typeof window !== 'undefined') {
  console.log('source.js - BASE_URL:', BASE_URL);
  console.log('source.js - window.location.origin:', window.location.origin);
  console.log('source.js - NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);
}

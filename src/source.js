// Define the base URI for API calls
export const URI = process.env.NODE_ENV === 'production' 
  ? '' // Empty string for relative URLs in production
  : 'http://localhost:3000';

// Define the full base URL for OAuth redirects
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 
  (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

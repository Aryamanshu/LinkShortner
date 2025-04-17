const liveLink = "https://linkshortner-psi.vercel.app";
const localURI = "http://localhost:3000";

// Use environment variable if available, otherwise fallback to local URI
export const URI = process.env.NEXT_PUBLIC_BASE_URL || localURI;
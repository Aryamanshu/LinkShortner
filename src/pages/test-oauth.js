import { useState, useEffect } from 'react';
import { BASE_URL } from '@/source';
import Layout from '@/components/Layout';

export default function TestOAuth() {
  const [githubRedirectUri, setGithubRedirectUri] = useState('');
  const [googleRedirectUri, setGoogleRedirectUri] = useState('');
  const [windowLocation, setWindowLocation] = useState('');
  const [envBaseUrl, setEnvBaseUrl] = useState('');

  useEffect(() => {
    // Get all the values we need to debug
    setGithubRedirectUri(BASE_URL + '/api/auth/github/callback');
    setGoogleRedirectUri(BASE_URL + '/api/auth/google/callback');
    setWindowLocation(typeof window !== 'undefined' ? window.location.origin : 'N/A');
    setEnvBaseUrl(process.env.NEXT_PUBLIC_BASE_URL || 'Not set');
  }, []);

  return (
    <Layout title="Test OAuth Configuration">
      <div className="app-container py-12">
        <div className="max-w-3xl mx-auto bg-dark-800 p-8 rounded-xl shadow-lg border border-teal-700/20">
          <h1 className="text-2xl font-bold text-beige-500 mb-6">OAuth Configuration Test</h1>

          <div className="space-y-6">
            <div className="bg-dark-700 p-4 rounded-lg">
              <h2 className="text-lg font-medium text-beige-500 mb-2">GitHub Redirect URI</h2>
              <p className="text-beige-600 mb-2">This is the exact URI that should be configured in your GitHub OAuth App:</p>
              <div className="bg-dark-900 p-3 rounded font-mono text-sm text-teal-500 break-all">
                {githubRedirectUri}
              </div>
              <button
                className="mt-3 px-4 py-2 bg-teal-600 text-beige-500 rounded-lg text-sm hover:bg-teal-500 transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(githubRedirectUri);
                  alert('GitHub redirect URI copied to clipboard!');
                }}
              >
                Copy to Clipboard
              </button>
            </div>

            <div className="bg-dark-700 p-4 rounded-lg">
              <h2 className="text-lg font-medium text-beige-500 mb-2">Google Redirect URI</h2>
              <p className="text-beige-600 mb-2">This is the exact URI that should be configured in your Google OAuth App:</p>
              <div className="bg-dark-900 p-3 rounded font-mono text-sm text-teal-500 break-all">
                {googleRedirectUri}
              </div>
              <button
                className="mt-3 px-4 py-2 bg-teal-600 text-beige-500 rounded-lg text-sm hover:bg-teal-500 transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(googleRedirectUri);
                  alert('Google redirect URI copied to clipboard!');
                }}
              >
                Copy to Clipboard
              </button>
            </div>

            <div className="bg-dark-700 p-4 rounded-lg">
              <h2 className="text-lg font-medium text-beige-500 mb-2">Environment Variables</h2>
              <div className="space-y-2">
                <div>
                  <span className="text-beige-600">NEXT_PUBLIC_BASE_URL: </span>
                  <span className="text-teal-500 font-mono">{envBaseUrl}</span>
                </div>
                <div>
                  <span className="text-beige-600">window.location.origin: </span>
                  <span className="text-teal-500 font-mono">{windowLocation}</span>
                </div>
                <div>
                  <span className="text-beige-600">BASE_URL (from source.js): </span>
                  <span className="text-teal-500 font-mono">{BASE_URL}</span>
                </div>
              </div>
            </div>

            <div className="bg-dark-700 p-4 rounded-lg">
              <h2 className="text-lg font-medium text-beige-500 mb-2">GitHub Instructions</h2>
              <ol className="list-decimal list-inside space-y-2 text-beige-600">
                <li>Copy the GitHub Redirect URI above</li>
                <li>Go to <a href="https://github.com/settings/developers" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:underline">GitHub Developer Settings</a></li>
                <li>Select your OAuth App</li>
                <li>Update the &quot;Authorization callback URL&quot; with the exact URI above</li>
                <li>Save your changes</li>
                <li>Try signing in with GitHub again</li>
              </ol>
            </div>

            <div className="bg-dark-700 p-4 rounded-lg">
              <h2 className="text-lg font-medium text-beige-500 mb-2">Google Instructions</h2>
              <ol className="list-decimal list-inside space-y-2 text-beige-600">
                <li>Copy the Google Redirect URI above</li>
                <li>Go to <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:underline">Google Cloud Console</a></li>
                <li>Select your OAuth 2.0 Client ID</li>
                <li>Under &quot;Authorized redirect URIs&quot;, add the exact URI above</li>
                <li>Click Save</li>
                <li>Try signing in with Google again</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

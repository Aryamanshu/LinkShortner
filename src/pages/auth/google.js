import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { URI, BASE_URL } from '@/source';
import Layout from '@/components/Layout';

export default function GoogleAuth() {
  const router = useRouter();
  const { code } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) return;

    console.log('Google auth page - code received:', code);
    console.log('Google auth page - BASE_URL:', BASE_URL);
    console.log('Google auth page - URI:', URI);

    const handleGoogleAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${URI}/api/auth/google`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code })
        });

        const result = await response.json();

        if (response.ok) {
          toast.success('Successfully signed in with Google!');
          setTimeout(() => {
            router.push(`/dashboard/${result.data._id}`);
          }, 1000);
        } else {
          setError(result.error || 'Failed to authenticate with Google');
          toast.error(result.error || 'Failed to authenticate with Google');
        }
      } catch (error) {
        console.error('Google auth error:', error);
        setError('An error occurred during Google authentication');
        toast.error('An error occurred during Google authentication');
      } finally {
        setIsLoading(false);
      }
    };

    handleGoogleAuth();
  }, [code, router]);

  return (
    <Layout title="Google Authentication - TinyHost" showHeader={false} showFooter={false}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 to-dark-800">
        <div className="max-w-md w-full p-8 bg-dark-800 rounded-xl shadow-xl border border-teal-700/30">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-beige-500 mb-4">
              {isLoading ? 'Authenticating with Google...' : error ? 'Authentication Failed' : 'Authentication Successful'}
            </h1>

            {isLoading ? (
              <div className="flex justify-center my-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              </div>
            ) : error ? (
              <div className="text-center my-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-danger-500/10 text-danger-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-beige-600">{error}</p>
                <button
                  onClick={() => router.push('/')}
                  className="mt-6 px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-beige-500 rounded-lg text-sm font-medium shadow-lg hover:from-teal-500 hover:to-teal-400 transition-all duration-200"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <div className="text-center my-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/10 text-teal-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-beige-600">You have successfully signed in with Google!</p>
                <p className="text-beige-600 mt-2">Redirecting to your dashboard...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

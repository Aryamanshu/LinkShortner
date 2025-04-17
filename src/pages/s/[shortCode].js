import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { URI } from '@/source';

export default function Redirect() {
  const router = useRouter();
  const { shortCode } = router.query;

  useEffect(() => {
    if (!shortCode) return;

    const fetchRedirectUrl = async () => {
      try {
        const response = await fetch(`${URI}/api/redirect/${shortCode}`);
        const data = await response.json();
        
        if (response.ok && data.url) {
          // Redirect to the original URL
          window.location.href = data.url;
        } else {
          // Redirect to a 404 page or show an error
          router.push('/404');
        }
      } catch (error) {
        console.error('Error fetching redirect URL:', error);
        router.push('/404');
      }
    };

    fetchRedirectUrl();
  }, [shortCode, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Redirecting...</title>
      </Head>
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Redirecting you...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Please wait while we redirect you to your destination.</p>
      </div>
    </div>
  );
}

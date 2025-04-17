import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Button from '@/components/Button';

export default function Custom404() {
  return (
    <Layout title="404 - Page Not Found" showNav={false}>
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <div className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400 text-9xl font-bold animate-pulse-slow">404</div>
            <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Page not found</h1>
            <p className="mt-6 text-base leading-7 text-gray-400">
              Sorry, the link you&apos;re looking for doesn&apos;t exist or has been deactivated.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/" variant="primary">
              Go back home
            </Button>
            <Button href="#" variant="outline">
              Contact support
            </Button>
          </div>

          <div className="mt-16 border-t border-gray-700 pt-8">
            <p className="text-sm text-gray-400">
              Need help? <Link href="#" className="font-medium text-primary-400 hover:text-primary-300">Contact our support team</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

export default function Layout({ 
  children, 
  title = 'TinyHost - URL Shortener',
  description = 'Simplify your links, amplify your reach with TinyHost URL shortener.',
  showHeader = true,
  showFooter = true,
  showNav = true,
  user = null
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        {showHeader && <Header user={user} showNav={showNav} />}
        
        <main className="flex-grow">
          {children}
        </main>
        
        {showFooter && <Footer />}
      </div>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: 'white',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: 'white',
            },
          },
        }}
      />
    </>
  );
}

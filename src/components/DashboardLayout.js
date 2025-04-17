import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import Logo from './Logo';

export default function DashboardLayout({ 
  children, 
  title = 'Dashboard | TinyHost',
  user = null
}) {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-dark-900 flex flex-col">
        {/* Header */}
        <header className="bg-dark-800 border-b border-teal-700/20 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Logo className="text-teal-500" />
                <div className="hidden md:block ml-10">
                  <div className="flex items-baseline space-x-4">
                    <a href="#" className="text-teal-500 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                    <a href="#" className="text-beige-500 hover:text-teal-500 px-3 py-2 rounded-md text-sm font-medium">Analytics</a>
                    <a href="#" className="text-beige-500 hover:text-teal-500 px-3 py-2 rounded-md text-sm font-medium">Settings</a>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                {user && (
                  <div className="flex items-center">
                    <span className="text-beige-500 mr-4 hidden md:block">{user.username}</span>
                    <div className="relative">
                      <button 
                        className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-800 focus:ring-teal-500"
                        onClick={() => router.push('/')}
                      >
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full bg-teal-700/20 flex items-center justify-center text-teal-500">
                          {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-dark-800 border-t border-teal-700/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="text-beige-600 text-sm">
                &copy; {new Date().getFullYear()} TinyHost
              </div>
              <div className="text-beige-600 text-sm">
                <a href="#" className="hover:text-teal-500">Terms</a>
                <span className="mx-2">·</span>
                <a href="#" className="hover:text-teal-500">Privacy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1F1F1F',
            color: '#F2EFE7',
            border: '1px solid rgba(0, 106, 113, 0.2)',
          },
          success: {
            iconTheme: {
              primary: '#48A6A7',
              secondary: '#1F1F1F',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#1F1F1F',
            },
          },
        }}
      />
    </>
  );
}

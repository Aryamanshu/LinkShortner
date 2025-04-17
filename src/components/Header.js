import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Logo from './Logo';
import UserButton from './UserButton';
import toast from 'react-hot-toast';

export default function Header({ user, showNav = true }) {
  const router = useRouter();

  // Make logo clickable only on sign-in and sign-up pages
  const isAuthPage = router.pathname === '/' || router.pathname === '/signup';

  return (
    <header className="bg-dark-800 border-b border-teal-700/20 shadow-md">
      <div className="app-container py-4">
        <div className="flex items-center justify-between">
          <Logo className="text-teal-500" linkToHome={isAuthPage} />

          {showNav && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-beige-500 hover:text-teal-500 transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-beige-500 hover:text-teal-500 transition-colors">
                Pricing
              </Link>
              <Link href="#faq" className="text-beige-500 hover:text-teal-500 transition-colors">
                FAQ
              </Link>
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {user ? (
              <UserButton user={user} />
            ) : (
              <>
                <Link href="/" className="text-beige-500 hover:text-teal-500 transition-colors">
                  Sign In
                </Link>
                <Link href="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

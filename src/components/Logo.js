import React from 'react';
import Link from 'next/link';

export default function Logo({ size = 'default', className = '', linkToHome = true }) {
  const sizeClasses = {
    small: 'text-xl',
    default: 'text-2xl',
    large: 'text-3xl',
  };

  const LogoContent = () => (
    <>
      <span className="text-teal-500">Tiny</span>
      <span className="text-teal-700">Host</span>
    </>
  );

  if (linkToHome) {
    return (
      <Link href="/" className={`font-display font-bold ${sizeClasses[size]} ${className}`}>
        <LogoContent />
      </Link>
    );
  }

  return (
    <div className={`font-display font-bold ${sizeClasses[size]} ${className}`}>
      <LogoContent />
    </div>
  );
}

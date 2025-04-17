import React from 'react';
import Link from 'next/link';

export default function Logo({ size = 'default', className = '' }) {
  const sizeClasses = {
    small: 'text-xl',
    default: 'text-2xl',
    large: 'text-3xl',
  };

  return (
    <Link href="/" className={`font-display font-bold ${sizeClasses[size]} ${className}`}>
      <span className="text-teal-500">Tiny</span>
      <span className="text-teal-700">Host</span>
    </Link>
  );
}

import React from 'react';

export default function LoadingState({
  type = 'default',
  text = 'Loading...',
  className = ''
}) {
  // Different loading state types
  const loadingStates = {
    default: (
      <div className={`flex flex-col items-center justify-center p-8 ${className} bg-dark-800 border border-teal-700/20 rounded-xl`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mb-4"></div>
        <p className="text-beige-500 font-medium">{text}</p>
      </div>
    ),

    skeleton: (
      <div className={`space-y-4 ${className} bg-dark-800 border border-teal-700/20 rounded-xl p-6`}>
        <div className="h-4 bg-dark-700 rounded animate-pulse"></div>
        <div className="h-4 bg-dark-700 rounded animate-pulse w-5/6"></div>
        <div className="h-4 bg-dark-700 rounded animate-pulse"></div>
        <div className="h-4 bg-dark-700 rounded animate-pulse w-4/6"></div>
      </div>
    ),

    card: (
      <div className={`border border-teal-700/20 bg-dark-800 rounded-xl p-6 ${className}`}>
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-dark-700 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-dark-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-dark-700 rounded"></div>
              <div className="h-4 bg-dark-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    ),

    table: (
      <div className={`overflow-hidden ${className}`}>
        <div className="animate-pulse">
          <div className="h-10 bg-dark-800 border border-teal-700/20 rounded-t-xl mb-1"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-16 bg-dark-800 border border-teal-700/20 ${i === 4 ? 'rounded-b-xl' : ''} mb-1`}></div>
          ))}
        </div>
      </div>
    )
  };

  return loadingStates[type] || loadingStates.default;
}

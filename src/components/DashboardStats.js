import React from 'react';

export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Links */}
      <div className="bg-dark-800 border border-teal-700/20 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-teal-700/10 text-teal-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-beige-600">Total Links</p>
            <p className="text-2xl font-semibold text-beige-500">{stats?.totalLinks || 0}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm">
            <span className="text-teal-500 mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </span>
            <span className="text-teal-500 font-medium">Active:</span>
            <span className="ml-1 text-beige-500">{stats?.activeLinks || 0}</span>
          </div>
        </div>
      </div>

      {/* Total Clicks */}
      <div className="bg-dark-800 border border-teal-700/20 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-teal-600/10 text-teal-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-beige-600">Total Clicks</p>
            <p className="text-2xl font-semibold text-beige-500">{stats?.totalClicks || 0}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm">
            <span className="text-teal-600 mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </span>
            <span className="text-teal-600 font-medium">Avg per link:</span>
            <span className="ml-1 text-beige-500">
              {stats?.totalLinks > 0 ? Math.round((stats?.totalClicks || 0) / stats?.totalLinks) : 0}
            </span>
          </div>
        </div>
      </div>

      {/* Most Popular */}
      <div className="bg-dark-800 border border-teal-700/20 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-teal-500/10 text-teal-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-beige-600">Most Popular</p>
            <p className="text-2xl font-semibold text-beige-500 truncate max-w-[180px]">
              {stats?.mostPopular?.title || 'No links yet'}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm">
            <span className="text-teal-500 mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </span>
            <span className="text-teal-500 font-medium">Clicks:</span>
            <span className="ml-1 text-beige-500">{stats?.mostPopular?.clicks || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

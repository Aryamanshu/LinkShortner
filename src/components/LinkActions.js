import React from 'react';
import Button from './Button';

export default function LinkActions({ onAddLink }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-dark-800 border border-teal-700/20 rounded-xl p-4 shadow-sm">
      <div className="mb-4 sm:mb-0">
        <h2 className="text-xl font-semibold text-beige-500">Your Links</h2>
        <p className="text-beige-600 text-sm">Manage and track all your shortened links</p>
      </div>
      
      <div className="flex space-x-3">
        <Button 
          variant="primary" 
          onClick={onAddLink}
          className="flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Link
        </Button>
        
        <Button variant="outline" className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
        </Button>
      </div>
    </div>
  );
}

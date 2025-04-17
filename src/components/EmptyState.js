import React from 'react';
import Button from './Button';

export default function EmptyState({
  title = 'No data found',
  description = 'Get started by creating your first item.',
  icon,
  action,
  actionText = 'Create New',
  className = '',
}) {
  return (
    <div className={`text-center py-12 ${className} bg-dark-800 border border-teal-700/20 rounded-xl shadow-sm p-8`}>
      {icon && (
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-teal-700/10 text-teal-500 mb-6">
          {icon}
        </div>
      )}

      <h3 className="text-xl font-medium text-beige-500">{title}</h3>

      <p className="mt-3 text-beige-600 max-w-md mx-auto">
        {description}
      </p>

      {action && (
        <div className="mt-8">
          <Button onClick={action} variant="primary" className="px-6 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
}

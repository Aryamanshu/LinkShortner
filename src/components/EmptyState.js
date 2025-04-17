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
    <div className={`text-center py-12 ${className}`}>
      {icon && (
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-6">
          {icon}
        </div>
      )}
      
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      
      <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
        {description}
      </p>
      
      {action && (
        <div className="mt-6">
          <Button onClick={action} variant="primary">
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
}

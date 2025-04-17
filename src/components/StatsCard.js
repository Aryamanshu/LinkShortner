import React from 'react';
import Card from './Card';

export default function StatsCard({
  title,
  value,
  icon,
  change,
  changeType = 'increase',
  className = '',
}) {
  return (
    <Card className={`${className}`}>
      <div className="flex items-center">
        {icon && (
          <div className="flex-shrink-0 mr-4">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
              {icon}
            </div>
          </div>
        )}
        
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          
          {change && (
            <div className="flex items-center mt-1">
              <span
                className={`text-sm font-medium ${
                  changeType === 'increase' ? 'text-success-600' : 'text-danger-600'
                }`}
              >
                {changeType === 'increase' ? (
                  <svg className="w-4 h-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                {change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

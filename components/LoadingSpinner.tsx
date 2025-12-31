
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-emerald-600 font-semibold">Getting a new sentence...</p>
    </div>
  );
};


import React from 'react';
import type { FeedbackStatus } from '../types';

interface ChameleonHeaderProps {
  feedbackStatus: FeedbackStatus;
}

export const ChameleonHeader: React.FC<ChameleonHeaderProps> = ({ feedbackStatus }) => {
  const chameleonColor = {
    idle: 'text-emerald-500',
    correct: 'text-green-500',
    incorrect: 'text-red-500'
  }[feedbackStatus];

  return (
    <header className="text-center">
      <div className="flex justify-center items-center gap-4">
        <svg
          className={`w-16 h-16 sm:w-20 sm:h-20 transition-colors duration-300 ${chameleonColor}`}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.214 3.111c-1.745-1.09-3.957-.74-5.592.894-2.152 2.152-2.152 5.64 0 7.792 1.487 1.487 3.743 1.94 5.592.894l.582-.364c.73-.455 1.57-.69 2.422-.69 2.761 0 5 2.239 5 5s-2.239 5-5 5h-2.138c-.378 0-.682.304-.682.682s.304.682.682.682H15c4.075 0 7.364-3.289 7.364-7.364s-3.289-7.364-7.364-7.364c-.93 0-1.81.173-2.61.482l-.176.06zm-1.636 4.31a.636.636 0 10-.9 1.273.636.636 0 00.9-1.273zM5.38 8.014c.23.23.54.36.86.36s.63-.13.86-.36l.73-.73c1.76-1.76 4.62-1.76 6.38 0l.73.73c.48.48 1.25.48 1.73 0s.48-1.25 0-1.73l-.73-.73c-2.73-2.73-7.16-2.73-9.89 0l-.73.73c-.48.48-.48 1.25 0 1.73z"
          />
        </svg>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-700 tracking-tight">
          Comma Chameleon
        </h1>
      </div>
      <p className="mt-2 text-lg text-gray-600">A Fun Way to Learn Grammar!</p>
    </header>
  );
};


import React from 'react';
import type { FeedbackStatus } from '../types';

interface FeedbackCardProps {
  status: FeedbackStatus;
  explanation: string;
  correctSentence: string;
}

const ICONS = {
  correct: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  incorrect: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ status, explanation, correctSentence }) => {
  if (status === 'idle') return null;

  const isCorrect = status === 'correct';
  const bgColor = isCorrect ? 'bg-green-500' : 'bg-red-500';
  const title = isCorrect ? 'Great Job!' : 'Not Quite!';
  const icon = isCorrect ? ICONS.correct : ICONS.incorrect;

  return (
    <div className="mt-8 p-5 rounded-lg shadow-md animate-fade-in bg-white border-l-8" style={{ borderColor: isCorrect ? '#22c55e' : '#ef4444' }}>
      <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 w-12 h-12 ${bgColor} rounded-full flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <h3 className={`text-xl font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>{title}</h3>
          <p className="mt-1 text-gray-600 font-semibold">Here's why:</p>
          <p className="text-gray-500">{explanation}</p>
          {!isCorrect && (
            <div className="mt-3">
              <p className="text-gray-600 font-semibold">The correct sentence is:</p>
              <p className="font-serif text-lg text-emerald-700">{correctSentence}</p>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

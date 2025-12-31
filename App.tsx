
import React, { useState, useEffect, useCallback } from 'react';
import { ChameleonHeader } from './components/ChameleonHeader';
import { SentenceEditor } from './components/SentenceEditor';
import { FeedbackCard } from './components/FeedbackCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateCommaProblem } from './services/geminiService';
import type { CommaProblem, FeedbackStatus } from './types';

const App: React.FC = () => {
  const [problem, setProblem] = useState<CommaProblem | null>(null);
  const [userSentence, setUserSentence] = useState<string>('');
  const [feedback, setFeedback] = useState<FeedbackStatus>('idle');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const fetchNewProblem = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setFeedback('idle');
    setShowAnswer(false);
    try {
      const newProblem = await generateCommaProblem();
      setProblem(newProblem);
      setUserSentence(newProblem.sentenceWithoutComma);
    } catch (err) {
      console.error('Failed to fetch new problem:', err);
      setError('Oops! We couldn\'t get a new sentence. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNewProblem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckAnswer = () => {
    if (!problem) return;
    const isCorrect = userSentence.trim() === problem.sentenceWithComma.trim();
    if (isCorrect) {
      setFeedback('correct');
      setScore(prev => prev + 1);
    } else {
      setFeedback('incorrect');
    }
    setShowAnswer(true);
  };

  const handleNextProblem = () => {
    fetchNewProblem();
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 flex flex-col items-center p-4 selection:bg-emerald-200">
      <div className="w-full max-w-2xl mx-auto">
        <ChameleonHeader feedbackStatus={feedback} />
        <main className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mt-6 transition-all duration-300">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-700">Where does the comma go?</h2>
            <p className="text-gray-500 mt-1">Click between the words to add a comma!</p>
          </div>

          {isLoading ? (
            <div className="h-48 flex justify-center items-center">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="h-48 flex flex-col justify-center items-center text-center text-red-500">
                <p>{error}</p>
                <button 
                  onClick={handleNextProblem}
                  className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                    Try Again
                </button>
            </div>
          ) : problem ? (
            <>
              <SentenceEditor
                sentence={problem.sentenceWithoutComma}
                onSentenceChange={setUserSentence}
                disabled={showAnswer}
              />
              <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                  onClick={handleCheckAnswer}
                  disabled={showAnswer}
                  className="w-full sm:w-auto px-8 py-3 bg-emerald-500 text-white font-bold rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75 transition-all duration-200 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Check My Answer
                </button>
                {showAnswer && (
                  <button
                    onClick={handleNextProblem}
                    className="w-full sm:w-auto px-8 py-3 bg-amber-500 text-white font-bold rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75 transition-all duration-200 ease-in-out"
                  >
                    Next Sentence
                  </button>
                )}
              </div>
              {showAnswer && problem && (
                <FeedbackCard 
                    status={feedback} 
                    explanation={problem.explanation} 
                    correctSentence={problem.sentenceWithComma} 
                />
              )}
            </>
          ) : null}
        </main>
        <div className="mt-6 text-center text-emerald-600 font-bold text-lg">
          Score: {score}
        </div>
      </div>
    </div>
  );
};

export default App;

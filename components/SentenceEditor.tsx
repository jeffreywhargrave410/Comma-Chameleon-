
import React, { useState, useEffect } from 'react';

interface SentenceEditorProps {
  sentence: string;
  onSentenceChange: (newSentence: string) => void;
  disabled: boolean;
}

export const SentenceEditor: React.FC<SentenceEditorProps> = ({ sentence, onSentenceChange, disabled }) => {
  const [words, setWords] = useState<string[]>([]);
  const [commaPositions, setCommaPositions] = useState<Set<number>>(new Set());

  useEffect(() => {
    setWords(sentence.split(' '));
    setCommaPositions(new Set());
  }, [sentence]);

  useEffect(() => {
    const newSentence = words.reduce((acc, word, index) => {
      if (index === 0) return word;
      const separator = commaPositions.has(index - 1) ? ', ' : ' ';
      return acc + separator + word;
    }, '');
    onSentenceChange(newSentence);
  }, [words, commaPositions, onSentenceChange]);

  const toggleComma = (index: number) => {
    if (disabled) return;
    const newPositions = new Set(commaPositions);
    if (newPositions.has(index)) {
      newPositions.delete(index);
    } else {
      newPositions.add(index);
    }
    setCommaPositions(newPositions);
  };

  return (
    <div className="bg-emerald-50/50 border-2 border-dashed border-emerald-200 rounded-lg p-6 text-center text-2xl sm:text-3xl font-serif leading-relaxed text-gray-700">
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <span className="transition-colors duration-200">{word}</span>
          {index < words.length - 1 && (
            <span
              className={`inline-flex items-center justify-center w-8 h-10 align-middle ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => toggleComma(index)}
            >
              {commaPositions.has(index) ? (
                <span className="text-emerald-600 font-bold text-4xl animate-pop-in">,</span>
              ) : (
                <span className={`w-6 h-1 rounded-full transition-colors duration-200 ${disabled ? 'bg-gray-200' : 'bg-gray-300 hover:bg-emerald-400'}`}></span>
              )}
            </span>
          )}
        </React.Fragment>
      ))}
      <style jsx>{`
        @keyframes pop-in {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

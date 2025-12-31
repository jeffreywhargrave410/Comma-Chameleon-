
export interface CommaProblem {
  sentenceWithoutComma: string;
  sentenceWithComma: string;
  explanation: string;
}

export type FeedbackStatus = 'idle' | 'correct' | 'incorrect';

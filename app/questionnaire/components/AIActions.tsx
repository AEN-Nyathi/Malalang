import React from 'react';

interface AIActionsProps {
  questionId: string;
  questionText: string;
  aiLoading: string | null;
  onEnhance: (questionId: string, questionText: string) => void;
  onSuggest: (questionId: string, questionText: string) => void;
}

const AIActions: React.FC<AIActionsProps> = ({ questionId, questionText, aiLoading, onEnhance, onSuggest }) => {
  return (
    <div className="flex space-x-2 mt-2">
      <button
        onClick={() => onEnhance(questionId, questionText)}
        disabled={!!aiLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {aiLoading === questionId ? 'Enhancing...' : 'Enhance with AI'}
      </button>
      <button
        onClick={() => onSuggest(questionId, questionText)}
        disabled={!!aiLoading}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        {aiLoading === questionId ? 'Suggesting...' : 'Suggest Answers'}
      </button>
    </div>
  );
};

export default AIActions;

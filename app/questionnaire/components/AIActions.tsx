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
    <div className="flex space-x-2 pt-2">
      <button
        type="button"
        onClick={() => onEnhance(questionId, questionText)}
        disabled={!!aiLoading}
        className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:bg-slate-600 transition-colors"
      >
        {aiLoading === questionId ? 'Enhancing...' : 'Enhance with AI'}
      </button>
      <button
        type="button"
        onClick={() => onSuggest(questionId, questionText)}
        disabled={!!aiLoading}
        className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md disabled:bg-slate-600 transition-colors"
      >
        {aiLoading === questionId ? 'Suggesting...' : 'Suggest Answers'}
      </button>
    </div>
  );
};

export default AIActions;

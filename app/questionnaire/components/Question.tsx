import React from 'react';
import { Question as QuestionType, FormData } from './types';
import AIActions from './AIActions';

interface QuestionProps {
  question: QuestionType;
  formData: FormData;
  aiLoading: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onEnhance: (questionId: string, questionText: string) => void;
  onSuggest: (questionId: string, questionText: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, formData, aiLoading, onChange, onEnhance, onSuggest }) => {
  const questionText = question.text
    .replace('{businessName}', formData.businessName || 'your business')
    .replace('{userName}', formData.userName || 'User');

  if (question.type === 'radio') {
    return (
      <div key={question.id} className="mb-4">
        <label className="block text-lg font-medium mb-2">{questionText}</label>
        <div className="flex space-x-4">
          {question.options?.map((option: string) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={formData[question.id] === option}
                onChange={onChange}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="text-lg">{option}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div key={question.id} className="mb-4">
      <label htmlFor={question.id} className="block text-lg font-medium mb-2">
        {questionText}
      </label>
      <textarea
        id={question.id}
        name={question.id}
        value={formData[question.id] || ''}
        onChange={onChange}
        className="w-full p-2 border rounded"
        rows={3}
      />
      <AIActions
        questionId={question.id}
        questionText={questionText}
        aiLoading={aiLoading}
        onEnhance={onEnhance}
        onSuggest={onSuggest}
      />
    </div>
  );
};

export default Question;

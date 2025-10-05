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

  const inputClass = "block w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary";
  const labelClass = "block text-sm font-medium text-slate-300";

  if (question.type === 'radio') {
    return (
      <div key={question.id} className="space-y-2">
        <label className={labelClass}>{questionText}</label>
        <div className="flex items-center space-x-4 pt-2">
          {question.options?.map((option: string) => (
            <label key={option} className="flex items-center space-x-2 text-slate-300">
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={formData[question.id] === option}
                onChange={onChange}
                className="h-4 w-4 rounded-full border-slate-500 bg-slate-700 text-brand-primary focus:ring-brand-primary"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div key={question.id} className="space-y-2">
      <label htmlFor={question.id} className={labelClass}>
        {questionText}
      </label>
      <textarea
        id={question.id}
        name={question.id}
        value={formData[question.id] || ''}
        onChange={onChange}
        className={inputClass}
        rows={4}
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

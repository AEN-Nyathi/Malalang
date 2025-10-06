import React from 'react';
import { Question as QuestionType, FormData, QuestionOption } from './types';
import AIActions from './AIActions';
import FileUploadWidget from './FileUploadWidget';

interface QuestionProps {
  question: QuestionType;
  formData: FormData;
  aiLoading: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCheckboxChange: (id: string, value: string, checked: boolean) => void;
  onFileUpload: (id: string, url: string) => void;
  onEnhance: (questionId: string, questionText: string) => void;
  onSuggest: (questionId: string, questionText: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, formData, aiLoading, onChange, onCheckboxChange, onFileUpload, onEnhance, onSuggest }) => {
  const questionText = question.text
    .replace('{businessName}', formData.businessName || 'your business')
    .replace('{userName}', formData.userName || 'User');

  const inputClass = "block w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary";
  const labelClass = "block text-sm font-medium text-slate-300";

  const renderQuestion = () => {
    switch (question.type) {
      case 'textarea':
        return <textarea id={question.id} name={question.id} value={formData[question.id] || ''} onChange={onChange} className={inputClass} rows={4} />;
      case 'select':
        return (
          <select id={question.id} name={question.id} value={formData[question.id] || ''} onChange={onChange} className={inputClass}>
            {(question.options as QuestionOption[]).map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)
            }
          </select>
        );
      case 'checkbox': {
        if (Array.isArray(question.options)) {
          return (
            <div className="grid grid-cols-2 gap-2">
              {(question.options as string[]).map((opt) => (
                <label key={opt} className="flex items-center gap-2 p-2 bg-slate-800 rounded-md border border-slate-700">
                  <input type="checkbox" checked={Array.isArray(formData[question.id]) && formData[question.id].includes(opt)} onChange={(e) => onCheckboxChange(question.id, opt, e.target.checked)} />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>
          );
        } else {
          const groups = question.options as { [k: string]: string[] };
          return (
            <div className="space-y-3">
              {Object.entries(groups).map(([groupTitle, opts]) => (
                <div key={groupTitle}>
                  <div className="text-xs text-slate-400 font-semibold mb-1">{groupTitle}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {opts.map((opt) => (
                      <label key={opt} className="flex items-center gap-2 p-2 bg-slate-800 rounded-md border border-slate-700">
                        <input type="checkbox" checked={Array.isArray(formData[question.id]) && formData[question.id].includes(opt)} onChange={(e) => onCheckboxChange(question.id, opt, e.target.checked)} />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        }
      }
      case 'radio':
        return (
          <div className="flex items-center space-x-4 pt-2">
            {(question.options as QuestionOption[])?.map((option: any) => (
              <label key={option.value} className="flex items-center space-x-2 text-slate-300">
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={formData[question.id] === option.value}
                  onChange={onChange}
                  className="h-4 w-4 rounded-full border-slate-500 bg-slate-700 text-brand-primary focus:ring-brand-primary"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );
      case 'file-upload':
        return <FileUploadWidget id={question.id} onUploadComplete={onFileUpload} label={question.text} description={question.description || ''} />;
      default:
        return <input id={question.id} name={question.id} value={formData[question.id] || ''} onChange={onChange} className={inputClass} type={question.type} />;
    }
  };

  return (
    <div key={question.id} className="space-y-2">
      <label htmlFor={question.id} className={labelClass}>
        {questionText}
      </label>
      {renderQuestion()}
      {question.aiSupport && (
        <AIActions
          questionId={question.id}
          questionText={questionText}
          aiLoading={aiLoading}
          onEnhance={onEnhance}
          onSuggest={onSuggest}
        />
      )}
    </div>
  );
};

export default Question;

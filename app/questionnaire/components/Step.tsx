import React from 'react';
import { Step as StepType, FormData } from './types';
import Question from './Question';

interface StepProps {
  step: StepType;
  formData: FormData;
  aiLoading: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCheckboxChange: (id: string, value: string, checked: boolean) => void;
  onFileUpload: (id: string, url: string) => void;
  onEnhance: (questionId: string, questionText: string) => void;
  onSuggest: (questionId: string, questionText: string) => void;
}

const Step: React.FC<StepProps> = ({ step, formData, aiLoading, onChange, onCheckboxChange, onFileUpload, onEnhance, onSuggest }) => {
  const visibleQuestions = step.questions.filter((q) => {
      if (q.dependsOn) {
        const dependsVal = formData[q.dependsOn];
        if (q.showIf) return q.showIf(dependsVal);
        return !!dependsVal;
      }
      return true;
    });


  return (
    <fieldset>
      <legend className="text-xl font-semibold text-white mb-4">{step.title}</legend>
        <div className="space-y-6">
        {visibleQuestions.map((q) => (
            <Question
            key={q.id}
            question={q}
            formData={formData}
            aiLoading={aiLoading}
            onChange={onChange}
            onCheckboxChange={onCheckboxChange}
            onFileUpload={onFileUpload}
            onEnhance={onEnhance}
            onSuggest={onSuggest}
            />
        ))}
        </div>
    </fieldset>
  );
};

export default Step;

import React from 'react';
import { Step as StepType, FormData } from './types';
import Question from './Question';

interface StepProps {
  step: StepType;
  formData: FormData;
  aiLoading: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onEnhance: (questionId: string, questionText: string) => void;
  onSuggest: (questionId: string, questionText: string) => void;
}

const Step: React.FC<StepProps> = ({ step, formData, aiLoading, onChange, onEnhance, onSuggest }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
      {step.questions?.map((q) => (
        <Question
          key={q.id}
          question={q}
          formData={formData}
          aiLoading={aiLoading}
          onChange={onChange}
          onEnhance={onEnhance}
          onSuggest={onSuggest}
        />
      ))}
    </div>
  );
};

export default Step;

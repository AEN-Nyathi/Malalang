import React from 'react';
import { Step, FormData } from './types';

interface ReviewStepProps {
  steps: Step[];
  formData: FormData;
  onEdit: (stepIndex: number) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ steps, formData, onEdit }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Review Your Answers</h2>
      {steps.map((s, index) => (
        <div key={s.id} className="mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <button onClick={() => onEdit(index)} className="text-blue-500 hover:underline">
              Edit
            </button>
          </div>
          {s.questions?.map((q) => (
            <div key={q.id} className="ml-4">
              <p className="font-medium">{q.text.replace('{businessName}', formData.businessName).replace('{userName}', formData.userName)}</p>
              <p className="text-gray-600">{formData[q.id]}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ReviewStep;

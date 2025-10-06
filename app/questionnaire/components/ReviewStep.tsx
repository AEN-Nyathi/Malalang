import React from 'react';
import { Step, FormData } from './types';

interface ReviewStepProps {
  steps: Step[];
  formData: FormData;
  onEdit: (stepIndex: number) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ steps, formData, onEdit }) => {
  return (
    <div className="space-y-6">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Review Your Answers</h2>
            <p className="text-slate-400 mt-2">Please review your answers before submitting. You can edit any section by clicking the 'Edit' button.</p>
        </div>

      {steps.map((step, stepIndex) => {
        if (step.id === 'review') return null;
        return (
          <div key={step.id} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              <button onClick={() => onEdit(stepIndex)} className="text-sm text-brand-primary hover:underline">
                Edit
              </button>
            </div>
            <div className="space-y-4">
              {step.questions?.map((q) => (
                <div key={q.id}>
                  <p className="block text-sm font-medium text-slate-300">{q.text.replace('{businessName}', formData.businessName || 'your business')}</p>
                  <p className="text-white mt-1">{formData[q.id] || <span className='text-slate-400'>Not answered</span>}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewStep;

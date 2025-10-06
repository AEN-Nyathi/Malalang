import React from 'react';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ currentStep, totalSteps, isSubmitting, onPrev, onNext, onSubmit }) => {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 0 ? (
        <button onClick={onPrev} className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors">
          Previous
        </button>
      ) : ( <div></div> )}
      {currentStep < totalSteps - 1 ? (
        <button onClick={onNext} className="px-6 py-2 bg-brand-primary hover:bg-brand-primary/80 text-white font-bold rounded-lg transition-colors">
          Next
        </button>
      ) : (
        <button onClick={onSubmit} disabled={isSubmitting} className="w-full bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 transition-colors duration-300 text-lg">
            {isSubmitting ? 'Submitting...' : 'Submit Questionnaire'}
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;

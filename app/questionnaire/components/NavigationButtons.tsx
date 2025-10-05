import React from 'react';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ currentStep, totalSteps, onPrev, onNext, onSubmit }) => {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 0 && (
        <button onClick={onPrev} className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400">
          Previous
        </button>
      )}
      {currentStep < totalSteps - 1 ? (
        <button onClick={onNext} className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Next
        </button>
      ) : (
        <button onClick={onSubmit} className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Submit
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;

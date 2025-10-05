import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-brand-primary bg-brand-primary/20">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className='text-sm text-slate-400'>
                {steps[currentStep].title}
            </span>
        </div>
      <div className="overflow-hidden h-2 text-xs flex rounded bg-slate-700">
        <div
          style={{ width: `${progressPercentage}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-primary transition-all duration-500"
        ></div>
      </div>
    </div>
  );
};

// Add this line to import the steps array
import { steps } from './constants';

export default ProgressBar;

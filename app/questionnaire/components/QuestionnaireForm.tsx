'use client';

import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import ProgressBar from './ProgressBar';
import NavigationButtons from './NavigationButtons';
import ReviewStep from './ReviewStep';
import Step from './Step';
import { steps } from './constants';
import { FormData } from './types';

interface QuestionnaireFormProps {
  clientData?: {
    userName?: string;
    businessName?: string;
  } | null;
}

export default function QuestionnaireForm({ clientData }: QuestionnaireFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    userName: clientData?.userName || 'there',
    businessName: clientData?.businessName || '',
  });
  const [aiLoading, setAiLoading] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleEdit = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleEnhance = async (questionId: string, questionText: string) => {
    setAiLoading(questionId);
    try {
      const response = await fetch('/api/questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'enhance',
          payload: {
            question: questionText,
            answer: formData[questionId] || '',
            businessName: formData.businessName || '',
            userName: formData.userName || 'there',
          },
        }),
      });
      const data = await response.json();
      setFormData((prev) => ({ ...prev, [questionId]: data.result }));
    } catch (error) {
      console.error('Error enhancing answer:', error);
    }
    setAiLoading(null);
  };

  const handleSuggest = async (questionId: string, questionText: string) => {
    setAiLoading(questionId);
    try {
      const response = await fetch('/api/questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'suggest',
          payload: {
            question: questionText,
            businessName: formData.businessName || '',
            userName: formData.userName || 'there',
          },
        }),
      });
      const data = await response.json();
      alert(`Suggestions:\n- ${data.result.join('\n- ')}`);
    } catch (error) {
      console.error('Error suggesting answers:', error);
    }
    setAiLoading(null);
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'questionnaires'), formData);
      alert('Questionnaire submitted successfully!');
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      alert('Failed to submit questionnaire.');
    }
  };

  const renderStep = () => {
    const step = steps[currentStep];

    if (step.id === 'review') {
      return <ReviewStep steps={steps} formData={formData} onEdit={handleEdit} />;
    }

    return (
      <Step
        step={step}
        formData={formData}
        aiLoading={aiLoading}
        onChange={handleChange}
        onEnhance={handleEnhance}
        onSuggest={handleSuggest}
      />
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
      {renderStep()}
      <NavigationButtons
        currentStep={currentStep}
        totalSteps={steps.length}
        onPrev={handlePrev}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

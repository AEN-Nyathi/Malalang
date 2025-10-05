'use client';

import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

type Question = {
  id: string;
  text: string;
  type?: 'radio';
  options?: string[];
};

type Step = {
  id: string;
  title: string;
  questions?: Question[];
};

const steps: Step[] = [
  {
    id: 'business',
    title: 'Business & Brand Identity',
    questions: [
      { id: 'businessName', text: 'What is the name of your business?' },
      { id: 'businessDescription', text: 'May you briefly describe {businessName}?' },
    ],
  },
  {
    id: 'goals',
    title: 'Project Goals & Scope',
    questions: [{ id: 'projectGoals', text: 'What do you want to achieve with this new website?' }],
  },
  {
    id: 'design',
    title: 'Design & Aesthetics',
    questions: [
      { id: 'brandColors', text: 'What are your brand colors?' },
      { id: 'designInspiration', text: 'Are there any websites you admire?' },
    ],
  },
  {
    id: 'content',
    title: 'Content & Functionality',
    questions: [
      { id: 'pages', text: 'What pages do you need (e.g., Home, About, Services, Contact)?' },
      { id: 'features', text: 'What features are essential (e.g., blog, gallery, contact form)?' },
    ],
  },
  {
    id: 'technical',
    title: 'Technical & Logistics',
    questions: [
      { id: 'domainName', text: 'Do you have a domain name?' },
      { id: 'hosting', text: 'Do you have a hosting provider?' },
    ],
  },
  {
    id: 'package',
    title: 'Package Selection',
    questions: [
      {
        id: 'package',
        text: 'Please select a package that best suits your needs',
        type: 'radio',
        options: ['Basic', 'Standard', 'Premium'],
      },
    ],
  },
  { id: 'review', title: 'Review & Submit' },
];

interface QuestionnaireFormProps {
  clientData?: {
    userName?: string;
    businessName?: string;
  } | null;
}

export default function QuestionnaireForm({ clientData }: QuestionnaireFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({
    userName: clientData?.userName || 'there', // Default value
    businessName: clientData?.businessName || '',
  });
  const [aiLoading, setAiLoading] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
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
      setFormData((prev: any) => ({ ...prev, [questionId]: data.result }));
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
      // Simple implementation: alert suggestions
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
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Review Your Answers</h2>
          {steps.map((s, index) => (
            <div key={s.id} className="mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <button onClick={() => handleEdit(index)} className="text-blue-500 hover:underline">
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
    }

    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
        {step.questions?.map((q) => {
            const questionText = q.text.replace('{businessName}', formData.businessName || 'your business').replace('{userName}', formData.userName || 'User');
            if (q.type === 'radio') {
                return (
                    <div key={q.id} className="mb-4">
                        <label className="block text-lg font-medium mb-2">{questionText}</label>
                        <div className="flex space-x-4">
                            {q.options?.map((option) => (
                                <label key={option} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name={q.id}
                                        value={option}
                                        checked={formData[q.id] === option}
                                        onChange={handleChange}
                                        className="form-radio h-5 w-5 text-blue-600"
                                    />
                                    <span className="text-lg">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                );
            }
            return (
                <div key={q.id} className="mb-4">
                    <label htmlFor={q.id} className="block text-lg font-medium mb-2">
                        {questionText}
                    </label>
                    <textarea
                        id={q.id}
                        name={q.id}
                        value={formData[q.id] || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows={3}
                    />
                    <div className="flex space-x-2 mt-2">
                        <button
                            onClick={() => handleEnhance(q.id, questionText)}
                            disabled={!!aiLoading}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                        >
                            {aiLoading === q.id ? 'Enhancing...' : 'Enhance with AI'}
                        </button>
                        <button
                            onClick={() => handleSuggest(q.id, questionText)}
                            disabled={!!aiLoading}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
                        >
                            {aiLoading === q.id ? 'Suggesting...' : 'Suggest Answers'}
                        </button>
                    </div>
                </div>
            )
        })}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="mb-8">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <div
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            ></div>
          </div>
        </div>
      </div>

      {renderStep()}

      <div className="flex justify-between mt-8">
        {currentStep > 0 && (
          <button onClick={handlePrev} className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Previous
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button onClick={handleNext} className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

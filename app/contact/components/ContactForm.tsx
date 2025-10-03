'use client';

import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '@/lib/firebase';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: new Date(),
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
        console.error("Error adding document: ", error);
        setError("There was an error sending your message. Please try again.");
        setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        className="bg-brand-dark p-8 rounded-lg border border-brand-secondary/50 h-full flex flex-col justify-center items-center text-center"
        role="status"
        aria-live="polite"
      >
         <div className="text-brand-secondary mb-4" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Thank You!</h2>
        <p className="text-slate-300 mt-2">Your message has been sent successfully. We will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <div className="bg-brand-dark p-8 rounded-lg border border-slate-800">
      <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
      <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
        <div className="mb-4">
          <label htmlFor="name" className="block text-slate-300 font-semibold mb-2">
            Full Name <span className="text-red-400" aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-slate-800 border text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary ${
              fieldErrors.name ? 'border-red-400' : 'border-slate-700'
            }`}
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
            autoComplete="name"
          />
          {fieldErrors.name && (
            <p id="name-error" className="text-red-400 text-sm mt-1" role="alert">
              {fieldErrors.name}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-slate-300 font-semibold mb-2">
            Email Address <span className="text-red-400" aria-label="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-slate-800 border text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary ${
              fieldErrors.email ? 'border-red-400' : 'border-slate-700'
            }`}
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            autoComplete="email"
          />
          {fieldErrors.email && (
            <p id="email-error" className="text-red-400 text-sm mt-1" role="alert">
              {fieldErrors.email}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-slate-300 font-semibold mb-2">
            Message <span className="text-red-400" aria-label="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={`w-full bg-slate-800 border text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary ${
              fieldErrors.message ? 'border-red-400' : 'border-slate-700'
            }`}
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? 'message-error' : undefined}
          ></textarea>
          {fieldErrors.message && (
            <p id="message-error" className="text-red-400 text-sm mt-1" role="alert">
              {fieldErrors.message}
            </p>
          )}
        </div>
         {error && (
           <div className="text-red-400 text-center mb-4 p-3 bg-red-400/10 rounded-lg" role="alert" aria-live="assertive">
             {error}
           </div>
         )}
        <div className="text-right">
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-primary hover:bg-brand-primary/80 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                aria-label={isSubmitting ? 'Sending your message' : 'Send message'}
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

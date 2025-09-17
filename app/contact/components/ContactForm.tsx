import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '/lib/firebase.ts';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
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
      <div className="bg-brand-dark p-8 rounded-lg border border-brand-secondary/50 h-full flex flex-col justify-center items-center text-center">
         <div className="text-brand-secondary mb-4">
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
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="name" className="block text-slate-400 font-semibold mb-2">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-slate-400 font-semibold mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-slate-400 font-semibold mb-2">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            required
          ></textarea>
        </div>
         {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        <div className="text-right">
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-primary hover:bg-brand-primary/80 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
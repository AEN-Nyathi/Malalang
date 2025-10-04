'use client';

import React, { useState } from 'react';
import QuestionnaireForm from './components/QuestionnaireForm';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ClientData } from '@/lib/types';

const QuestionnairePage: React.FC = () => {
    type FlowState = 'initial' | 'prompt-phone' | 'loading' | 'form-loaded';
    const [flowState, setFlowState] = useState<FlowState>('initial');
    const [clientData, setClientData] = useState<ClientData | null>(null);
    const [phone, setPhone] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleFetchClientData = async () => {
        if (!phone) {
            setError('Please enter your phone number.');
            return;
        }
        setFlowState('loading');
        setError(null);

        // Normalize and generate phone number variations
        const cleanedPhone = phone.replace(/\s/g, ''); // Remove spaces
        const phoneVariations = new Set([cleanedPhone]);

        if (cleanedPhone.startsWith('+27')) {
            phoneVariations.add('0' + cleanedPhone.substring(3));
        } else if (cleanedPhone.startsWith('27')) {
            phoneVariations.add('0' + cleanedPhone.substring(2));
        } else if (cleanedPhone.startsWith('0')) {
            phoneVariations.add('+27' + cleanedPhone.substring(1));
        }

        let foundData: ClientData | null = null;

        try {
            for (const p of phoneVariations) {
                const clientRef = doc(db, 'clients', p);
                const docSnap = await getDoc(clientRef);
                if (docSnap.exists()) {
                    foundData = docSnap.data() as ClientData;
                    break; // Exit loop once found
                }
            }

            if (foundData) {
                setClientData(foundData);
                setFlowState('form-loaded');
            } else {
                setError('No booking found for this phone number. You can proceed as a new client by clicking "No".');
                setFlowState('initial');
            }
        } catch (e) {
            console.error('Error fetching client data:', e);
            setError('An error occurred while looking up your booking. Please try again.');
            setFlowState('initial');
        }
    };

    const renderInitialStep = () => (
        <div className="text-center bg-brand-dark p-8 rounded-lg max-w-2xl mx-auto border border-slate-700">
            {error && <p className="text-red-400 bg-red-900/20 p-3 rounded-md mb-6">{error}</p>}
            <h2 className="text-2xl font-bold text-white mb-4">Have you booked an initial session with us before?</h2>
            <p className="text-slate-400 mb-6">If so, we can pre-fill some of your information.</p>
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => { setError(null); setFlowState('prompt-phone'); }}
                    className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                    Yes, I Have
                </button>
                <button
                    onClick={() => { setError(null); setClientData(null); setFlowState('form-loaded'); }}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                    No, I'm New
                </button>
            </div>
        </div>
    );

    const renderPhonePrompt = () => (
        <div className="text-center bg-brand-dark p-8 rounded-lg max-w-2xl mx-auto border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-2">Find Your Booking</h2>
            <p className="text-slate-400 mb-6">Please enter the phone number you used during your booking.</p>
            <div className="flex flex-col items-center gap-4">
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g., 0821234567"
                    className="w-full max-w-sm px-4 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                />
                <button
                    onClick={handleFetchClientData}
                    className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-2 px-8 rounded-lg transition-colors w-full max-w-sm"
                >
                    Find My Booking
                </button>
                <button
                    onClick={() => setFlowState('initial')}
                    className="text-slate-400 hover:text-white text-sm mt-2"
                >
                    Back
                </button>
            </div>
        </div>
    );

    const renderLoading = () => (
        <div className="text-center bg-brand-dark p-8 rounded-lg max-w-2xl mx-auto border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4 animate-pulse">Finding your booking...</h2>
        </div>
    );

    const renderContent = () => {
        switch (flowState) {
            case 'initial':
                return renderInitialStep();
            case 'prompt-phone':
                return renderPhonePrompt();
            case 'loading':
                return renderLoading();
            case 'form-loaded':
                return <QuestionnaireForm clientData={clientData} />;
            default:
                return renderInitialStep();
        }
    };

    return (
        <main>
            <section className="py-20 bg-slate-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Website Project Questionnaire</h1>
                        <p className="text-xl text-brand-primary font-semibold max-w-3xl mx-auto">
                            {flowState === 'form-loaded'
                                ? 'Please fill out this form to the best of your ability. The more detail you provide, the better we can understand your vision.'
                                : "Let's get started by identifying you."
                            }
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        {renderContent()}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default QuestionnairePage;

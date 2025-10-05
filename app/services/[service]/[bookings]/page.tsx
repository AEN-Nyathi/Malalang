'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import BookingForm from './components/BookingForm';
import { SERVICE_PACKAGES } from '@/lib/constants/services';

const QuestionnairePage: React.FC = () => {
    const params = useParams();
    const bookingUrl = params.bookings as string;
    const service = SERVICE_PACKAGES.find(s => s.serviceUrl === bookingUrl);

    if (!service) {
        return <p>Service not found</p>; // Or a more styled 404
    }

    return (
        <main className="container mx-auto px-6 py-12 md:py-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Let's Start with a Conversation</h1>
                <p className="mt-4 text-lg text-slate-300">
                    You've selected the <span className="font-semibold text-brand-primary">{service.title}</span>. The first step is a one-on-one meeting where we'll discuss your business, goals, and vision for the new website.
                </p>
                <p className="mt-4 text-slate-400">
                    After our chat, we'll move on to a detailed questionnaire and then a project kick-off. Use the form below to find a time that works for you.
                </p>
            </div>
            <BookingForm service={service} />
        </main>
    );
};

export default QuestionnairePage;

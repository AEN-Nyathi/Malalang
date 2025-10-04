'use client';

import React, { useState } from 'react';
import { collection, addDoc, doc, setDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ServicePackage } from '@/lib/types';
import { SERVICE_PACKAGES } from '@/lib/constants/services';

interface Props {
    service: ServicePackage;
}

const ServiceQuestionnaireForm: React.FC<Props> = ({ service }) => {
    const [formData, setFormData] = useState<any>({
        meetingType: 'Face-to-Face', // Default value
        servicePackage: service.slug, // Pre-select the service
        isWhatsApp: false,
        fullName: '',
        businessName: '',
        email: '',
        phone: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.phone) {
            setError('Phone number is required to create a client record.');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const submittedAt = new Date();
            const serviceTitle = SERVICE_PACKAGES.find(p => p.slug === formData.servicePackage)?.title;

            // 1. Add to the specific service collection
            await addDoc(collection(db, service.slug), {
                ...formData,
                serviceTitle,
                submittedAt,
            });

            // 2. Create or update the central client record
            const clientRef = doc(db, 'clients', formData.phone);
            const clientSnap = await getDoc(clientRef);

            const newBooking = {
                servicePackage: formData.servicePackage,
                serviceTitle,
                submittedAt,
                bookingId: (await addDoc(collection(db, 'clientBookings'), {})).id // Create a unique ID for the booking
            };

            if (clientSnap.exists()) {
                // Update existing client
                await setDoc(clientRef, {
                    ...formData,
                    updatedAt: submittedAt,
                    bookings: arrayUnion(newBooking)
                }, { merge: true });
            } else {
                // Create new client
                await setDoc(clientRef, {
                    ...formData,
                    createdAt: submittedAt,
                    bookings: [newBooking]
                });
            }

            setIsSubmitted(true);
        } catch (e) {
            console.error('Error adding document: ', e);
            setError('There was an error submitting your booking. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };


    if (isSubmitted) {
        return (
            <div className="text-center bg-brand-dark p-8 rounded-lg max-w-3xl mx-auto border border-slate-700">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Thank you for booking your first meeting with AEN Nyath.</h2>
                <p className="text-slate-300 text-lg mb-6">We’re excited to learn more about your business and goals. You’ll receive a confirmation email shortly with the meeting details.</p>
                <div className="text-left bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                    <p className="font-semibold text-white mb-3">In our first session, we’ll explore:</p>
                    <ul className="list-disc list-inside space-y-2 text-slate-400">
                        <li>Your business story and what makes it unique</li>
                        <li>Your goals for the website</li>
                        <li>Your target audience</li>
                        <li>What success looks like for you</li>
                    </ul>
                </div>
                 <p className="text-slate-400 mt-6">After this meeting, we’ll send you a detailed questionnaire to help us gather all the technical and design requirements. Then we’ll schedule a kick-off meeting to finalize the scope and timeline.</p>
            </div>
        );
    }

    const inputClass = "mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary";
    const labelClass = "block text-sm font-medium text-slate-300";
    const noteClass = "mt-2 p-3 text-sm text-slate-400";

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto bg-brand-dark p-8 rounded-lg border border-slate-800">
            <div className="text-center">
                 <h2 className="text-3xl font-bold text-white">Book Your Initial Strategic Session</h2>
                 <p className="text-slate-400 mt-2">This is the first step. Let's discuss your vision and goals for the <span className="text-brand-primary font-semibold">{service.title}</span>.</p>
            </div>

            {/* Client Information */}
            <fieldset>
                <legend className="text-xl font-semibold text-white mb-4">1. Your Information</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="fullName" className={labelClass}>Full Name</label>
                        <input type="text" name="fullName" id="fullName" onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="businessName" className={labelClass}>Business Name (Optional)</label>
                        <input type="text" name="businessName" id="businessName" onChange={handleChange} className={inputClass} />
                    </div>
                     <div>
                        <label htmlFor="email" className={labelClass}>Email Address (Optional)</label>
                        <input type="email" name="email" id="email" onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="phone" className={labelClass}>Phone Number</label>
                        <input type="tel" name="phone" id="phone" onChange={handleChange} required className={inputClass} />
                         <div className="mt-2 flex items-center">
                            <input id="isWhatsApp" name="isWhatsApp" type="checkbox" checked={formData.isWhatsApp} onChange={handleChange} className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-brand-primary focus:ring-brand-primary" />
                            <label htmlFor="isWhatsApp" className="ml-2 block text-sm text-slate-400">This is my WhatsApp number.</label>
                        </div>
                    </div>
                </div>
            </fieldset>

            {/* Meeting Preferences */}
            <fieldset>
                <legend className="text-xl font-semibold text-white mb-4">2. Meeting Preferences</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="meetingType" className={labelClass}>Preferred Meeting Type</label>
                         <div className="mt-2 text-sm text-amber-300/90 p-3 bg-amber-900/20 rounded-md border border-amber-800/50">
                            <span className="font-bold">We strongly prefer a face-to-face meeting.</span> It helps us build a stronger connection and gain a clearer understanding of your vision.
                        </div>
                        <select name="meetingType" id="meetingType" value={formData.meetingType} onChange={handleChange} className={`${inputClass} mt-3`}>
                            <option value="Face-to-Face">Face-to-Face Meeting</option>
                            <option value="Virtual">Virtual (Zoom/Google Meet)</option>
                        </select>
                    </div>

                    {formData.meetingType === 'Face-to-Face' ? (
                        <div>
                            <label htmlFor="meetingLocation" className={labelClass}>Preferred Meeting Location</label>
                            <div className="mt-2 text-sm md:pb-8 p-3 text-slate-400 rounded-md border border-slate-400">
                                e.g., Your office, or our spot at Central Eatery Restaurant in Lulekani, Phalaborwa (next to Shell).
                            </div>
                             <input type="text" name="meetingLocation" id="meetingLocation" onChange={handleChange} className={`${inputClass} mt-3`} placeholder="Let us know your preference" />
                        </div>
                    ) : (
                        <div></div> // This empty div maintains the grid alignment
                    )}
                    
                    <div>
                        <label htmlFor="preferredDate" className={labelClass}>Preferred Date</label>
                        <input type="date" name="preferredDate" id="preferredDate" onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="preferredTime" className={labelClass}>Preferred Time</label>
                        <input type="time" name="preferredTime" id="preferredTime" onChange={handleChange} required className={inputClass} />
                    </div>
                </div>
            </fieldset>
            
            {/* Selected Service and Notes */}
            <fieldset>
                 <legend className="text-xl font-semibold text-white mb-4">3. Service & Notes</legend>
                 <div className="space-y-6">
                    <div>
                        <label htmlFor="servicePackage" className={labelClass}>Selected Service Package</label>
                        <select name="servicePackage" id="servicePackage" value={formData.servicePackage} onChange={handleChange} required className={inputClass}>
                            {SERVICE_PACKAGES.map(pkg => (
                                <option key={pkg.slug} value={pkg.slug}>{pkg.title} – {pkg.price}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="additionalNotes" className={labelClass}>Additional Notes (Optional)</label>
                        <textarea name="additionalNotes" id="additionalNotes" rows={4} onChange={handleChange} placeholder="Share any early thoughts or questions you’d like to discuss..." className={inputClass}></textarea>
                    </div>
                 </div>
            </fieldset>

            {error && <p className="text-red-500 text-center bg-red-900/20 p-3 rounded-md">{error}</p>}

            <button type="submit" disabled={isSubmitting} className="w-full bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 transition-colors duration-300 text-lg">
                {isSubmitting ? 'Submitting...' : 'Schedule Your First Meeting'}
            </button>
        </form>
    );
};

export default ServiceQuestionnaireForm;

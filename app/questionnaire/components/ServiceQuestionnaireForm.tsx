'use client';

import React, { useState } from 'react';
import { collection, addDoc, doc, setDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ServicePackage } from '@/lib/types';
import { SERVICE_PACKAGES } from '@/lib/constants/services';
import { z, ZodError } from 'zod';
import { questionnaireSchema } from '@/lib/validation';
import PhoneNumberInput from '@/app/components/PhoneNumberInput';

interface Props {
    service: ServicePackage;
}

const ServiceQuestionnaireForm: React.FC<Props> = ({ service }) => {
    const [formData, setFormData] = useState<any>({
        meetingType: 'Face-to-Face',
        servicePackage: service.slug,
        isWhatsApp: false,
        fullName: '',
        businessName: '',
        email: '',
        phone: '',
        meetingLocation: 'Central Eatery Restaurant', // Default value
        officeLocation: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handlePhoneChange = (phoneValue: string) => {
        setFormData({ ...formData, phone: phoneValue });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormErrors({});
        setError(null);

        const fullPhoneNumber = `+27${formData.phone}`;
        const dataToValidate = {
            ...formData,
            phone: fullPhoneNumber,
        };

        try {
            questionnaireSchema.parse(dataToValidate);
        } catch (error) {
            if (error instanceof ZodError) {
                const errors: any = {};
                error.issues.forEach((err) => {
                    errors[err.path[0]] = err.message;
                });
                setFormErrors(errors);
                return;
            }
        }

        setIsSubmitting(true);

        try {
            const submittedAt = new Date();
            const serviceTitle = SERVICE_PACKAGES.find(p => p.slug === formData.servicePackage)?.title;

            const finalData = {
                ...dataToValidate,
                serviceTitle,
                submittedAt,
            };

            await addDoc(collection(db, service.slug), finalData);

            const clientRef = doc(db, 'clients', fullPhoneNumber);
            const clientSnap = await getDoc(clientRef);

            const newBooking = {
                servicePackage: formData.servicePackage,
                serviceTitle,
                submittedAt,
                bookingId: (await addDoc(collection(db, 'clientBookings'), {})).id
            };

            if (clientSnap.exists()) {
                await setDoc(clientRef, {
                    ...finalData,
                    updatedAt: submittedAt,
                    bookings: arrayUnion(newBooking)
                }, { merge: true });
            } else {
                await setDoc(clientRef, {
                    ...finalData,
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
            </div>
        );
    }

    const inputClass = "block w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary";
    const labelClass = "block text-sm font-medium text-slate-300";

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto bg-brand-dark p-8 rounded-lg border border-slate-800">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white">Schedule Your First Meeting</h2>
                <p className="text-slate-400 mt-2">This is the first step. Let's discuss your vision and goals for the <span className="text-brand-primary font-semibold">{service.title}</span>.</p>
            </div>

            <fieldset>
                <legend className="text-xl font-semibold text-white mb-4">1. Your Information</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="fullName" className={labelClass}>Full Name</label>
                        <input type="text" name="fullName" id="fullName" onChange={handleChange} className={inputClass} />
                        {formErrors.fullName && <p className="text-red-500 text-sm">{formErrors.fullName}</p>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="businessName" className={labelClass}>Business Name (Optional)</label>
                        <input type="text" name="businessName" id="businessName" onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className={labelClass}>Email Address</label>
                        <input type="email" name="email" id="email" onChange={handleChange} className={inputClass} />
                        {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="phone" className={labelClass}>Phone Number</label>
                        <PhoneNumberInput
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            placeholder="712345678"
                        />
                        {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                        <div className="flex items-center pt-1">
                            <input id="isWhatsApp" name="isWhatsApp" type="checkbox" checked={formData.isWhatsApp} onChange={handleChange} className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-brand-primary focus:ring-brand-primary" />
                            <label htmlFor="isWhatsApp" className="ml-2 block text-sm text-slate-400">This is my WhatsApp number.</label>
                        </div>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                 <legend className="text-xl font-semibold text-white mb-4">2. Meeting Preferences</legend>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="meetingType" className={labelClass}>Preferred Meeting Type</label>
                        <select name="meetingType" id="meetingType" value={formData.meetingType} onChange={handleChange} className={inputClass}>
                            <option value="Face-to-Face">Face-to-Face Meeting</option>
                            <option value="Virtual">Virtual (Zoom/Google Meet)</option>
                        </select>
                    </div>
                    {formData.meetingType === 'Face-to-Face' && (
                        <div className="space-y-2">
                            <label htmlFor="meetingLocation" className={labelClass}>Preferred Meeting Location</label>
                            <select name="meetingLocation" id="meetingLocation" value={formData.meetingLocation} onChange={handleChange} className={inputClass}>
                                <option value="Central Eatery Restaurant">Central Eatery Restaurant (next to Shell, Lulekani)</option>
                                <option value="My Office">My Office</option>
                            </select>
                        </div>
                    )}
                    {formData.meetingLocation === 'My Office' && formData.meetingType === 'Face-to-Face' && (
                        <div className="space-y-2">
                            <label htmlFor="officeLocation" className={labelClass}>Your Office Location</label>
                            <input type="text" name="officeLocation" id="officeLocation" onChange={handleChange} className={inputClass} placeholder="Enter your office address" />
                            {formErrors.officeLocation && <p className="text-red-500 text-sm">{formErrors.officeLocation}</p>}
                        </div>
                    )}
                    <div className="space-y-2">
                        <label htmlFor="preferredDate" className={labelClass}>Preferred Date</label>
                        <input type="date" name="preferredDate" id="preferredDate" onChange={handleChange} className={inputClass} />
                        {formErrors.preferredDate && <p className="text-red-500 text-sm">{formErrors.preferredDate}</p>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="preferredTime" className={labelClass}>Preferred Time</label>
                        <input type="time" name="preferredTime" id="preferredTime" onChange={handleChange} className={inputClass} />
                        {formErrors.preferredTime && <p className="text-red-500 text-sm">{formErrors.preferredTime}</p>}
                    </div>
                </div>
            </fieldset>

            <fieldset>
                 <legend className="text-xl font-semibold text-white mb-4">3. Service & Notes</legend>
                 <div className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="servicePackage" className={labelClass}>Selected Service Package</label>
                        <select name="servicePackage" id="servicePackage" value={formData.servicePackage} onChange={handleChange} className={inputClass}>
                            {SERVICE_PACKAGES.map(pkg => (
                                <option key={pkg.slug} value={pkg.slug}>{pkg.title} – {pkg.price}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="additionalNotes" className={labelClass}>Additional Notes (Optional)</label>
                        <textarea name="additionalNotes" id="additionalNotes" rows={4} onChange={handleChange} placeholder="Share any early thoughts..." className={inputClass}></textarea>
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

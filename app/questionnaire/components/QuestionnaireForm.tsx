'use client';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ZodError } from 'zod';
import { db } from '../../../lib/firebase';
import { SERVICE_PACKAGES } from '../../../lib/constants/services';
import ImageColorPicker from '../../../components/ImageColorPicker';
import { ClientData } from '@/lib/types';
import FileUploadWidget from './FileUploadWidget';
import PhoneNumberInput from '@/components/PhoneNumberInput';
import { websiteBlueprintSchema } from '@/lib/validation';

interface Props {
    clientData: ClientData | null;
}

interface Question {
    id: string;
    section: string;
    label: string;
    type: string;
    required?: boolean;
    options?: any;
    dependsOn?: string;
    dependsValue?: string;
    showIf?: (value: any) => boolean;
}

interface QuestionnaireFormData {
    fullName: string;
    email: string;
    phone: string;
    servicePackage: string;
    [key: string]: any;
}

const ALL_QUESTIONS: Question[] = [
    { id: 'business_name', section: 'business_brand_identity', label: 'Business Name', type: 'text', required: true },
    { id: 'business_summary', section: 'business_brand_identity', label: 'Briefly describe your business', type: 'textarea', required: true },
    { id: 'target_audience', section: 'business_brand_identity', label: 'Who is your target audience?', type: 'textarea', required: true },
    { id: 'competitors', section: 'design_content', label: 'Who are your main competitors?', type: 'textarea' },
    { id: 'design_inspiration', section: 'design_content', label: 'Share 2-3 websites you like the look of', type: 'textarea' },
    { id: 'brand_colors', section: 'design_content', label: 'What are your brand colors?', type: 'color-picker' },
    { id: 'required_pages', section: 'design_content', label: 'What pages do you need?', type: 'checkbox', options: ['Home', 'About', 'Services', 'Contact', 'Blog', 'Portfolio', 'Testimonials'] },
    { id: 'logo_upload', section: 'design_content', label: 'Upload your logo', type: 'file-upload' },
    { id: 'hasLogo', section: 'design_content', label: 'Do you have an existing logo?', type: 'select', options: [ { value: '', label: 'Please select' }, { value: 'yes', label: 'Yes, I have a logo.' }, { value: 'no', label: 'No, I need one created.' } ] },
    { id: 'special_features', section: 'features_functionality', label: 'Do you need any special features?', type: 'checkbox', options: ['E-commerce', 'Booking System', 'Blog', 'Customer Login'] },
    { id: 'ecommerce_details', section: 'features_functionality', label: 'If e-commerce, what will you be selling?', type: 'textarea', dependsOn: 'special_features', dependsValue: 'E-commerce' },
    { id: 'booking_details', section: 'features_functionality', label: 'If booking system, what kind of bookings?', type: 'textarea', dependsOn: 'special_features', dependsValue: 'Booking System' },
];

const QUESTIONNAIRE_SECTIONS = [
    { id: 'business_brand_identity', title: '1. Business & Brand Identity', description: 'Tell us about your business and brand.' },
    { id: 'design_content', title: '2. Design & Content', description: 'Help us understand the look and feel you want for your website.' },
    { id: 'features_functionality', title: '3. Features & Functionality', description: 'Let us know about any special features you need.' },
];

const QuestionnaireForm: React.FC<Props> = ({ clientData }) => {
    const initialFormData = useMemo((): QuestionnaireFormData => {
        const defaults = ALL_QUESTIONS.reduce((acc, q) => ({ ...acc, [q.id]: '' }), {});
        return {
            fullName: clientData?.fullName || '',
            email: clientData?.email || '',
            phone: clientData?.phone || '',
            servicePackage: clientData?.bookings?.[0]?.servicePackage || SERVICE_PACKAGES[0].serviceUrl,
            ...defaults,
        };
    }, [clientData]);

    const [formData, setFormData] = useState<QuestionnaireFormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<any>({});

    useEffect(() => {
        setFormData(initialFormData);
    }, [initialFormData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (value: string) => {
        setFormData(prev => ({ ...prev, phone: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        setFormData(prev => {
            const currentValues = prev[name] ? String(prev[name]).split(', ') : [];
            const newValues =
                checked
                    ? [...currentValues, value]
                    : currentValues.filter(v => v !== value);
            return { ...prev, [name]: newValues.join(', ') };
        });
    };

    const handlePaletteChange = (colors: string[]) => {
        setFormData(prev => ({ ...prev, brand_colors: colors.join(', ') }));
    };

    const handleFileUpload = (id: string, url: string) => {
        setFormData(prev => ({ ...prev, [id]: url }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormErrors({});
        setError(null);

        try {
            websiteBlueprintSchema.parse(formData);
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
            await addDoc(collection(db, 'website_blueprints'), {
                ...formData,
                submittedAt: new Date(),
                client: clientData
            });
            setIsSubmitted(true);
        } catch (err: any) {
            setError(`Failed to submit blueprint. Please try again. Error: ${err.message}`);
            setIsSubmitting(false);
        }
    };

    const inputClass = "w-full p-3 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary read-only:bg-slate-900 read-only:text-slate-400";
    const labelClass = "block text-sm font-semibold text-slate-300";

    const renderQuestion = useCallback((question: Question) => {
        const { id, label, type, options, required, dependsOn, showIf, dependsValue } = question;

        if (dependsOn && showIf && !showIf(formData[dependsOn])) {
            return null;
        }

        if (dependsOn && dependsValue && !formData[dependsOn]?.includes(dependsValue)) {
            return null;
        }

        const value = formData[id] || '';
        const error = formErrors[id];

        const renderInput = () => {
            switch (type) {
                case 'textarea':
                    return <textarea id={id} name={id} value={value} onChange={handleChange} required={required} className={inputClass} rows={4}></textarea>;
                case 'select':
                    return (
                        <select id={id} name={id} value={value} onChange={handleChange} required={required} className={inputClass}>
                            {options.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    );
                case 'checkbox':
                    return <div className="grid grid-cols-2 gap-3 mt-2">{options.map((opt: string) => <label key={opt} className="flex items-center gap-2 p-3 bg-slate-800 border border-slate-700 rounded-md cursor-pointer hover:bg-slate-700"><input type="checkbox" name={id} value={opt} checked={value.includes(opt)} onChange={handleCheckboxChange} className="form-checkbox bg-slate-900 border-slate-600 text-brand-primary focus:ring-brand-primary" /><span>{opt}</span></label>)}</div>;
                case 'color-picker':
                    return <ImageColorPicker onPaletteChange={handlePaletteChange} />;
                case 'file-upload':
                    return <FileUploadWidget id={id} label={label} description='' onUploadComplete={handleFileUpload} />;
                default:
                    return <input type={type} id={id} name={id} value={value} onChange={handleChange} required={required} className={inputClass} />;
            }
        };

        return (
            <div key={id} className="space-y-2">
                <label htmlFor={id} className={labelClass}>{label}</label>
                {renderInput()}
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
        );
    }, [formData, formErrors, handleChange, handleCheckboxChange, handlePaletteChange, handleFileUpload]);

    if (isSubmitted) {
        return <div className="text-center p-8 bg-brand-dark rounded-lg max-w-2xl mx-auto border border-green-500"><h2 className="text-2xl font-bold text-green-400 mb-4">Thank You!</h2><p className="text-slate-300">Your website blueprint has been submitted successfully. We will be in touch shortly to discuss the next steps.</p></div>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto bg-brand-dark p-8 rounded-lg border border-slate-800">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white">Create Your Website Blueprint</h2>
                <p className="text-slate-400 mt-2">This questionnaire will help us understand your vision and goals for the website.</p>
            </div>

            {QUESTIONNAIRE_SECTIONS.map(section => (
                <fieldset key={section.id}>
                    <legend className="text-xl font-semibold text-white mb-4">{section.title}</legend>
                    <div className="space-y-6">
                        {section.id === 'business_brand_identity' && (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="fullName" className={labelClass}>Full Name</label>
                                    <input type="text" id="fullName" value={formData.fullName} readOnly className={inputClass} />
                                </div>
                                 <div className="space-y-2">
                                    <label htmlFor="email" className={labelClass}>Email Address</label>
                                    <input type="email" id="email" value={formData.email} readOnly className={inputClass} />
                                </div>
                                 <div className="space-y-2">
                                    <label htmlFor="phone" className={labelClass}>Phone Number</label>
                                    <PhoneNumberInput name="phone" id="phone" value={formData.phone} onChange={handlePhoneChange} placeholder="712345678" />
                                </div>
                            </div>
                        )}
                        {ALL_QUESTIONS.filter(q => q.section === section.id).map(renderQuestion)}
                    </div>
                </fieldset>
            ))}

            {error && <p className="text-red-500 text-center bg-red-900/20 p-3 rounded-md">{error}</p>}

            <button type="submit" disabled={isSubmitting} className="w-full bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 transition-colors duration-300 text-lg">
                {isSubmitting ? 'Submitting Blueprint...' : 'Submit Website Blueprint'}
            </button>
        </form>
    );
};

export default QuestionnaireForm;

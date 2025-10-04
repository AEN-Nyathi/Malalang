'use client';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { QUESTIONS, QUESTIONNAIRE_SECTIONS, Question, QuestionOption } from '../../../lib/constants/questionnaire';
import ImageColorPicker from '../../../components/ImageColorPicker';
import { ClientData } from '@/lib/types';
import FileUploadWidget from './FileUploadWidget';

interface Props {
    clientData: ClientData | null;
}

const QuestionnaireForm: React.FC<Props> = ({ clientData }) => {
    const initialFormData = useMemo(() => {
        const baseData: { [key: string]: any } = {
            fullName: clientData?.fullName || '',
            businessName: clientData?.businessName || '',
            email: clientData?.email || '',
            phone: clientData?.phone || '',
            ...QUESTIONS.reduce((acc, q) => ({ ...acc, [q.id]: q.default || '' }), {})
        };

        if (clientData?.bookings?.length) {
            baseData.servicePackage = clientData.bookings[0].servicePackage;
        }

        return baseData;
    }, [clientData]);

    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => { setFormData(initialFormData); }, [initialFormData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
        setIsSubmitting(true);
        setError(null);

        try {
            await addDoc(collection(db, 'questionnaires'), {
                ...formData,
                submittedAt: new Date(),
            });
            setIsSubmitted(true);
        } catch (err: any) {
            setError(`Failed to submit questionnaire. Please try again. Error: ${err.message}`);
            setIsSubmitting(false);
        }
    };

    const renderQuestion = useCallback((question: Question) => {
        const { id, label, type, description, options, required } = question;
        const value = formData[id] || '';

        const renderInput = () => {
            switch (type) {
                case 'textarea':
                    return <textarea id={id} name={id} value={value} onChange={handleChange} required={required} className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" rows={5}></textarea>;
                case 'select':
                    return (
                        <select id={id} name={id} value={value} onChange={handleChange} required={required} className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary">
                            {(options as QuestionOption[])?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    );
                case 'checkbox':
                    if (!options) return null;

                    if (!Array.isArray(options)) {
                        return (
                            <div className="space-y-5">
                                {Object.entries(options).map(([group, groupOptions]) => (
                                    <div key={group}>
                                        <h4 className="font-semibold text-slate-200 mb-3 text-base">{group}</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {(groupOptions as string[]).map(option => (
                                                <label key={option} className="flex items-center gap-2 p-3 bg-slate-800 border border-slate-700 rounded-md cursor-pointer hover:bg-slate-700">
                                                    <input
                                                        type="checkbox"
                                                        name={id}
                                                        value={option}
                                                        checked={value.includes(option)}
                                                        onChange={handleCheckboxChange}
                                                        className="form-checkbox bg-slate-900 border-slate-600 text-brand-primary focus:ring-brand-primary"
                                                    />
                                                    <span>{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    }

                    return (
                        <div className="grid grid-cols-2 gap-3">
                            {options.map(opt => {
                                const optionValue = typeof opt === 'string' ? opt : opt.value;
                                const optionLabel = typeof opt === 'string' ? opt : opt.label;
                                return (
                                    <label key={optionValue} className="flex items-center gap-2 p-3 bg-slate-800 border border-slate-700 rounded-md cursor-pointer hover:bg-slate-700">
                                        <input
                                            type="checkbox"
                                            name={id}
                                            value={optionValue}
                                            checked={value.includes(optionValue)}
                                            onChange={handleCheckboxChange}
                                            className="form-checkbox bg-slate-900 border-slate-600 text-brand-primary focus:ring-brand-primary"
                                        />
                                        <span>{optionLabel}</span>
                                    </label>
                                );
                            })}
                        </div>
                    );
                case 'color-picker':
                    return <ImageColorPicker onPaletteChange={handlePaletteChange} />;
                case 'file-upload':
                    return <FileUploadWidget 
                    id={id}
                    label={label}
                    description={description || ''}
                    onUploadComplete={handleFileUpload}
                      />;
                default:
                    return <input type={type} id={id} name={id} value={value} onChange={handleChange} required={required} className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" />;
            }
        };

        return (
            <div key={id} className="mb-8 p-6 bg-brand-dark rounded-lg border border-slate-800 shadow-lg">
                <label htmlFor={id} className="block text-xl font-semibold text-white mb-2">{label}</label>
                {description && <p className="text-slate-400 mb-4 text-sm">{description}</p>}
                {renderInput()}
            </div>
        );
    }, [formData, handleChange, handleCheckboxChange, handlePaletteChange, handleFileUpload, clientData]);

    if (isSubmitted) {
        return (
            <div className="text-center p-8 bg-brand-dark rounded-lg max-w-2xl mx-auto border border-green-500">
                <h2 className="text-2xl font-bold text-green-400 mb-4">Thank You!</h2>
                <p className="text-slate-300">Your questionnaire has been submitted successfully. We will be in touch shortly to discuss the next steps.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-10">
            {QUESTIONNAIRE_SECTIONS.map(section => (
                <div key={section.id}>
                    <h2 className="text-3xl font-bold text-white mb-2">{section.title}</h2>
                    <p className="text-slate-400 mb-8">{section.description}</p>
                    {QUESTIONS.filter(q => q.section === section.id).map(renderQuestion)}
                </div>
            ))}

            {error && <div className="p-4 bg-red-900/50 text-red-300 border border-red-700 rounded-md">{error}</div>}

            <div className="text-center">
                <button type="submit" disabled={isSubmitting} className="bg-brand-primary text-white font-bold py-4 px-12 rounded-lg text-xl hover:bg-brand-primary/80 transition-all disabled:bg-slate-600 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Submitting...' : 'Submit Questionnaire'}
                </button>
            </div>
        </form>
    );
};

export default QuestionnaireForm;

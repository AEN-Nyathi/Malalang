'use client';
import React, { useState } from 'react';
import { FAQ_ITEMS } from '@/lib/constants/faqs';
import type { FaqItem } from '@/lib/types';

const FaqItemComponent: React.FC<{ item: FaqItem; isOpen: boolean; onClick: () => void; id: string }> = ({ item, isOpen, onClick, id }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <div className="border-b border-slate-800">
            <button
                onClick={onClick}
                onKeyDown={handleKeyDown}
                className="flex justify-between items-center w-full py-5 text-left text-lg font-semibold text-white hover:text-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-secondary rounded px-2"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${id}`}
                id={`faq-question-${id}`}
            >
                <span>{item.question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'} flex-shrink-0 ml-4`} aria-hidden="true">
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </span>
            </button>
            <div
                id={`faq-answer-${id}`}
                role="region"
                aria-labelledby={`faq-question-${id}`}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                hidden={!isOpen}
            >
                <p className="pt-2 pb-5 text-slate-300 px-2">
                    {item.answer}
                </p>
            </div>
        </div>
    );
};


const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 bg-slate-900" aria-labelledby="faq-heading">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
                    <p className="mt-4 text-lg text-slate-300">
                        Have questions? We have answers.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    {FAQ_ITEMS.map((item, index) => (
                        <FaqItemComponent
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                            id={`${index}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;

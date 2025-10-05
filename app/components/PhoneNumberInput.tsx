'use client';

import React from 'react';

interface Props {
    value: string;
    onChange: (value: string) => void;
    name: string;
    id: string;
    placeholder?: string;
}

const inputClass = "block w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary";

const PhoneNumberInput: React.FC<Props> = ({ value, onChange, name, id, placeholder }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numericValue = e.target.value.replace(/[^0-9]/g, '');
        if (numericValue.startsWith('0')) {
            numericValue = numericValue.substring(1);
        }
        const finalValue = numericValue.substring(0, 9);
        onChange(finalValue);
    };

    return (
        <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-600 bg-slate-700 text-slate-300 text-sm">
                +27
            </span>
            <input
                type="tel"
                name={name}
                id={id}
                value={value}
                onChange={handleChange}
                className={`${inputClass} rounded-l-none`}
                placeholder={placeholder}
            />
        </div>
    );
};

export default PhoneNumberInput;

'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../lib/firebase'; // <- adjust path if needed
import { ClientData } from '@/lib/types';

/** ---------------------------
 * Types used across the component
 * --------------------------- */
export type QuestionOption = {
  value: string;
  label: string;
};

export type Question = {
  id: string;
  section: string;
  label: string;
  description?: string;
  type:
    | 'text'
    | 'email'
    | 'tel'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'file'
    | 'color-picker'
    | 'file-upload';
  options?: string[] | QuestionOption[] | { [key: string]: string[] };
  placeholder?: string;
  required?: boolean;
  subQuestions?: Question[];
  dependsOn?: string;
  showIf?: (value: any) => boolean;
  aiSupport?: 'suggestion' | 'enhancement';
  fileType?: string;
  default?: any;
};



interface Props {
  clientData: ClientData | null;
}

/** ---------------------------
 * QUESTION DEFINITION (you gave most already)
 * --------------------------- */
export const QUESTIONNAIRE_SECTIONS = [
  { id: 'Business & Brand Identity', title: 'Business & Brand Identity', description: 'Tell us about your business.' },
  { id: 'Project Goals & Scope', title: 'Project Goals & Scope', description: 'What do you want to achieve?' },
  { id: 'Design & Aesthetics', title: 'Design & Aesthetics', description: 'How should your website look and feel?' },
  { id: 'Content & Functionality', title: 'Content & Functionality', description: 'What should your website do?' },
  { id: 'Technical & Logistics', title: 'Technical & Logistics', description: "Let's get technical." },
];

// trimmed / cleaned QUESTIONS from your prompt (you can expand)
export const QUESTIONS: Question[] = [
  // Business & Brand Identity
  { id: 'contactPerson', section: 'Business & Brand Identity', label: 'Contact Person', type: 'text', required: true },
  { id: 'email', section: 'Business & Brand Identity', label: 'Email Address', type: 'email', required: true },
  { id: 'phone', section: 'Business & Brand Identity', label: 'Phone Number', type: 'tel' },
  { id: 'businessName', section: 'Business & Brand Identity', label: 'Business Name', type: 'text', required: true },
  { id: 'malalang_summary', section: 'Business & Brand Identity', label: 'Abram, may you briefly describe Malalang PTY LTD?', type: 'textarea', required: true, placeholder: 'Describe Malalang PTY LTD...' },
  { id: 'businessDescription', section: 'Business & Brand Identity', label: 'Briefly describe your business and the services/products you offer.', type: 'textarea', required: true, aiSupport: 'enhancement' },
  {
    id: 'competitorAnalysis',
    section: 'Business & Brand Identity',
    label: 'Competitor Analysis',
    type: 'textarea',
    subQuestions: [
      { id: 'competitor1_name', section: 'Business & Brand Identity', label: 'Competitor 1 Website', type: 'text', placeholder: 'www.competitor.com' },
      { id: 'competitor1_likes', section: 'Business & Brand Identity', label: 'What do you LIKE about their website?', type: 'textarea' },
      { id: 'competitor1_dislikes', section: 'Business & Brand Identity', label: 'What do you DISLIKE about their website?', type: 'textarea' },
    ],
  },

  // Project Goals
  { id: 'primaryGoal', section: 'Project Goals & Scope', label: 'What is the single most important goal for this website?', type: 'text' },
  { id: 'successMetrics', section: 'Project Goals & Scope', label: 'How will you measure the success of the new website?', type: 'textarea' },
  { id: 'requiredPages', section: 'Project Goals & Scope', label: "What are the key pages you think you'll need?", type: 'checkbox', options: ['Home', 'About Us', 'Our Team', 'Services', 'Pricing', 'Portfolio/Gallery', 'Testimonials', 'Blog', 'Contact', 'FAQ', 'Privacy Policy'] },
  {
    id: 'budget',
    section: 'Project Goals & Scope',
    label: 'What is your approximate budget for this project?',
    type: 'select',
    options: [
      { value: '', label: 'Please select a range' },
      { value: '<1500', label: '< R1,500' },
      { value: '1500-2000', label: 'R1,500 - R2,000' },
      { value: '2000-5000', label: 'R2,000 - R5,000' },
      { value: '5000-10000', label: 'R5,000 - R10,000' },
      { value: '>10000', label: '> R10,000' },
    ],
  },

  // Design
  { id: 'brandWords', section: 'Design & Aesthetics', label: "List 3-5 words that describe your brand's desired feel.", type: 'text' },
  {
    id: 'designStyle',
    section: 'Design & Aesthetics',
    label: 'Which design style best fits your brand?',
    type: 'select',
    options: [
      { value: '', label: 'Please select' },
      { value: 'minimalist', label: 'Minimalist & Clean' },
      { value: 'bold', label: 'Bold & Modern' },
      { value: 'playful', label: 'Playful & Creative' },
      { value: 'corporate', label: 'Corporate & Professional' },
      { value: 'elegant', label: 'Elegant & Sophisticated' },
      { value: 'other', label: 'Other' },
    ],
  },
  { id: 'designStyleOther', section: 'Design & Aesthetics', label: 'Please describe the style:', type: 'text', dependsOn: 'designStyle', showIf: (v: any) => v === 'other' },
  { id: 'hasLogo', section: 'Design & Aesthetics', label: 'Do you have an existing logo?', type: 'select', options: [ { value: '', label: 'Please select' }, { value: 'yes', label: 'Yes, I have a logo.' }, { value: 'no', label: 'No, I need one created.' } ] },
  { id: 'logoUpload', section: 'Design & Aesthetics', label: 'Upload Your Logo', type: 'file-upload', dependsOn: 'hasLogo', showIf: (v: any) => v === 'yes' },
  { id: 'brandColors', section: 'Design & Aesthetics', label: 'Brand Colors (HEX codes)', type: 'text', placeholder: '#1a2b3c, #d4e5f6, ...' },
  { id: 'likedWebsites', section: 'Design & Aesthetics', label: 'Please list 2-3 websites you like and explain what you like about them.', type: 'textarea' },

  // Content & Functionality
  {
    id: 'contentProvider',
    section: 'Content & Functionality',
    label: 'Who will be providing the written content (text) and images for the website?',
    type: 'select',
    options: [
      { value: '', label: 'Please select' },
      { value: 'client-all', label: 'I will provide all text and images.' },
      { value: 'client-some', label: 'I will provide some, but I need help.' },
      { value: 'developer-all', label: 'I need you to source/create all content.' },
    ],
  },
  { id: 'needsBlog', section: 'Content & Functionality', label: 'Do you require a blog or news section on your website?', type: 'select', options: [ { value: '', label: 'Please select' }, { value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'not-sure', label: 'Not sure yet' } ] },
  {
    id: 'features',
    section: 'Content & Functionality',
    label: 'Do you need any of the following special features?',
    type: 'checkbox',
    options: {
      'Content Display': ['Photo Gallery', 'Testimonials Section', 'Social Media Feed Integration', 'Embedded Maps'],
      'User Interaction': ['Advanced Forms', 'Newsletter Signup', 'Live Chat', 'Customer Login Area'],
      'Business Logic': ['E-commerce / Online Store', 'Booking / Appointment System'],
    },
  },

  // Technical & Logistics
  { id: 'domainStatus', section: 'Technical & Logistics', label: 'Do you already own a domain name (e.g., yourbusiness.co.za)?', type: 'select', options: [ { value: '', label: 'Please select' }, { value: 'yes', label: 'Yes' }, { value: 'no', label: 'No, I need help getting one' } ] },
  { id: 'maintenanceInterest', section: 'Technical & Logistics', label: 'Are you interested in an ongoing website maintenance plan?', type: 'select', options: [ { value: '', label: 'Please select' }, { value: 'yes', label: 'Yes, tell me more' }, { value: 'no', label: 'No, not at this time' }, { value: 'not-sure', label: "I'm not sure yet" } ] },
  { id: 'additionalInfo', section: 'Technical & Logistics', label: 'Is there anything else we should know about your project?', type: 'textarea' },
];

/** ---------------------------
 * SMALL SUB-COMPONENTS (inline for convenience)
 * --------------------------- */

/** Simple PhoneNumberInput */
const PhoneNumberInput: React.FC<{ id?: string; name?: string; value?: string; onChange: (v: string) => void; placeholder?: string }> = ({ id, name, value = '', onChange, placeholder }) => {
  return (
    <input
      id={id}
      name={name}
      type="tel"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || '712345678'}
      className="w-full p-2 rounded-md bg-slate-800 border border-slate-700 text-white"
    />
  );
};

/** Simple ImageColorPicker (minimal): allow uploading an image and extract 5 dominant colors via canvas */
const ImageColorPicker: React.FC<{ onPaletteChange: (colors: string[]) => void }> = ({ onPaletteChange }) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result as string;
      img.onload = () => {
        // draw into canvas, sample pixels (very naive color sampling)
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = Math.min(200, img.width);
        canvas.height = Math.min(200, img.height);
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const data = ctx?.getImageData(0, 0, canvas.width, canvas.height).data;
        if (!data) return;
        const colorCounts: Record<string, number> = {};
        for (let i = 0; i < data.length; i += 40) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          const hex = rgbToHex(r, g, b);
          colorCounts[hex] = (colorCounts[hex] || 0) + 1;
        }
        const sorted = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(s => s[0]);
        onPaletteChange(sorted);
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFile} className="text-sm text-slate-300" />
      <p className="text-xs text-slate-400 mt-1">Upload an image to generate a color palette (optional).</p>
    </div>
  );
};

function rgbToHex(r: number, g: number, b: number) {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

/** FileUploadWidget (simulated upload; returns object URL) */
const FileUploadWidget: React.FC<{
  id: string;
  label?: string;
  description?: string;
  accept?: string;
  onUploadComplete: (id: string, url: string) => void;
}> = ({ id, label, description, accept = 'image/*', onUploadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus('uploading');
    const objUrl = URL.createObjectURL(file);
    setPreview(objUrl);
    // simulate upload progress
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStatus('success');
          // return simulated URL (objectURL)
          onUploadComplete(id, objUrl);
          return 100;
        }
        return p + 20;
      });
    }, 150);
  };

  return (
    <div className="p-3 bg-slate-900/50 rounded-md border border-slate-700/50">
      {label && <div className="font-semibold text-slate-200">{label}</div>}
      {description && <div className="text-xs text-slate-400 mb-2">{description}</div>}
      {status !== 'success' && (
        <input type="file" accept={accept} onChange={handleFile} className="w-full text-sm text-slate-300" />
      )}
      {status === 'uploading' && (
        <div className="mt-2">
          <div className="w-full bg-slate-800 rounded h-2.5">
            <div className="h-2.5 rounded" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#60a5fa,#06b6d4)' }} />
          </div>
          <div className="text-xs text-slate-400 mt-1">Uploading... {progress}%</div>
        </div>
      )}
      {status === 'success' && preview && (
        <div className="mt-2 flex items-center gap-3">
          <img src={preview} alt="preview" className="w-12 h-12 object-contain rounded-md" />
          <div className="text-sm text-slate-200">Uploaded</div>
        </div>
      )}
    </div>
  );
};

/** Generic QuestionRenderer */
const QuestionRenderer: React.FC<{
  question: Question;
  value: any;
  onChange: (id: string, value: any) => void;
  onCheckboxChange: (id: string, value: string, checked: boolean) => void;
  onFileUpload: (id: string, url: string) => void;
  onPaletteChange: (colors: string[]) => void;
}> = ({ question, value, onChange, onCheckboxChange, onFileUpload, onPaletteChange }) => {
  const baseInputClass = 'w-full p-2 rounded-md bg-slate-800 border border-slate-700 text-white';

  const renderByType = () => {
    switch (question.type) {
      case 'textarea':
        return <textarea value={value || ''} onChange={(e) => onChange(question.id, e.target.value)} className={baseInputClass} rows={4} placeholder={question.placeholder} />;
      case 'select':
        return (
          <select value={value || ''} onChange={(e) => onChange(question.id, e.target.value)} className={baseInputClass}>
            {Array.isArray(question.options) ? (
              (question.options as QuestionOption[]).map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label ?? opt.value}</option>)
            ) : (
              (Object.values(question.options ?? {}) as any[]).flat().map((opt: any, idx: number) => <option key={idx + '-' + (opt.value ?? opt)} value={opt.value ?? opt}>{opt.label ?? opt}</option>)
            )}
          </select>
        );
      case 'checkbox': {
        // options may be grouped object
        if (Array.isArray(question.options)) {
          return (
            <div className="grid grid-cols-2 gap-2">
              {(question.options as string[]).map((opt) => (
                <label key={opt} className="flex items-center gap-2 p-2 bg-slate-800 rounded-md border border-slate-700">
                  <input type="checkbox" checked={Array.isArray(value) && value.includes(opt)} onChange={(e) => onCheckboxChange(question.id, opt, e.target.checked)} />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>
          );
        } else {
          // grouped options object
          const groups = question.options as { [k: string]: string[] };
          return (
            <div className="space-y-3">
              {Object.entries(groups).map(([groupTitle, opts]) => (
                <div key={groupTitle}>
                  <div className="text-xs text-slate-400 font-semibold mb-1">{groupTitle}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {opts.map((opt) => (
                      <label key={opt} className="flex items-center gap-2 p-2 bg-slate-800 rounded-md border border-slate-700">
                        <input type="checkbox" checked={Array.isArray(value) && value.includes(opt)} onChange={(e) => onCheckboxChange(question.id, opt, e.target.checked)} />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        }
      }
      case 'color-picker':
        return <ImageColorPicker onPaletteChange={(colors) => onPaletteChange(colors)} />;
      case 'file':
      case 'file-upload':
        return <FileUploadWidget id={question.id} label={question.label} description={question.description} onUploadComplete={onFileUpload} />;
      case 'tel':
        return <PhoneNumberInput id={question.id} name={question.id} value={value || ''} onChange={(v) => onChange(question.id, v)} />;
      default:
        // 'text' 'email' etc.
        return <input value={value || ''} onChange={(e) => onChange(question.id, e.target.value)} placeholder={question.placeholder} className={baseInputClass} type={question.type as any} />;
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-200">{question.label}</label>
      {question.description && <div className="text-xs text-slate-400 mb-1">{question.description}</div>}
      {renderByType()}
      {question.subQuestions && question.subQuestions.map((sq) => (
        <div key={sq.id} className="mt-3 pl-2 border-l border-slate-700">
          <label className="text-xs text-slate-300">{sq.label}</label>
          {sq.type === 'textarea' ? (
            <textarea value={(value && value[sq.id]) || ''} onChange={(e) => onChange(sq.id, e.target.value)} className={baseInputClass} />
          ) : (
            <input value={(value && value[sq.id]) || ''} onChange={(e) => onChange(sq.id, e.target.value)} className={baseInputClass} />
          )}
        </div>
      ))}
    </div>
  );
};

/** Pagination controls (Next / Prev / Submit) */
const PaginationControls: React.FC<{
  canGoNext: boolean;
  canGoPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
  isLast: boolean;
  isSubmitting: boolean;
}> = ({ canGoNext, canGoPrev, onNext, onPrev, isLast, isSubmitting }) => (
  <div className="flex justify-between items-center gap-4 mt-6">
    <div>
      {canGoPrev && <button type="button" onClick={onPrev} className="px-4 py-2 rounded bg-slate-700 text-white">Previous</button>}
    </div>
    <div>
      {!isLast ? (
        <button type="button" onClick={onNext} disabled={!canGoNext} className={`px-4 py-2 rounded ${canGoNext ? 'bg-brand-primary text-white' : 'bg-slate-700 text-slate-400'}`}>Next</button>
      ) : (
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded bg-green-600 text-white">{isSubmitting ? 'Submitting...' : 'Submit'}</button>
      )}
    </div>
  </div>
);

/** ---------------------------
 * MAIN QuestionnaireWizard component
 * --------------------------- */
const QuestionnaireWizard: React.FC<Props> = ({ clientData }) => {
  // Build initial formData from QUESTIONS and clientData
  const initialFormData = useMemo(() => {
    const base: Record<string, any> = {};
    QUESTIONS.forEach((q) => {
      if (q.type === 'checkbox') base[q.id] = []; // arrays for checkbox groups
      else base[q.id] = q.default ?? '';
      // init subQuestions also
      if (q.subQuestions) {
        q.subQuestions.forEach((sq) => {
          base[sq.id] = sq.default ?? '';
        });
      }
    });

    // Prefill with clientData where keys match
    if (clientData) {
      base.contactPerson = clientData.fullName ?? base.contactPerson;
      base.email = clientData.email ?? base.email;
      base.phone = clientData.phone ?? base.phone;
      base.businessName = clientData.businessName ?? base.businessName;
      // prefill servicePackage if you have bookings
      base.servicePackage = clientData.bookings?.[0]?.servicePackage ?? base.servicePackage;
    }

    return base;
  }, [clientData]);

  const [formData, setFormData] = useState<Record<string, any>>(initialFormData);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const visibleQuestions = useMemo(() => {
    // determine visible list after applying dependsOn and showIf filters
    return QUESTIONS.filter((q) => {
      if (q.dependsOn) {
        const dependsVal = formData[q.dependsOn];
        if (q.showIf) return q.showIf(dependsVal);
        // if dependsOn exists but no showIf, fallback to truthy check
        return !!dependsVal;
      }
      return true;
    });
  }, [formData]);

  // Ensure currentIndex is always within visibleQuestions bounds
  useEffect(() => {
    if (currentIndex >= visibleQuestions.length) {
      setCurrentIndex(Math.max(0, visibleQuestions.length - 1));
    }
  }, [visibleQuestions, currentIndex]);

  // helpers for updating form data
  const setField = useCallback((id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleCheckboxChange = useCallback((id: string, option: string, checked: boolean) => {
    setFormData((prev) => {
      const current = Array.isArray(prev[id]) ? [...prev[id]] : [];
      if (checked) {
        if (!current.includes(option)) current.push(option);
      } else {
        const idx = current.indexOf(option);
        if (idx >= 0) current.splice(idx, 1);
      }
      return { ...prev, [id]: current };
    });
  }, []);

  const handleFileUpload = useCallback((id: string, url: string) => {
    setFormData((prev) => ({ ...prev, [id]: url }));
  }, []);

  const handlePaletteChange = useCallback((colors: string[]) => {
    setFormData((prev) => ({ ...prev, brandColors: colors.join(', ') }));
  }, []);

  // determine if the "current" visible question is answered enough to move on
  const canAdvanceFromIndex = (idx: number) => {
    const q = visibleQuestions[idx];
    if (!q) return false;
    const val = formData[q.id];
    if (q.required) {
      if (q.type === 'checkbox') return Array.isArray(val) && val.length > 0;
      return val !== '' && val !== null && val !== undefined;
    }
    // for non-required, allow advance if something present OR allow empty advance
    return true;
  };

  const goNext = () => {
    // find next index that should be visible (we already use visibleQuestions list)
    const next = Math.min(visibleQuestions.length - 1, currentIndex + 1);
    setCurrentIndex(next);
  };

  const goPrev = () => {
    setCurrentIndex((c) => Math.max(0, c - 1));
  };

  // Submit handler
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const payload = {
        ...formData,
        submittedAt: new Date(),
        client: clientData ?? null,
      };
      await addDoc(collection(db, 'website_blueprints'), payload);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err?.message ?? 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // UI when submitted
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-brand-dark rounded-lg border border-green-600">
        <h2 className="text-2xl font-bold text-green-400 mb-2">Thank you — blueprint submitted</h2>
        <p className="text-slate-300">We received your answers. We will review them and get back to you shortly.</p>
      </div>
    );
  }

  // nothing to show guard
  if (visibleQuestions.length === 0) {
    return <div className="text-center p-8">No questions available.</div>;
  }

  const currentQuestion = visibleQuestions[currentIndex];

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-brand-dark p-6 rounded-lg border border-slate-800 space-y-6">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-white">Website Questionnaire</h1>
        <p className="text-slate-400 mt-1">Answer question-by-question. When required answers are filled, click Next.</p>
      </div>

      {/* Prefill / read-only user info row */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-slate-300 font-semibold">Full name</label>
          <input value={formData.contactPerson || ''} onChange={(e) => setField('contactPerson', e.target.value)} className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white" />
        </div>
        <div>
          <label className="text-xs text-slate-300 font-semibold">Email</label>
          <input value={formData.email || ''} onChange={(e) => setField('email', e.target.value)} className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white" />
        </div>
        <div>
          <label className="text-xs text-slate-300 font-semibold">Phone</label>
          <PhoneNumberInput value={formData.phone || ''} onChange={(v) => setField('phone', v)} />
        </div>
      </div>

      {/* show section header */}
      <div>
        <div className="text-sm text-slate-400 mb-1 font-semibold">{currentQuestion.section}</div>
        <div className="text-lg text-white font-bold">{currentQuestion.label}</div>
        {currentQuestion.description && <div className="text-xs text-slate-400 mt-1">{currentQuestion.description}</div>}
      </div>

      {/* question renderer */}
      <div>
        <QuestionRenderer
          question={currentQuestion}
          value={formData[currentQuestion.id]}
          onChange={(id, value) => setField(id, value)}
          onCheckboxChange={(id, option, checked) => handleCheckboxChange(id, option, checked)}
          onFileUpload={(id, url) => handleFileUpload(id, url)}
          onPaletteChange={(colors) => handlePaletteChange(colors)}
        />
      </div>

      {/* Small inline hint for sub questions */}
      {currentQuestion.subQuestions && currentQuestion.subQuestions.length > 0 && (
        <div className="text-xs text-slate-400">This question has follow-ups — answer the main one first, then sub-questions will appear below.</div>
      )}

      {error && <div className="text-red-400 p-2 rounded bg-red-900/20">{error}</div>}

      {/* Pagination / Next / Prev / Submit */}
      <PaginationControls
        canGoNext={canAdvanceFromIndex(currentIndex)}
        canGoPrev={currentIndex > 0}
        onNext={() => {
          // if current question is required and not filled, do nothing (guard)
          if (!canAdvanceFromIndex(currentIndex)) return;
          // special logic: if next question is conditional and not shown, skip until next visible
          let nextIndex = currentIndex + 1;
          while (nextIndex < visibleQuestions.length) {
            const q = visibleQuestions[nextIndex];
            if (!q) break;
            // if q dependsOn and showIf returns false, skip it (we already filtered visibleQuestions globally - but keep safe)
            if (q.dependsOn && q.showIf && !q.showIf(formData[q.dependsOn])) {
              nextIndex++;
              continue;
            }
            break;
          }
          setCurrentIndex(Math.min(visibleQuestions.length - 1, nextIndex));
        }}
        onPrev={goPrev}
        isLast={currentIndex === visibleQuestions.length - 1}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default QuestionnaireWizard;

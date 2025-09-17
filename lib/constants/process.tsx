import React from 'react';
import type { ProcessStep } from '/lib/types.ts';

const ProcessStepIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center justify-center w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-full ring-8 ring-brand-dark">
        {children}
    </div>
);

export const PROCESS_STEPS: ProcessStep[] = [
    { step: 1, title: 'Intake & Agreement', description: 'We start with a face-to-face meeting to understand your needs. A simple WhatsApp confirmation is all we need to begin—no deposit required.', icon: <ProcessStepIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002 2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></ProcessStepIcon> },
    { step: 2, title: 'Development', description: 'We build your website on a private staging link (e.g., yourname.vercel.app), so you can watch the progress live.', icon: <ProcessStepIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg></ProcessStepIcon> },
    { step: 3, title: 'Review & Feedback', description: 'You review the site and provide feedback. We include up to two rounds of revisions to get everything just right.', icon: <ProcessStepIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg></ProcessStepIcon> },
    { step: 4, title: 'Launch & Handover', description: 'After a final face-to-face sign-off, we handle all the technical details to launch your site. Payment is only due now.', icon: <ProcessStepIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></ProcessStepIcon> },
    { step: 5, title: 'Upsell & Support', description: 'We present our "Complete Launch Pack" to boost your online presence from day one and offer ongoing support.', icon: <ProcessStepIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg></ProcessStepIcon> }
];
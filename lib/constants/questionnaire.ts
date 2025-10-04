'use client';

export type QuestionOption = {
  value: string;
  label: string;
};

export type Question = {
  id: string; // Corresponds to the key in formData
  section: string; // To group questions
  label: string;
  description?: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'color-picker' | 'file-upload';
  options?: string[] | QuestionOption[] | { [key: string]: string[] };
  placeholder?: string;
  required?: boolean;
  subQuestions?: Question[]; // For nested questions like competitor analysis
  dependsOn?: string; // The ID of the question this one depends on
  showIf?: (value: any) => boolean; // A function to determine if the question should be shown
  aiSupport?: 'suggestion' | 'enhancement'; // AI feature for this question
  fileType?: string;
  default?: any;
};

export const QUESTIONNAIRE_SECTIONS = [
    {
        id: "Business & Brand Identity",
        title: "Business & Brand Identity",
        description: "Tell us about your business."
    },
    {
        id: "Project Goals & Scope",
        title: "Project Goals & Scope",
        description: "What do you want to achieve?"
    },
    {
        id: "Design & Aesthetics",
        title: "Design & Aesthetics",
        description: "How should your website look and feel?"
    },
    {
        id: "Content & Functionality",
        title: "Content & Functionality",
        description: "What should your website do?"
    },
    {
        id: "Technical & Logistics",
        title: "Technical & Logistics",
        description: "Let's get technical."
    }
];


export const QUESTIONS: Question[] = [
    // Section 1: Business & Brand Identity
    {
        id: 'contactPerson',
        section: "Business & Brand Identity",
        label: 'Contact Person',
        type: 'text',
        required: true,
    },
    {
        id: 'email',
        section: "Business & Brand Identity",
        label: 'Email Address',
        type: 'email',
        required: true,
    },
    {
        id: 'phone',
        section: "Business & Brand Identity",
        label: 'Phone Number',
        type: 'tel',
    },
    {
        id: 'businessName',
        section: "Business & Brand Identity",
        label: 'Business Name',
        type: 'text',
        required: true,
    },
    {
        id: 'currentWebsite',
        section: "Business & Brand Identity",
        label: 'Current Website & Social Media Links (if any)',
        type: 'text',
        placeholder: "e.g., yoursite.com, facebook.com/yourbusiness",
    },
    {
        id: 'businessDescription',
        section: "Business & Brand Identity",
        label: 'Briefly describe your business and the services/products you offer.',
        type: 'textarea',
        required: true,
        aiSupport: 'enhancement',
    },
    {
        id: 'uniqueSellingProposition',
        section: "Business & Brand Identity",
        label: 'What makes your business unique compared to your competitors?',
        description: 'What is your unique selling proposition (USP)?',
        type: 'textarea',
        aiSupport: 'suggestion',
    },
    {
        id: 'competitorAnalysis',
        section: "Business & Brand Identity",
        label: 'Competitor Analysis',
        type: 'textarea',
        subQuestions: [
            {
                id: 'competitor1_name',
                section: "Business & Brand Identity",
                label: 'Competitor 1 Website',
                type: 'text',
                placeholder: 'www.competitor.com'
            },
            {
                id: 'competitor1_likes',
                section: "Business & Brand Identity",
                label: 'What do you LIKE about their website?',
                type: 'textarea',
            },
            {
                id: 'competitor1_dislikes',
                section: "Business & Brand Identity",
                label: 'What do you DISLIKE about their website?',
                type: 'textarea',
            },
        ]
    },
    {
        id: 'targetAudience',
        section: "Business & Brand Identity",
        label: 'Target Audience',
        type: 'textarea',
        subQuestions: [
            {
                id: 'targetAudience_demographics',
                section: "Business & Brand Identity",
                label: 'Describe your ideal customer (age, gender, location, occupation, etc.)',
                type: 'textarea',
            },
            {
                id: 'targetAudience_painPoints',
                section: "Business & Brand Identity",
                label: 'What problems does your business solve for them?',
                type: 'textarea',
                placeholder: "e.g., 'They need a reliable plumber who shows up on time.'"
            },
            {
                id: 'targetAudience_goals',
                section: "Business & Brand Identity",
                label: 'What do you want them to DO on your website?',
                type: 'textarea',
                placeholder: "e.g., 'Fill out the contact form', 'Book an appointment', 'Buy a product'."
            },
        ]
    },

    // Section 2: Project Goals & Scope
    {
        id: 'primaryGoal',
        section: "Project Goals & Scope",
        label: 'What is the single most important goal for this website?',
        description: 'e.g., "Generate 10 new leads per month," "Sell products online," "Establish professional credibility."',
        type: 'text',
    },
    {
        id: 'successMetrics',
        section: "Project Goals & Scope",
        label: 'How will you measure the success of the new website?',
        description: 'What specific numbers will tell you the site is working?',
        type: 'textarea',
        placeholder: "e.g., More contact form submissions, higher online sales, fewer support calls, etc.",
    },
    {
        id: 'requiredPages',
        section: "Project Goals & Scope",
        label: "What are the key pages you think you'll need?",
        type: 'checkbox',
        options: ['Home', 'About Us', 'Our Team', 'Services', 'Pricing', 'Portfolio/Gallery', 'Testimonials', 'Blog', 'Contact', 'FAQ', 'Privacy Policy'],
    },
    {
        id: 'budget',
        section: "Project Goals & Scope",
        label: 'What is your approximate budget for this project?',
        type: 'select',
        options: [
            { value: '', label: 'Please select a range' },
            { value: '<1500', label: '< R1,500' },
            { value: '1500-2000', label: 'R1,500 - R2,000' },
            { value: '2000-5000', label: 'R2,000 - R5,000' },
            { value: '5000-10000', label: 'R5,000 - R10,000' },
            { value: '>10000', label: '> R10,000' },
        ]
    },
    {
        id: 'timeline',
        section: "Project Goals & Scope",
        label: 'What is your desired timeline for launching the website?',
        type: 'select',
        options: [
            { value: '', label: 'Please select' },
            { value: '1-2 Weeks', label: '1-2 Weeks' },
            { value: '2-4 Weeks', label: '2-4 Weeks' },
            { value: '1-2 Months', label: '1-2 Months' },
            { value: 'Flexible', label: 'Flexible' },
        ]
    },

    // Section 3: Design & Aesthetics
    {
        id: 'brandWords',
        section: "Design & Aesthetics",
        label: "List 3-5 words that describe your brand's desired feel.",
        description: 'e.g., "Modern, clean, trustworthy"',
        type: 'text',
    },
    {
        id: 'designStyle',
        section: "Design & Aesthetics",
        label: 'Which design style best fits your brand?',
        description: 'Select the closest option.',
        type: 'select',
        options: [
            { value: '', label: 'Please select' },
            { value: 'minimalist', label: 'Minimalist & Clean' },
            { value: 'bold', label: 'Bold & Modern' },
            { value: 'playful', label: 'Playful & Creative' },
            { value: 'corporate', label: 'Corporate & Professional' },
            { value: 'elegant', label: 'Elegant & Sophisticated' },
            { value: 'other', label: 'Other' },
        ]
    },
    {
        id: 'designStyleOther',
        section: "Design & Aesthetics",
        label: 'Please describe the style:',
        type: 'text',
        placeholder: "e.g., 'Rustic, organic, natural'",
        dependsOn: 'designStyle',
        showIf: (value) => value === 'other',
    },
    {
        id: 'hasLogo',
        section: "Design & Aesthetics",
        label: 'Do you have an existing logo?',
        type: 'select',
        options: [
            { value: '', label: 'Please select' },
            { value: 'yes', label: 'Yes, I have a logo.' },
            { value: 'no', label: 'No, I need one created.' },
        ]
    },
    {
        id: 'logoUpload',
        section: "Design & Aesthetics",
        label: 'Upload Your Logo',
        description: 'Please upload your logo in a high-quality format (e.g., SVG, PNG, AI).',
        type: 'file',
        dependsOn: 'hasLogo',
        showIf: (value) => value === 'yes',
    },
    {
        id: 'hasBranding',
        section: "Design & Aesthetics",
        label: 'Do you have other brand design materials?',
        description: 'e.g., flyers, social media posts, brand guides.',
        type: 'select',
        options: [
            { value: '', label: 'Please select' },
            { value: 'yes', label: 'Yes, I will provide them.' },
            { value: 'no', label: "No, I don't have any." },
        ]
    },
    {
        id: 'brandMaterialsUpload',
        section: "Design & Aesthetics",
        label: 'Upload Brand Materials',
        description: 'You can upload a single .zip file with your assets.',
        type: 'file',
        dependsOn: 'hasBranding',
        showIf: (value) => value === 'yes',
    },
    {
        id: 'brandColors',
        section: "Design & Aesthetics",
        label: 'Brand Colors (HEX codes)',
        description: "Enter your brand's HEX codes below (e.g., #0891b2, #10b981). If you're unsure, upload a logo or inspirational image to generate a palette.",
        type: 'text',
        placeholder: '#1a2b3c, #d4e5f6, ...',
    },
    {
        id: 'likedWebsites',
        section: "Design & Aesthetics",
        label: 'Please list 2-3 websites you like and explain what you like about them.',
        type: 'textarea',
    },
    {
        id: 'dislikedWebsites',
        section: "Design & Aesthetics",
        label: 'Please list 1-2 websites you DISLIKE and explain why.',
        description: 'This helps us understand what to avoid.',
        type: 'textarea',
    },

    // Section 4: Content & Functionality
    {
        id: 'contentProvider',
        section: "Content & Functionality",
        label: 'Who will be providing the written content (text) and images for the website?',
        type: 'select',
        options: [
            { value: '', label: 'Please select' },
            { value: 'client-all', label: 'I will provide all text and images.' },
            { value: 'client-some', label: 'I will provide some, but I need help.' },
            { value: 'developer-all', label: 'I need you to source/create all content.' },
        ]
    },
    {
        id: 'needsBlog',
        section: "Content & Functionality",
        label: 'Do you require a blog or news section on your website?',
        type: 'select',
        options: [
            { value: '', label: 'Please select' },
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'not-sure', label: 'Not sure yet' },
        ]
    },
    {
        id: 'features',
        section: "Content & Functionality",
        label: 'Do you need any of the following special features?',
        type: 'checkbox',
        options: {
            'Content Display': ['Photo Gallery', 'Testimonials Section', 'Social Media Feed Integration', 'Embedded Maps'],
            'User Interaction': ['Advanced Forms', 'Newsletter Signup', 'Live Chat', 'Customer Login Area'],
            'Business Logic': ['E-commerce / Online Store', 'Booking / Appointment System'],
        },
    },

    // Section 5: Technical & Logistics
    {
        id: 'domainStatus',
        section: "Technical & Logistics",
        label: 'Do you already own a domain name (e.g., yourbusiness.co.za)?',
        type: 'select',
        options: [
            { value: '', label: 'Please select' },
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No, I need help getting one' },
        ]
    },
    {
        id: 'maintenanceInterest',
        section: "Technical & Logistics",
        label: 'Are you interested in an ongoing website maintenance plan?',
        type: 'select',
        options: [
            { value: '', label: 'Please select' },
            { value: 'yes', label: 'Yes, tell me more' },
            { value: 'no', label: 'No, not at this time' },
            { value: 'not-sure', label: "I'm not sure yet" },
        ]
    },
    {
        id: 'additionalInfo',
        section: "Technical & Logistics",
        label: 'Is there anything else we should know about your project?',
        type: 'textarea',
    },
];

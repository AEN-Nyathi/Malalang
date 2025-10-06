import { Step } from './types';

export const steps: Step[] = [
  {
    id: 'business-identity',
    title: 'Business & Brand Identity',
    description: 'Tell us about your business.',
    questions: [
      { id: 'contactPerson', text: 'Contact Person', type: 'text', required: true },
      { id: 'email', text: 'Email Address', type: 'email', required: true },
      { id: 'phone', text: 'Phone Number', type: 'tel' },
      { id: 'businessName', text: 'Business Name', type: 'text', required: true },
      { id: 'businessDescription', text: 'Briefly describe your business and the services/products you offer.', type: 'textarea', required: true, aiSupport: 'enhancement' },
      {
        id: 'competitorAnalysis',
        text: 'Competitor Analysis',
        type: 'textarea',
        subQuestions: [
          { id: 'competitor1_name', text: 'Competitor 1 Website', type: 'text', placeholder: 'www.competitor.com' },
          { id: 'competitor1_likes', text: 'What do you LIKE about their website?', type: 'textarea' },
          { id: 'competitor1_dislikes', text: 'What do you DISLIKE about their website?', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'project-goals',
    title: 'Project Goals & Scope',
    description: 'What do you want to achieve?',
    questions: [
      { id: 'primaryGoal', text: 'What is the single most important goal for this website?', type: 'text' },
      { id: 'successMetrics', text: 'How will you measure the success of the new website?', type: 'textarea' },
      { id: 'requiredPages', text: "What are the key pages you think you'll need?", type: 'checkbox', options: ['Home', 'About Us', 'Our Team', 'Services', 'Pricing', 'Portfolio/Gallery', 'Testimonials', 'Blog', 'Contact', 'FAQ', 'Privacy Policy'] },
      {
        id: 'budget',
        text: 'What is your approximate budget for this project?',
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
    ],
  },
  {
    id: 'design-aesthetics',
    title: 'Design & Aesthetics',
    description: 'How should your website look and feel?',
    questions: [
      { id: 'brandWords', text: "List 3-5 words that describe your brand's desired feel.", type: 'text' },
      {
        id: 'designStyle',
        text: 'Which design style best fits your brand?',
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
      { id: 'designStyleOther', text: 'Please describe the style:', type: 'text', dependsOn: 'designStyle', showIf: (v: any) => v === 'other' },
      { id: 'hasLogo', text: 'Do you have an existing logo?', type: 'select', options: [ { value: '', label: 'Please select' }, { value: 'yes', label: 'Yes, I have a logo.' }, { value: 'no', label: 'No, I need one created.' } ] },
      { id: 'logoUpload', text: 'Upload Your Logo', type: 'file-upload', dependsOn: 'hasLogo', showIf: (v: any) => v === 'yes' },
      { id: 'brandColors', text: 'Brand Colors (HEX codes)', type: 'text', placeholder: '#1a2b3c, #d4e5f6, ...' },
      { id: 'likedWebsites', text: 'Please list 2-3 websites you like and explain what you like about them.', type: 'textarea' },
    ],
  },
  {
    id: 'content-functionality',
    title: 'Content & Functionality',
    description: 'What should your website do?',
    questions: [
      {
        id: 'contentProvider',
        text: 'Who will be providing the written content (text) and images for the website?',
        type: 'select',
        options: [
          { value: '', label: 'Please select' },
          { value: 'client-all', label: 'I will provide all text and images.' },
          { value: 'client-some', label: 'I will provide some, but I need help.' },
          { value: 'developer-all', label: 'I need you to source/create all content.' },
        ],
      },
      { id: 'needsBlog', text: 'Do you require a blog or news section on your website?', type: 'select', options: [ { value: '', label: 'Please select' }, { value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'not-sure', label: 'Not sure yet' } ] },
      {
        id: 'features',
        text: 'Do you need any of the following special features?',
        type: 'checkbox',
        options: {
          'Content Display': ['Photo Gallery', 'Testimonials Section', 'Social Media Feed Integration', 'Embedded Maps'],
          'User Interaction': ['Advanced Forms', 'Newsletter Signup', 'Live Chat', 'Customer Login Area'],
          'Business Logic': ['E-commerce / Online Store', 'Booking / Appointment System'],
        },
      },
    ],
  },
  {
    id: 'technical-logistics',
    title: 'Technical & Logistics',
    description: "Let's get technical.",
    questions: [
      { id: 'domainStatus', text: 'Do you already own a domain name (e.g., yourbusiness.co.za)?', type: 'select', options: [ { value: '', label: 'Please select' }, { value: 'yes', label: 'Yes' }, { value: 'no', label: 'No, I need help getting one' } ] },
      { id: 'maintenanceInterest', text: 'Are you interested in an ongoing website maintenance plan?', type: 'select', options: [ { value: '', label: 'Please select' }, { value: 'yes', label: 'Yes, tell me more' }, { value: 'no', label: 'No, not at this time' }, { value: 'not-sure', label: "I'm not sure yet" } ] },
      { id: 'additionalInfo', text: 'Is there anything else we should know about your project?', type: 'textarea' },
    ],
  },
  {
    id: 'review',
    title: 'Review & Submit',
    description: 'Review your answers before submitting.',
    questions: [],
  },
];

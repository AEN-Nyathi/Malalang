import { Step } from './types';

export const steps: Step[] = [
  {
    id: 'business',
    title: 'Business & Brand Identity',
    questions: [
      { id: 'businessName', text: 'What is the name of your business?' },
      { id: 'businessDescription', text: 'May you briefly describe {businessName}?' },
    ],
  },
  {
    id: 'goals',
    title: 'Project Goals & Scope',
    questions: [{ id: 'projectGoals', text: 'What do you want to achieve with this new website?' }],
  },
  {
    id: 'design',
    title: 'Design & Aesthetics',
    questions: [
      { id: 'brandColors', text: 'What are your brand colors?' },
      { id: 'designInspiration', text: 'Are there any websites you admire?' },
    ],
  },
  {
    id: 'content',
    title: 'Content & Functionality',
    questions: [
      { id: 'pages', text: 'What pages do you need (e.g., Home, About, Services, Contact)?' },
      { id: 'features', text: 'What features are essential (e.g., blog, gallery, contact form)?' },
    ],
  },
  {
    id: 'technical',
    title: 'Technical & Logistics',
    questions: [
      { id: 'domainName', text: 'Do you have a domain name?' },
      { id: 'hosting', text: 'Do you have a hosting provider?' },
    ],
  },
  {
    id: 'package',
    title: 'Package Selection',
    questions: [
      {
        id: 'package',
        text: 'Please select a package that best suits your needs',
        type: 'radio',
        options: ['Basic', 'Standard', 'Premium'],
      },
    ],
  },
  { id: 'review', title: 'Review & Submit' },
];

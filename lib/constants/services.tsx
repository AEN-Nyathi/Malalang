import React from 'react';
import type { ServicePackage, AddonService, AddonCategory, RecurringService } from '@/lib/types.ts';

// Main website packages with fixed pricing and clear scope.
export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    title: 'Landing Page',
    slug: 'landing-page',
    price: 'R1,000',
    description: 'A focused single-page website to convert visitors for a specific campaign or goal.',
    longDescription: "Perfect for marketing campaigns, product launches, or events, a landing page is a highly focused, single-page website designed for one purpose: to convert visitors into leads or customers. We craft a compelling narrative with a clear call-to-action to maximize your campaign's effectiveness.",
    idealFor: "Marketing campaigns, event promotion, new product launches, or any business needing a focused, high-conversion web page without the complexity of a full multi-page site.",
    bestFor: "Marketing campaigns and product launches.",
    features: [
      'Single-Page Focused Design (up to 5 sections)',
      'Clear Call-to-Action',
      'Mobile Responsive',
      'Contact/Lead Form Integration',
      'Basic Security Setup (SSL/HTTPS)', // Added
      'Database Integration (Firebase only)',
      'Hosting Configuration (Vercel, Firebase, or your own choice)', // Fixed typo
    ],
  },
  {
    title: 'Base Package',
    slug: 'economic-package',
    price: 'R1,500',
    description: 'A professional 5-page website, perfect for building a strong and comprehensive online presence.',
    longDescription: "Our Base Package is the perfect choice for businesses needing a complete and professional online footprint. With up to 5 pages, you have the space to detail your services, introduce your team, and provide essential information to your customers. This package focuses on creating a clean, functional, and mobile-friendly website that establishes your credibility and serves as a digital hub for your business.",
    idealFor: "Small businesses, service providers, and startups who need more than a basic brochure site and want to present a comprehensive view of their offerings.",
    bestFor: "Small businesses needing a comprehensive site.",
    features: [
      'Up to 5 Pages',
      'Professionally Styled Design',
      'Clear Call-to-Action',
      'Mobile Responsive',
      'Basic Security Setup (SSL/HTTPS)', // Added
      'Forms Integration (up to 5 forms)',
      'Database Integration (Firebase only)',
      'Hosting Configuration (Vercel or Firebase)',
      'Basic Search Engine Setup (SEO) On-page',
      'Simple Admin Panel (View and Sort Form Submissions)', // Clarified text
    ],
    isFeatured: true,
  },
  {
    title: 'Standard Package',
    slug: 'standard-package',
    price: 'R2,500',
    description: 'Our most popular option for a complete, custom-designed online presence with advanced features.',
    longDescription: "This is our flagship offering and the ideal choice for most small to medium-sized businesses looking to make a serious impact. The Standard Package moves beyond templates to provide a fully custom-designed website that reflects your unique brand identity and business goals. With up to 8 pages, we can build a comprehensive site that details your services, showcases your work, and is optimized from the ground up to attract and convert visitors.",
    idealFor: "Established businesses, service providers, and companies looking for a unique digital storefront that sets them apart from the competition and provides a solid foundation for future growth.",
    bestFor: "Established businesses wanting a custom brand presence.",
    features: [
      'Up to 8 Main Pages plus 10 Extra Pages (for services or blog posts)',
      'Unique Design Tailored to Your Brand',
      'Clear Call-to-Action',
      'Mobile Responsive',
      'Basic Security Setup (SSL/HTTPS)', // Added
      'Advanced Forms (unlimited forms)',
      'Database Integration (Firebase or Supabase)',
      'Optimized Hosting Configuration (Vercel only)', // Clarified text
      'Basic Site Performance Optimization', // Added
      'Advanced On-Page Search Engine Setup (SEO)',
      'Advanced Admin Panel (Separate website to manage content and forms)', // Clarified text
      '1 Hour of Content Upload Training',
      'Google Analytics & Search Console Integration',
    ],
  },
  {
    title: 'E-commerce Package',
    slug: 'e-commerce-package',
    price: 'From R5,000',
    description: 'A fully functional online store to sell your products. Price scales with complexity.',
    longDescription: "Ready to sell your products online? The E-commerce Package is your all-in-one solution for launching a powerful and secure online store. We handle everything from the initial setup and design to product management systems and secure payment gateway integration (like Paystack or Yoco). The design is fully customized to create an enjoyable shopping experience for your customers, encouraging sales and repeat business.",
    idealFor: "Retail businesses, artisans, and anyone wanting to sell physical or digital products directly to customers online. The platform is scalable to grow with your product line and sales volume.",
    bestFor: "Businesses ready to sell products online.",
    features: [
      'Full Online Store Setup',
      'Product Management System',
      'Full Order & Inventory Management System', // Added
      'Secure Payment Gateway Integration',
      'Custom Design Tailored for Sales',
      'Mobile-Optimized Checkout',
      'Basic Security Setup (SSL/HTTPS)', // Added
      'Database Integration (Firebase, Supabase or custom)',
      'Hosting Configuration (hosting provider of your choice)',
      'Advanced On-Page Search Engine Setup (SEO)',
      'Technical SEO for Products (Schema Markup)', // Added
      'Advanced Admin Panel (Manage products, orders, and content)', // Clarified text
      '1 Hour of Content Upload Training',
      'Google Analytics & Search Console Integration',
      'Customer Accounts Setup',
    ],
  },{
    title: 'Local Visibility Starter',
    slug: 'local-startup',
    price: 'R2,000', // Clear, fixed price
    description: 'The **Economic Package** plus all the tools needed to rank locally and track performance.',longDescription: "This special package combines the full features of our **Economic Package** with the top add-ons needed to get your business found on Google Maps and track customer behavior. It's the most cost-effective way to get a comprehensive site that is ready to attract local customers.",
    idealFor: "Restaurants, service providers, or any local business that needs a comprehensive site plus a clear path to ranking on Google Maps and local search results.",
    bestFor: "Local service businesses and physical stores.",  
    features: [
      'All Economic Package Features Included', 
      'Basic Security Setup (SSL/HTTPS)',
      'Google Business Profile Setup',
      'Google Analytics & Search Console Setup',
      'Enhanced Basic On-Page SEO',
    ],
    isCombo: true, 
  savingsNote: 'Saves R750 compared to buying the Economic Package and add-ons separately!', 
},
];

// Add-on services, categorized for easy navigation.
export const ADDON_CATEGORIES: AddonCategory[] = [
  {
    name: 'Content & Presentation',
    addons: [
      { title: 'Additional Page', price: 'R250/page' },
      { title: 'Photo Gallery / Portfolio', price: 'R200' },
      { title: 'Charts, Graphs, and Advanced Visuals', price: 'R150' },
      { title: 'Social Media Feed Integration', price: 'R150' },
      { title: 'Embedded Maps', price: 'R50' },
      { title: 'Professional Content Creation (Per Page)', price: 'From R500' },
      { title: 'Design Revision Round (Extra)', price: 'R300/round' }, // Added
    ],
  },
  {
    name: 'User & Business Interaction',
    addons: [
      { title: 'Advanced Forms (Multi-step, Quizzes)', price: 'R250' },
      { title: 'Newsletter Signup & Integration', price: 'R200' },
      { title: 'Live Chat Integration', price: 'R250' },
      { title: 'Customer Login Area/Basic Portal', price: 'From R1,000' },
      { title: 'Booking / Appointment System Setup', price: 'R500' },
    ],
  },
  {
    name: 'E-commerce & Data',
    addons: [
      { title: 'E-commerce / Online Store', price: 'See Package' },
      { title: 'Initial Product Data Import (Up to 20 Items)', price: 'R500' },
      { title: 'Additional Payment Gateway Setup', price: 'R300' },
      { title: 'Shipping & Tax Configuration', price: 'R300' },
    ],
  },
  {
    name: 'SEO & Performance',
    addons: [
      { title: 'Technical SEO Audit & Setup', price: 'R750' },
      { title: 'Schema Markup Implementation', price: 'R250/page' },
      { title: 'Website Speed Optimization', price: 'R350' },
    ],
  },
  {
    name: 'Security & Maintenance', // Renamed category for clarity
    addons: [
      { title: 'Automated Daily Backup Setup', price: 'R350' }, // Added
      { title: 'Advanced WAF/DDoS Protection Setup', price: 'R400' }, // Added
      { title: 'Cookie Consent Banner (POPIA/GDPR Compliant)', price: 'R200' },
      { title: 'Privacy Policy / T&C Template Setup', price: 'R100' },
    ],
  },
  {
    name: 'Training & Support', // New Category
    addons: [
      { title: 'Additional Content Training', price: 'R200/hour' }, // Added
    ],
  },
];

// Launch-specific services, often bundled together.
export const LAUNCH_PACK_SERVICES: AddonService[] = [
  { title: 'Google Business Profile Setup', price: 'R300' },
  { title: 'Google Analytics & Search Console Setup', price: 'R300' },
  { title: 'Basic On-Page SEO', price: 'R500' },
];


// Recurring maintenance plan.
export const RECURRING_SERVICE: RecurringService = {
  title: 'Web Care Plan',
  price: 'R199/month',
  description: 'Monthly maintenance including core software updates, security checks, off-site backup storage, and up to 15 minutes of minor content/text edits.', // Enhanced description
};
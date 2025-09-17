import React from 'react';
import type { ServicePackage, AddonService, AddonCategory } from '/lib/types.ts';

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    title: 'Landing Page',
    slug: 'landing-page',
    price: 'R1,000 ± R200',
    description: 'A powerful, single-page website designed to convert visitors for a specific campaign or goal.',
    longDescription: "Perfect for marketing campaigns, product launches, or events, a landing page is a highly focused, single-page website designed for one purpose: to convert visitors into leads or customers. We craft a compelling narrative with a clear call-to-action to maximize your campaign's effectiveness.",
    idealFor: "Marketing campaigns, event promotion, new product launches, or any business needing a focused, high-conversion web page without the complexity of a full multi-page site.",
    bestFor: "Marketing campaigns and product launches.",
    features: [
      'Single-Page Focused Design',
      'Clear Call-to-Action',
      'Mobile Responsive',
      'Contact/Lead Form Integration',
    ],
  },
  {
    title: 'Economic Package',
    slug: 'economic-package',
    price: 'R1,200 ± R200',
    description: 'A professional 5-page website, perfect for building a strong and comprehensive online presence.',
    longDescription: "Our Economic Package is the perfect choice for businesses needing a complete and professional online footprint. With up to 5 pages, you have the space to detail your services, introduce your team, and provide essential information to your customers. This package focuses on creating a clean, functional, and mobile-friendly website that establishes your credibility and serves as a digital hub for your business.",
    idealFor: "Small businesses, service providers, and startups who need more than a basic brochure site and want to present a comprehensive view of their offerings.",
    bestFor: "Small businesses needing a comprehensive site.",
    features: [
      'Up to 5 Pages',
      'Professionally Styled Design',
      'Mobile Responsive',
      'Contact Form Integration',
    ],
  },
  {
    title: 'Standard Package',
    slug: 'standard-package',
    price: 'R1,500 ± R200',
    description: 'Our most popular option for a complete, custom-designed online presence.',
    longDescription: "This is our flagship offering and the ideal choice for most small to medium-sized businesses looking to make a serious impact. The Standard Package moves beyond templates to provide a fully custom-designed website that reflects your unique brand identity and business goals. With up to 5 pages, we can build a comprehensive site that details your services, showcases your work, and is optimized from the ground up to attract and convert visitors.",
    idealFor: "Established businesses, service providers, restaurants, and companies looking for a unique digital storefront that sets them apart from the competition and provides a solid foundation for future growth.",
    bestFor: "Established businesses wanting a custom brand presence.",
    features: [
      'Up to 5 Custom Pages',
      'Unique Design Tailored to Your Brand',
      'Mobile Responsive',
      'Basic SEO Setup',
      'Hosting Configuration',
      '1 Hour of Content Upload Training',
    ],
    isFeatured: true,
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
      'Secure Payment Gateway Integration',
      'Custom Design Tailored for Sales',
      'Mobile-Optimized Checkout',
      'Basic Order Management Training'
    ],
  },
];

export const ADDON_CATEGORIES: AddonCategory[] = [
  {
    name: 'Content Display',
    addons: [
      { title: 'Additional Page', price: 'R150/page' },
      { title: 'Photo Gallery', price: 'R150' },
      { title: 'Testimonials Section', price: 'R100' },
      { title: 'Social Media Feed Integration', price: 'R150' },
      { title: 'Embedded Maps', price: 'R50' },
    ],
  },
  {
    name: 'User Interaction',
    addons: [
      { title: 'Advanced Forms (Multi-step, etc)', price: 'R150' },
      { title: 'Newsletter Signup', price: 'R100' },
      { title: 'Live Chat Integration', price: 'R200' },
      { title: 'Customer Login Area', price: 'From R1000' },
    ],
  },
  {
    name: 'Business Logic',
    addons: [
      { title: 'Booking / Appointment System', price: 'R200' },
      { title: 'E-commerce / Online Store', price: 'See Package' },
    ],
  },
  {
    name: 'Content & Marketing',
    addons: [
        { title: 'Professional Content Creation', price: 'R300' },
    ],
  }
];


export const LAUNCH_PACK_SERVICES: AddonService[] = [
    { title: 'Google Business Profile Setup', price: 'R300' },
    { title: 'Google Analytics & Search Console Setup', price: 'R300' },
    { title: 'Basic On-Page SEO', price: 'R500' },
];

export const RECURRING_SERVICE: AddonService = {
  title: 'Web Care Plan',
  price: 'R199/month',
};
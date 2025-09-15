import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import ContactPage from './components/ContactPage';
import ServicesPage from './components/ServicesPage';
import PricingPage from './components/PricingPage';
import QuestionnairePage from './components/QuestionnairePage';
import ColorPalettePage from './components/ColorPalettePage';
import { WHATSAPP_LINK } from './constants';

const App: React.FC = () => {
  return (
    <div className="bg-brand-dark text-brand-light font-sans antialiased">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/color-palette-generator" element={<ColorPalettePage />} />
      </Routes>
      <Footer />
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 transform hover:scale-110 z-50"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 448 512" fill="currentColor">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.3-8.8-98.1-25.4l-7-4.2-72.5 19.1 19.4-70.6-4.6-7.4c-18.7-29.9-28.7-65.4-28.7-102.1 0-108.7 88.4-197.1 197.1-197.1 53.3 0 104.1 20.8 142.3 58.9 38.2 38.2 58.9 89 58.9 142.3 0 108.7-88.4 197.1-197.1 197.1zm105.9-161.5c-5.9-3-35.1-17.3-40.6-19.3s-9.7-3-13.7 3c-4 6-15.4 19.3-18.9 23.3-3.5 4-7 4.5-13 1.5-6-3-25.3-9.3-48.1-29.6-17.8-15.8-29.8-35.3-33.3-41.3s-.3-9.3 2.7-12.3c2.7-2.7 5.9-7 8.9-10.5 3-3.5 4-5.9 6-9.9s3-6 1.5-11.4c-1.5-5.4-13.7-33.1-18.8-45.3-5.1-12.2-10.2-10.5-13.7-10.7-3.3-.2-7.2-.2-11.2-.2-4 0-10.7 1.5-16.2 7.5-5.6 6-21.5 21-21.5 51.3s22 59.5 25 63.5c3 4 43.1 65.6 105.2 93.2 14.9 6.9 28.6 11.1 38.5 14.1 16.4 5.1 31.4 4.4 43.2 2.7 12.9-1.9 39.8-16.3 45.4-32.1 5.6-15.8 5.6-29.2 3.9-32.1-1.7-2.9-5.7-4.5-11.7-7.5z"/>
        </svg>
      </a>
    </div>
  );
};

export default App;
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
    </div>
  );
};

export default App;
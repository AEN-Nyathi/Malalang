import React from 'react';
import ImageColorPicker from '@/components/ImageColorPicker';

const ColorPalettePage: React.FC = () => {
  return (
    <main>
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Color Palette Generator</h1>
            <p className="text-xl text-brand-primary font-semibold max-w-3xl mx-auto">
              Upload an image to automatically generate a color palette. Perfect for finding inspiration for your brand.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ImageColorPicker onPaletteChange={() => {
              // The component handles its own display state. No action needed here.
            }} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ColorPalettePage;
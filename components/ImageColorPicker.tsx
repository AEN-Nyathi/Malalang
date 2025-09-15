import React, { useState, useRef, useCallback } from 'react';

// A simple color object
interface Color {
  r: number;
  g: number;
  b: number;
}

// Convert RGB to HEX
const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => `0${c.toString(16)}`.slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

interface ImageColorPickerProps {
  onPaletteChange: (colors: string[]) => void;
}

const ImageColorPicker: React.FC<ImageColorPickerProps> = ({ onPaletteChange }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, etc.).');
      return;
    }
    setError(null);
    setIsLoading(true);
    setPalette([]);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageSrc(result);
      generatePalette(result);
    };
    reader.readAsDataURL(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  }, []);

  const generatePalette = (src: string) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx) {
        setError('Could not process the image.');
        setIsLoading(false);
        return;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const MAX_WIDTH = 100;
      const scale = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const colorCounts: { [key: string]: { color: Color, count: number } } = {};
        const step = 4 * 5; 

        for (let i = 0; i < imageData.length; i += step) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
            const a = imageData[i + 3];

            if (a < 125 || (r > 250 && g > 250 && b > 250) || (r < 10 && g < 10 && b < 10)) {
                continue;
            }

            const key = `${r},${g},${b}`;
            colorCounts[key] = colorCounts[key] || { color: { r, g, b }, count: 0 };
            colorCounts[key].count++;
        }
        
        const sortedColors = Object.values(colorCounts).sort((a, b) => b.count - a.count);
        const topColors = sortedColors.slice(0, 5).map(c => rgbToHex(c.color.r, c.color.g, c.color.b));
        
        setPalette(topColors);
        onPaletteChange(topColors);

      } catch (e) {
          setError('Could not process the image. It might be from a protected source.');
          console.error(e);
      } finally {
          setIsLoading(false);
      }
    };
    img.onerror = () => {
        setError('Could not load the image file.');
        setIsLoading(false);
    }
    img.src = src;
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="bg-slate-900/50 p-4 rounded-lg">
      <div 
        className="bg-brand-dark border-2 border-dashed border-slate-700 rounded-lg p-8 text-center cursor-pointer hover:border-brand-primary transition-colors"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
      >
        <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={onFileChange} />
        <div className="flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <p className="text-slate-300 font-semibold">Drop an image here</p>
            <p className="text-slate-500">or click to browse</p>
        </div>
      </div>
      
      {error && <p className="text-red-400 text-center mt-4">{error}</p>}

      <div className="mt-8">
          {isLoading && (
              <div className="text-center">
                  <p className="text-slate-300 text-lg">Generating palette...</p>
              </div>
          )}
          {imageSrc && !isLoading && (
              <div className="bg-brand-dark p-6 rounded-lg border border-slate-800">
                  <img src={imageSrc} alt="Uploaded preview" className="rounded-lg max-w-full max-h-80 mx-auto shadow-lg" />
              </div>
          )}
          {palette.length > 0 && (
              <div className="mt-8">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-0 overflow-hidden rounded-lg">
                      {palette.map((color, index) => (
                          <div key={index} style={{ backgroundColor: color }} className="h-40 flex flex-col justify-end p-3 text-white font-mono text-sm shadow-inner">
                              <span className="bg-black/40 px-2 py-1 rounded">{color}</span>
                          </div>
                      ))}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                      {palette.map((color, index) => (
                          <button 
                            key={`${index}-btn`}
                            onClick={() => copyToClipboard(color)}
                            className="w-full bg-slate-700 text-white font-semibold py-2 px-3 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                          >
                              {copiedColor === color ? 'Copied!' : color}
                          </button>
                      ))}
                  </div>
              </div>
          )}
      </div>
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default ImageColorPicker;
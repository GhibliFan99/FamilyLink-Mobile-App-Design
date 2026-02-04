import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { cn } from '@/lib/utils'; // I really need to create this file
import { Type, MousePointerClick, Sun, Moon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AccessibilityControls: React.FC = () => {
  const { 
    textSize, setTextSize, 
    buttonSize, setButtonSize, 
    highContrast, setHighContrast 
  } = useApp();

  const handleTextSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    const sizes = ['small', 'medium', 'large', 'extra-large'] as const;
    setTextSize(sizes[val]);
  };

  const handleButtonSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    const sizes = ['normal', 'large', 'extra-large'] as const;
    setButtonSize(sizes[val]);
  };

  const textSizeIndex = ['small', 'medium', 'large', 'extra-large'].indexOf(textSize);
  const buttonSizeIndex = ['normal', 'large', 'extra-large'].indexOf(buttonSize);

  const containerClass = cn(
    "w-full rounded-2xl p-5 mb-6 border-2 transition-colors",
    highContrast 
      ? "bg-black border-white text-white" 
      : "bg-white border-slate-100 shadow-sm text-slate-900"
  );

  const labelClass = cn(
    "font-bold flex items-center gap-2 mb-3",
    textSize === 'extra-large' ? "text-2xl" : "text-lg"
  );

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Dark Mode Toggle */}
      <div className={containerClass}>
        <div className="flex items-center justify-between">
          <label className={labelClass}>
            {highContrast ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            Dark Mode
          </label>
          <button 
            onClick={() => setHighContrast(!highContrast)}
            className={cn(
              "w-16 h-9 rounded-full relative transition-colors border-2",
              highContrast ? "bg-white border-white" : "bg-slate-200 border-slate-300"
            )}
          >
            <div className={cn(
              "absolute top-1 left-1 w-6 h-6 rounded-full transition-transform",
              highContrast ? "bg-black translate-x-7" : "bg-white translate-x-0 shadow-sm"
            )} />
          </button>
        </div>
      </div>

      {/* Text Size Slider */}
      <div className={containerClass}>
        <label className={labelClass}>
          <Type className="w-6 h-6" />
          Text Size
        </label>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold">A</span>
          <input 
            type="range" 
            min="0" 
            max="3" 
            step="1"
            value={textSizeIndex}
            onChange={handleTextSizeChange}
            className="w-full h-12 accent-indigo-600 touch-none"
            aria-label="Adjust text size"
          />
          <span className="text-2xl font-bold">A</span>
        </div>
        <div className="flex justify-between px-1 mt-1 text-sm font-medium opacity-70">
          <span>Small</span>
          <span>XL</span>
        </div>
      </div>

      {/* Button Size Slider */}
      <div className={containerClass}>
        <label className={labelClass}>
          <MousePointerClick className="w-6 h-6" />
          Button Size
        </label>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-current rounded-sm" />
          <input 
            type="range" 
            min="0" 
            max="2" 
            step="1"
            value={buttonSizeIndex}
            onChange={handleButtonSizeChange}
            className="w-full h-12 accent-indigo-600 touch-none"
            aria-label="Adjust button size"
          />
          <div className="w-8 h-8 bg-current rounded-sm" />
        </div>
         <div className="flex justify-between px-1 mt-1 text-sm font-medium opacity-70">
          <span>Normal</span>
          <span>XL</span>
        </div>
      </div>
    </div>
  );
};

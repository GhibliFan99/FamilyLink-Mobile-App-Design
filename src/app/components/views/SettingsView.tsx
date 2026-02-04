import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { AccessibilityControls } from '@/app/components/home/AccessibilityControls';
import { ResponsiveButton } from '@/app/components/ui/ResponsiveButton';
import { Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SettingsView: React.FC = () => {
  const { 
    highContrast, 
    voiceGuideEnabled, setVoiceGuideEnabled,
    setCurrentView
  } = useApp();

  return (
    <div className={cn(
      "flex flex-col gap-6 p-4 pb-32",
      highContrast ? "bg-black text-white" : "bg-slate-50 text-slate-900"
    )}>
      <div className="flex items-center gap-4 mb-4">
        <button 
           onClick={() => setCurrentView('home')}
           className={cn(
             "p-2 rounded-full", 
             highContrast ? "bg-white text-black" : "bg-slate-200 text-slate-700"
           )}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="space-y-6">
        <section>
           <h2 className="text-xl font-bold mb-4 opacity-80">Display</h2>
           <AccessibilityControls />
        </section>

        <section className={cn(
          "rounded-2xl p-5 border-2",
          highContrast ? "border-white" : "bg-white border-slate-100 shadow-sm"
        )}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Volume2 className="w-6 h-6" /> Voice Guide
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Enable Voice Suggestions</span>
            <button 
                onClick={() => setVoiceGuideEnabled(!voiceGuideEnabled)}
                className={cn(
                  "w-16 h-9 rounded-full relative transition-colors border-2",
                  voiceGuideEnabled 
                    ? (highContrast ? "bg-green-400 border-green-400" : "bg-green-500 border-green-500")
                    : (highContrast ? "bg-white border-white" : "bg-slate-200 border-slate-300")
                )}
              >
                <div className={cn(
                  "absolute top-1 left-1 w-6 h-6 rounded-full transition-transform bg-white shadow-sm",
                  voiceGuideEnabled ? "translate-x-7" : "translate-x-0"
                )} />
              </button>
          </div>
        </section>
      </div>

      <ResponsiveButton 
        variant="secondary"
        label="Back to Home"
        onClick={() => setCurrentView('home')}
        className="mt-8"
      />
    </div>
  );
};

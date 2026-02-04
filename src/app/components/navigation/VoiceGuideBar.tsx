import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { cn } from '@/lib/utils';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const VoiceGuideBar: React.FC = () => {
  const { voiceGuideEnabled, highContrast, currentView, textSize } = useApp();

  if (!voiceGuideEnabled || currentView === 'call' || currentView === 'video-call') return null;

  return (
    <div className={cn(
      "w-full py-3 px-4 text-center border-t transition-colors",
      highContrast 
        ? "bg-gray-800 text-white border-gray-700" 
        : "bg-indigo-50 text-indigo-900 border-indigo-100"
    )}>
      <p className={cn(
        "font-medium",
        textSize === 'extra-large' ? "text-xl" : "text-base"
      )}>
        Tap <span className="font-bold">Call</span> to start a call
      </p>
    </div>
  );
};

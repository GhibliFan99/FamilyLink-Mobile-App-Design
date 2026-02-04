import React, { useState, useEffect } from 'react';
import { useApp } from '@/app/context/AppContext';
import { ResponsiveButton } from '@/app/components/ui/ResponsiveButton';
import { PhoneOff, Video, Mic, Volume2 } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { cn } from '@/lib/utils';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CallScreen: React.FC = () => {
  const { currentView, setCurrentView, highContrast, textSize } = useApp();
  const [duration, setDuration] = useState(0);
  const [status, setStatus] = useState('Calling...');

  // Timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
      if (duration > 2 && status === 'Calling...') {
        setStatus('Connected');
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [status, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isVideo = currentView === 'video-call';

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex flex-col items-center pt-12 pb-8 px-6",
      highContrast ? "bg-black text-white" : "bg-slate-50 text-slate-900"
    )}>
      {/* Top Status */}
      <div className="flex flex-col items-center mb-8 w-full">
        <h3 className={cn(
          "font-medium mb-2 opacity-80",
          textSize === 'extra-large' ? "text-2xl" : "text-lg"
        )}>
          {status}
        </h3>
        <div className={cn(
          "font-mono font-bold tracking-wider",
          highContrast ? "text-yellow-300" : "text-indigo-600",
          textSize === 'extra-large' ? "text-5xl" : "text-4xl"
        )}>
          {formatTime(duration)}
        </div>
      </div>

      {/* Contact Photo */}
      <div className={cn(
        "relative rounded-3xl overflow-hidden shadow-2xl mb-auto transition-all",
        isVideo ? "w-full aspect-[3/4]" : "w-48 h-48 rounded-full border-4"
      )}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758600433363-eaa446a1ac84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBhZ2VkJTIwd29tYW4lMjBzbWlsaW5nJTIwcG9ydHJhaXQlMjBmcmllbmRseXxlbnwxfHx8fDE3Njk4NzczMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Sarah"
          className="w-full h-full object-cover"
        />
        {isVideo && (
           <div className="absolute bottom-4 right-4 w-24 h-32 bg-slate-800 rounded-xl border-2 border-white overflow-hidden shadow-lg">
             {/* Self View Placeholder */}
             <div className="w-full h-full bg-slate-600 flex items-center justify-center text-white text-xs">You</div>
           </div>
        )}
      </div>

      <div className="text-center mb-8">
        <h1 className={cn(
          "font-bold",
          textSize === 'extra-large' ? "text-4xl" : "text-3xl"
        )}>
          Sarah
        </h1>
      </div>

      {/* Controls */}
      <div className="w-full flex flex-col gap-4">
        <div className="flex gap-4 mb-4 justify-center">
            {/* Mute / Speaker buttons just for show */}
             <button className={cn(
               "p-4 rounded-full border-2",
               highContrast ? "border-white bg-black" : "border-slate-200 bg-white"
             )}>
                <Mic className={cn("w-8 h-8", highContrast ? "text-white" : "text-slate-600")} />
             </button>
             <button className={cn(
               "p-4 rounded-full border-2",
               highContrast ? "border-white bg-black" : "border-slate-200 bg-white"
             )}>
                <Volume2 className={cn("w-8 h-8", highContrast ? "text-white" : "text-slate-600")} />
             </button>
        </div>

        <ResponsiveButton 
          variant="danger" 
          icon={PhoneOff} 
          label="End Call" 
          onClick={() => {
            setDuration(0);
            setStatus('Calling...');
            setCurrentView('home');
          }}
        />
      </div>
    </div>
  );
};

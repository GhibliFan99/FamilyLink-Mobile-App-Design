import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { ResponsiveButton } from '@/app/components/ui/ResponsiveButton';
import { Phone, Video, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for cn since I haven't made the lib file yet (I will make it next to clean up)
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Image component
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export const ContactCard: React.FC = () => {
  const { highContrast, textSize, setCurrentView } = useApp();

  return (
    <div className={cn(
      "w-full rounded-3xl p-6 shadow-lg border-2 flex flex-col items-center gap-6 mb-8",
      highContrast 
        ? "bg-black border-white shadow-none" 
        : "bg-white border-transparent shadow-slate-200"
    )}>
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-3">
        <div className={cn(
          "relative overflow-hidden rounded-full border-4",
          highContrast ? "border-white" : "border-indigo-100",
          "w-32 h-32"
        )}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758600433363-eaa446a1ac84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBhZ2VkJTIwd29tYW4lMjBzbWlsaW5nJTIwcG9ydHJhaXQlMjBmcmllbmRseXxlbnwxfHx8fDE3Njk4NzczMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Sarah"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className={cn(
            "font-bold leading-tight",
            highContrast ? "text-white" : "text-slate-900",
            textSize === 'extra-large' ? "text-4xl" : textSize === 'large' ? "text-3xl" : "text-2xl"
          )}>
            Sarah
          </h2>
          <p className={cn(
            "font-medium mt-1",
            highContrast ? "text-white" : "text-slate-500",
            textSize === 'extra-large' ? "text-2xl" : "text-lg"
          )}>
            (Daughter)
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col gap-4">
        <ResponsiveButton 
          variant="success" 
          icon={Phone} 
          label="Call Sarah" 
          onClick={() => setCurrentView('call')}
        />
        <ResponsiveButton 
          variant="info" 
          icon={Video} 
          label="Video Call" 
          onClick={() => setCurrentView('video-call')}
        />
        <ResponsiveButton 
          variant="purple" 
          icon={MessageSquare} 
          label="Message" 
          onClick={() => alert("Message feature would open here")}
        />
      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { Home, Settings, Mic, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView, highContrast, textSize } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'voice', label: 'Voice', icon: Mic },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  // Don't show nav on call screen? Or maybe show it but disabled?
  // Usually full screen call takes over.
  if (currentView === 'call' || currentView === 'video-call') return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 border-t pb-safe pt-2 px-2 flex justify-around items-end z-50",
      highContrast ? "bg-black border-white" : "bg-white border-gray-200"
    )}>
      {navItems.map((item) => {
        const isActive = currentView === item.id || (item.id === 'voice' && false); // Voice is a modal/action usually
        const Icon = item.icon;
        
        return (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === 'voice') {
                // Should trigger voice modal
                // For now, let's just pretend or set a state?
                // The prompt says "Voice Command Feature... Add a Microphone (Mic) icon in the bottom navigation bar"
                // Let's make it switch to a 'voice' view or overlay.
                // But the 'currentView' type I defined has 'home', 'call', 'settings'.
                // I'll assume it opens a modal overlay, but for simplicity let's treat it as a view or just alert for now,
                // actually I'll add 'voice-command' to the view types or handle it in App.tsx
                console.log("Voice Clicked");
                // For this prototype, let's make it a button that triggers the visual indicator in the main layout.
                const event = new CustomEvent('toggle-voice-command');
                window.dispatchEvent(event);
              } else {
                setCurrentView(item.id as any);
              }
            }}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-xl transition-all w-full",
              isActive 
                ? (highContrast ? "bg-white text-black" : "bg-indigo-50 text-indigo-700") 
                : (highContrast ? "text-white hover:bg-gray-800" : "text-gray-500 hover:bg-gray-50")
            )}
          >
            <Icon className={cn(
              "mb-1",
              textSize === 'extra-large' ? "w-10 h-10" : "w-8 h-8"
            )} />
            <span className={cn(
              "font-medium",
              textSize === 'extra-large' ? "text-lg" : "text-sm"
            )}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

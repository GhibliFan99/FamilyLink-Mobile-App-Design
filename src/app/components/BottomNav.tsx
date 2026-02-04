import React from 'react';
import { Home, Settings, Mic } from 'lucide-react';
import { useAccessibility } from '@/app/contexts/AccessibilityContext';
import clsx from 'clsx';

type NavProps = {
  currentTab: string;
  onNavigate: (tab: string) => void;
};

export const BottomNav = ({ currentTab, onNavigate }: NavProps) => {
  const { highContrast, textSize } = useAccessibility();

  const baseTextSize = 'text-sm';
  const scaleClass = textSize > 2 ? 'scale-110' : 'scale-100';

  return (
    <div
      className={clsx(
        'w-full flex justify-around items-center py-4 border-t transition-colors duration-300',
        highContrast
          ? 'bg-black border-gray-800 text-white'
          : 'bg-white border-gray-200 text-gray-600'
      )}
    >
      <button
        onClick={() => onNavigate('home')}
        className={clsx(
          'flex flex-col items-center gap-1 p-2 rounded-xl transition-all',
          currentTab === 'home' && !highContrast ? 'bg-blue-50 text-blue-600' : '',
          currentTab === 'home' && highContrast ? 'bg-gray-700 text-white font-bold' : '',
          scaleClass
        )}
      >
        <Home size={32} strokeWidth={2.5} />
        <span
          className={clsx(baseTextSize, 'font-medium')}
          style={{ fontSize: `${14 * textSize}px` }}
        >
          Home
        </span>
      </button>

      <button
        onClick={() => onNavigate('voice')}
        className={clsx(
          'flex flex-col items-center gap-1 p-2 rounded-xl transition-all',
          currentTab === 'voice' && !highContrast ? 'bg-purple-50 text-purple-600' : '',
          currentTab === 'voice' && highContrast ? 'bg-gray-700 text-white font-bold' : '',
          scaleClass
        )}
      >
        <Mic size={32} strokeWidth={2.5} />
        <span
          className={clsx(baseTextSize, 'font-medium')}
          style={{ fontSize: `${14 * textSize}px` }}
        >
          Voice
        </span>
      </button>

      <button
        onClick={() => onNavigate('settings')}
        className={clsx(
          'flex flex-col items-center gap-1 p-2 rounded-xl transition-all',
          currentTab === 'settings' && !highContrast ? 'bg-gray-100 text-gray-800' : '',
          currentTab === 'settings' && highContrast ? 'bg-gray-700 text-white font-bold' : '',
          scaleClass
        )}
      >
        <Settings size={32} strokeWidth={2.5} />
        <span
          className={clsx(baseTextSize, 'font-medium')}
          style={{ fontSize: `${14 * textSize}px` }}
        >
          Settings
        </span>
      </button>
    </div>
  );
};

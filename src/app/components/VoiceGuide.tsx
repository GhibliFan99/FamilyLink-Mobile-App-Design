import React, { useEffect } from 'react';
import { useAccessibility } from '@/app/contexts/AccessibilityContext';
import clsx from 'clsx';
import { Volume2 } from 'lucide-react';

type VoiceGuideProps = {
  text: string;
};

export const VoiceGuide = ({ text }: VoiceGuideProps) => {
  const { highContrast, textSize, voiceGuideEnabled } = useAccessibility();

  useEffect(() => {
    if (!voiceGuideEnabled || !text) {
      window.speechSynthesis.cancel();
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for better clarity
    utterance.lang = 'en-US';
    
    // Speak
    window.speechSynthesis.speak(utterance);

    // Cleanup on unmount or text change
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text, voiceGuideEnabled]);

  if (!voiceGuideEnabled) return null;

  return (
    <div
      className={clsx(
        'w-full p-4 border-t flex items-center gap-3 transition-colors duration-300 min-h-[80px]',
        highContrast
          ? 'bg-gray-900 border-gray-800 text-white'
          : 'bg-blue-50 border-blue-100 text-blue-900'
      )}
    >
      <Volume2 size={32} className={highContrast ? 'text-white' : 'text-blue-600'} />
      <p
        className="font-medium leading-tight"
        style={{ fontSize: `${16 * textSize}px` }}
      >
        {text}
      </p>
    </div>
  );
};

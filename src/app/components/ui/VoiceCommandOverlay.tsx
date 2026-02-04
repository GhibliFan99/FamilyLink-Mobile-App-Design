import React, { useEffect, useState } from 'react';
import { useApp } from '@/app/context/AppContext';
import { Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const VoiceCommandOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [command, setCommand] = useState("Listening...");

  useEffect(() => {
    const handleToggle = () => {
      setIsVisible(true);
      setCommand("Listening...");
    };

    window.addEventListener('toggle-voice-command', handleToggle);
    return () => window.removeEventListener('toggle-voice-command', handleToggle);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-white"
        onClick={() => setIsVisible(false)}
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center mb-8 shadow-xl shadow-red-900"
        >
          <Mic className="w-12 h-12" />
        </motion.div>
        
        <h2 className="text-3xl font-bold mb-4">Listening...</h2>
        <p className="text-2xl text-center font-mono text-green-400">"{command}"</p>
        
        <div className="mt-12 text-center opacity-70">
          <p className="mb-2">Try saying:</p>
          <p className="font-bold">"Call Sarah"</p>
          <p className="font-bold">"Video Call Sarah"</p>
        </div>

        <button 
          className="mt-12 px-8 py-3 bg-white/10 rounded-full border border-white/30"
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
        >
          Cancel
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

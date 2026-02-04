import React, { useState, useEffect } from 'react';
import { useAccessibility } from '@/app/contexts/AccessibilityContext';
import clsx from 'clsx';
import { Mic, MicOff } from 'lucide-react';
import { motion } from 'motion/react';

type VoiceCommandScreenProps = {
  onCommand: (command: string) => void;
  onCancel: () => void;
};

export const VoiceCommandScreen = ({ onCommand, onCancel }: VoiceCommandScreenProps) => {
  const { highContrast, textSize } = useAccessibility();
  const [status, setStatus] = useState('Listening...');
  const [recognizedText, setRecognizedText] = useState('');
  const [isListening, setIsListening] = useState(true);

  useEffect(() => {
    // Use Web Speech API if available
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setStatus('Speech Recognition not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setStatus('Listening...');
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setRecognizedText(finalTranscript.trim());
        setStatus('Processing...');
        // Process the final transcript
        setTimeout(() => {
          onCommand(finalTranscript.trim());
        }, 500);
      } else if (interimTranscript) {
        setRecognizedText(interimTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      setStatus(`Error: ${event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (!recognizedText) {
        setStatus('No command recognized');
      }
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [onCommand, recognizedText]);

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center h-full text-center px-6',
        highContrast ? 'bg-black text-white' : 'bg-white text-gray-900'
      )}
    >
      <div className="relative mb-12">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className={clsx(
            'absolute inset-0 rounded-full',
            isListening
              ? highContrast
                ? 'bg-yellow-400'
                : 'bg-blue-400'
              : highContrast
              ? 'bg-red-600'
              : 'bg-red-400'
          )}
        />
        <div
          className={clsx(
            'relative z-10 w-32 h-32 rounded-full flex items-center justify-center shadow-xl',
            isListening
              ? highContrast
                ? 'bg-yellow-400 text-black'
                : 'bg-blue-600 text-white'
              : highContrast
              ? 'bg-red-700 text-red-200'
              : 'bg-red-600 text-white'
          )}
        >
          {isListening ? <Mic size={64} /> : <MicOff size={64} />}
        </div>
      </div>

      <h2
        className="font-bold mb-4"
        style={{ fontSize: `${28 * textSize}px` }}
      >
        {status}
      </h2>

      {recognizedText && (
        <div
          className={clsx(
            'mb-6 p-4 rounded-lg',
            highContrast ? 'bg-gray-900 border-2 border-yellow-400' : 'bg-blue-50 border-2 border-blue-400'
          )}
        >
          <p
            className={clsx('font-medium', highContrast ? 'text-yellow-400' : 'text-blue-700')}
            style={{ fontSize: `${18 * textSize}px` }}
          >
            "{recognizedText}"
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2 opacity-80 mb-8" style={{ fontSize: `${16 * textSize}px` }}>
        <p className="font-bold mb-2">Try saying:</p>
        <p>"go to home" or "home"</p>
        <p>"go to settings" or "settings"</p>
        <p>"call &lt;name&gt;"</p>
        <p>"video call &lt;name&gt;"</p>
        <p>"message &lt;name&gt;"</p>
      </div>

      <button
        onClick={onCancel}
        className={clsx(
          'mt-8 px-8 py-3 rounded-full font-bold border-2 transition-colors',
          highContrast ? 'border-red-500 text-red-500 hover:bg-red-900' : 'border-red-500 text-red-600 hover:bg-red-50'
        )}
        style={{ fontSize: `${18 * textSize}px` }}
      >
        Cancel
      </button>
    </div>
  );
};

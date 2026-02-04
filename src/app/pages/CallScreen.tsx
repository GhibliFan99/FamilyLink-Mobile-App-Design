import React, { useEffect, useState } from 'react';
import { useAccessibility } from '@/app/contexts/AccessibilityContext';
import { Contact } from '@/app/data/contacts';
import clsx from 'clsx';
import { PhoneOff, MicOff, Mic, Video, VideoOff } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

type CallScreenProps = {
  contact: Contact;
  mode: 'voice' | 'video';
  onEndCall: (duration: number) => void;
};

export const CallScreen = ({ contact, mode, onEndCall }: CallScreenProps) => {
  const { highContrast, textSize, buttonSize } = useAccessibility();
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const iconSize = 32 * buttonSize;

  // Video Mode Layout
  if (mode === 'video') {
    return (
      <div className="relative h-full w-full bg-black overflow-hidden flex flex-col">
        {/* Main Video (The Contact) */}
        <div className="absolute inset-0 z-0">
           <ImageWithFallback
              src={contact.image}
              alt={contact.name}
              className="w-full h-full object-cover opacity-90"
            />
            {/* Overlay Gradient for controls visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        </div>

        {/* Self View (Me) */}
        {!isVideoOff && (
            <div className="absolute top-4 right-4 z-20 w-32 h-44 rounded-xl border-2 border-white overflow-hidden shadow-2xl bg-gray-800">
                 <ImageWithFallback
                    src="https://images.unsplash.com/photo-1654857260001-c4bcddda4942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBtYW4lMjBzZWxmaWUlMjBsb29raW5nJTIwYXQlMjBjYW1lcmF8ZW58MXx8fHwxNzY5ODc5MjI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Me"
                    className="w-full h-full object-cover scale-x-[-1]" // Mirror effect
                />
            </div>
        )}

        {/* Header Info */}
        <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white pointer-events-none">
             <h2 className="font-bold drop-shadow-md" style={{ fontSize: `${32 * textSize}px` }}>{contact.name}</h2>
             <p className="font-medium drop-shadow-md opacity-90">{formatTime(duration)}</p>
        </div>

        {/* Controls (Bottom) */}
        <div className="relative z-10 mt-auto pb-8 flex items-center justify-center gap-6">
            <button
                onClick={() => setIsMuted(!isMuted)}
                className={clsx(
                'rounded-full p-4 transition-all shadow-lg flex items-center justify-center backdrop-blur-md',
                isMuted ? 'bg-white text-black' : 'bg-black/40 text-white border border-white/30'
                )}
                style={{ width: `${60 * buttonSize}px`, height: `${60 * buttonSize}px` }}
            >
                {isMuted ? <MicOff size={iconSize} /> : <Mic size={iconSize} />}
            </button>

            <button
                onClick={() => onEndCall(duration)}
                className="rounded-full p-4 shadow-xl flex items-center justify-center bg-red-600 text-white hover:bg-red-700 active:scale-95"
                style={{ width: `${80 * buttonSize}px`, height: `${80 * buttonSize}px` }}
            >
                <PhoneOff size={iconSize * 1.2} />
            </button>

            <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={clsx(
                'rounded-full p-4 transition-all shadow-lg flex items-center justify-center backdrop-blur-md',
                isVideoOff ? 'bg-white text-black' : 'bg-black/40 text-white border border-white/30'
                )}
                style={{ width: `${60 * buttonSize}px`, height: `${60 * buttonSize}px` }}
            >
                {isVideoOff ? <VideoOff size={iconSize} /> : <Video size={iconSize} />}
            </button>
        </div>
      </div>
    );
  }

  // Voice Call Layout (Existing Style)
  return (
    <div
      className={clsx(
        'flex flex-col h-full items-center pt-12 pb-8 px-6 transition-colors duration-300',
        highContrast ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
      )}
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm gap-8">
        {/* Status */}
        <div className="text-center">
          <p
            className={clsx('font-medium mb-2', highContrast ? 'text-yellow-400' : 'text-gray-500')}
            style={{ fontSize: `${18 * textSize}px` }}
          >
            Connected
          </p>
          <h1
            className="font-bold leading-tight"
            style={{ fontSize: `${48 * textSize}px` }}
          >
            {formatTime(duration)}
          </h1>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-gray-200 shadow-xl relative">
             <ImageWithFallback
                src={contact.image}
                alt={contact.name}
                className="w-full h-full object-cover"
              />
          </div>
          <div className="text-center">
            <h2 className="font-bold" style={{ fontSize: `${32 * textSize}px` }}>{contact.name}</h2>
            <p
              className={highContrast ? 'text-yellow-300' : 'text-gray-500'}
              style={{ fontSize: `${20 * textSize}px` }}
            >
              {contact.relation}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-8 w-full justify-center">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={clsx(
              'rounded-full p-4 transition-all shadow-lg flex items-center justify-center',
              highContrast
                ? 'bg-gray-800 text-white border-2 border-white'
                : 'bg-white text-gray-700',
              isMuted && !highContrast ? 'bg-gray-200' : ''
            )}
            style={{ width: `${60 * buttonSize}px`, height: `${60 * buttonSize}px` }}
            aria-label="Mute"
          >
            {isMuted ? <MicOff size={iconSize} /> : <Mic size={iconSize} />}
          </button>

          <button
            onClick={() => onEndCall(duration)}
            className={clsx(
              'rounded-full p-4 shadow-xl flex items-center justify-center transition-transform active:scale-90',
              highContrast ? 'bg-red-900 text-red-200 border-2 border-red-500' : 'bg-red-500 text-white'
            )}
            style={{ width: `${80 * buttonSize}px`, height: `${80 * buttonSize}px` }}
             aria-label="End Call"
          >
            <PhoneOff size={iconSize * 1.2} />
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Phone, Video, MessageSquare, Trash2 } from 'lucide-react';
import { useAccessibility } from '@/app/contexts/AccessibilityContext';
import clsx from 'clsx';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

type ContactCardProps = {
  name: string;
  relation: string;
  image: string;
  onCall: () => void;
  onVideoCall: () => void;
  onMessage: () => void;
  onDelete?: () => void;
};

export const ContactCard = ({
  name,
  relation,
  image,
  onCall,
  onVideoCall,
  onMessage,
  onDelete,
}: ContactCardProps) => {
  const { highContrast, textSize, buttonSize } = useAccessibility();

  const buttonBaseStyle = 'flex-1 flex flex-col items-center justify-center rounded-2xl shadow-sm active:scale-95 transition-all';
  const iconSize = 24 * buttonSize;

  return (
    <div
      className={clsx(
        'w-full rounded-3xl p-6 shadow-lg flex flex-col gap-6 transition-colors duration-300 relative',
        highContrast
          ? 'bg-black border-2 border-gray-800'
          : 'bg-white border border-gray-100'
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-4 justify-between">
        <div className="relative overflow-hidden rounded-full w-24 h-24 border-4 border-gray-100 shrink-0">
          <ImageWithFallback
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 ml-3 flex items-center justify-between">
          <div>
            <h2
              className={clsx('font-bold leading-tight', highContrast ? 'text-white' : 'text-gray-900')}
              style={{ fontSize: `${24 * textSize}px` }}
            >
              {name}
            </h2>
            <p
              className={clsx('font-medium', highContrast ? 'text-white' : 'text-gray-500')}
              style={{ fontSize: `${18 * textSize}px` }}
            >
              {relation}
            </p>
          </div>
          {onDelete && (
            <button
              onClick={onDelete}
              aria-label={`Delete ${name}`}
              className={clsx('ml-4 p-2 rounded-md hover:bg-red-50 text-red-600')}
            >
              <Trash2 size={18 * buttonSize} />
            </button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 h-full">
        <button
          onClick={onCall}
          style={{ padding: `${12 * buttonSize}px` }}
          className={clsx(
            buttonBaseStyle,
            highContrast ? 'bg-green-900 border-2 border-green-400 text-green-400' : 'bg-green-100 text-green-800 hover:bg-green-200'
          )}
        >
          <Phone size={iconSize} strokeWidth={3} className="mb-2" />
          <span className="font-bold" style={{ fontSize: `${14 * textSize}px` }}>Call</span>
        </button>

        <button
          onClick={onVideoCall}
          style={{ padding: `${12 * buttonSize}px` }}
          className={clsx(
            buttonBaseStyle,
            highContrast ? 'bg-blue-900 border-2 border-blue-400 text-blue-400' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          )}
        >
          <Video size={iconSize} strokeWidth={3} className="mb-2" />
          <span className="font-bold" style={{ fontSize: `${14 * textSize}px` }}>Video</span>
        </button>

        <button
          onClick={onMessage}
          style={{ padding: `${12 * buttonSize}px` }}
          className={clsx(
            buttonBaseStyle,
            highContrast ? 'bg-purple-900 border-2 border-purple-400 text-purple-400' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
          )}
        >
          <MessageSquare size={iconSize} strokeWidth={3} className="mb-2" />
          <span className="font-bold" style={{ fontSize: `${14 * textSize}px` }}>Message</span>
        </button>
      </div>
    </div>
  );
};

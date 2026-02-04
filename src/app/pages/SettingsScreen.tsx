import React from 'react';
import { useAccessibility } from '@/app/contexts/AccessibilityContext';
import clsx from 'clsx';
import { Type, MoveDiagonal, Sun, Volume2 } from 'lucide-react';

export const SettingsScreen = () => {
  const {
    textSize,
    setTextSize,
    buttonSize,
    setButtonSize,
    highContrast,
    setHighContrast,
    voiceGuideEnabled,
    setVoiceGuideEnabled,
    volume,
    setVolume,
  } = useAccessibility();

  const labelStyle = { fontSize: `${18 * textSize}px` };

  const SettingRow = ({
    icon: Icon,
    label,
    control,
  }: {
    icon: any;
    label: string;
    control: React.ReactNode;
  }) => (
    <div
      className={clsx(
        'p-6 rounded-2xl flex flex-col gap-4 shadow-sm border transition-colors',
        highContrast
          ? 'bg-gray-900 border-white'
          : 'bg-white border-gray-100'
      )}
    >
      <div className="flex items-center gap-4">
        <div className={clsx('p-3 rounded-full', highContrast ? 'bg-yellow-900 text-yellow-400' : 'bg-blue-50 text-blue-600')}>
          <Icon size={24 * textSize} />
        </div>
        <span
          className={clsx('font-bold', highContrast ? 'text-white' : 'text-gray-900')}
          style={labelStyle}
        >
          {label}
        </span>
      </div>
      <div className="pl-4">{control}</div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pb-4">
      <h1
        className={clsx('font-bold', highContrast ? 'text-white' : 'text-gray-900')}
        style={{ fontSize: `${28 * textSize}px` }}
      >
        Settings
      </h1>

      <SettingRow
        icon={Type}
        label="Text Size"
        control={
          <div className="flex flex-col gap-2">
            <input
              type="range"
              min="1"
              max="2"
              step="0.1"
              value={textSize}
              onChange={(e) => setTextSize(parseFloat(e.target.value))}
              className="w-full h-12 accent-blue-600 cursor-pointer"
            />
            <div className={clsx('flex justify-between px-1', highContrast ? 'text-white' : 'text-gray-500')}>
               <span>Small</span>
               <span>Large</span>
            </div>
          </div>
        }
      />

      <SettingRow
        icon={MoveDiagonal}
        label="Button Size"
        control={
           <div className="flex flex-col gap-2">
            <input
              type="range"
              min="1"
              max="2"
              step="0.1"
              value={buttonSize}
              onChange={(e) => setButtonSize(parseFloat(e.target.value))}
              className="w-full h-12 accent-blue-600 cursor-pointer"
            />
             <div className={clsx('flex justify-between px-1', highContrast ? 'text-white' : 'text-gray-500')}>
               <span>Normal</span>
               <span>Extra Large</span>
            </div>
          </div>
        }
      />

      <SettingRow
        icon={Sun}
        label="Dark Mode"
        control={
          <div className="flex items-center gap-4">
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={clsx(
                'w-16 h-8 rounded-full relative transition-colors duration-300',
                highContrast ? 'bg-gray-800' : 'bg-gray-300'
              )}
            >
              <div
                className={clsx(
                  'w-6 h-6 rounded-full bg-white shadow-md absolute top-1 transition-all duration-300',
                  highContrast ? 'left-9' : 'left-1'
                )}
              />
            </button>
            <span style={{ fontSize: `${16 * textSize}px` }} className={highContrast ? 'text-white' : 'text-gray-600'}>
              {highContrast ? 'On' : 'Off'}
            </span>
          </div>
        }
      />

      <SettingRow
        icon={Volume2}
        label="Voice Guide"
        control={
          <div className="flex items-center gap-4">
            <button
              onClick={() => setVoiceGuideEnabled(!voiceGuideEnabled)}
              className={clsx(
                'w-16 h-8 rounded-full relative transition-colors duration-300',
                voiceGuideEnabled ? (highContrast ? 'bg-yellow-400' : 'bg-blue-600') : 'bg-gray-300'
              )}
            >
              <div
                className={clsx(
                  'w-6 h-6 rounded-full bg-white shadow-md absolute top-1 transition-all duration-300',
                  voiceGuideEnabled ? 'left-9' : 'left-1'
                )}
              />
            </button>
            <span style={{ fontSize: `${16 * textSize}px` }} className={highContrast ? 'text-yellow-400' : 'text-gray-600'}>
              {voiceGuideEnabled ? 'On' : 'Off'}
            </span>
          </div>
        }
      />

      <SettingRow
        icon={Volume2}
        label="Call Volume"
        control={
          <div className="flex flex-col gap-2">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-12 accent-blue-600 cursor-pointer"
            />
            <div className={clsx('flex justify-between px-1', highContrast ? 'text-white' : 'text-gray-500')}>
              <span>Quiet</span>
              <span>Loud</span>
            </div>
          </div>
        }
      />
    </div>
  );
};

import React, { createContext, useContext, useState, ReactNode } from 'react';

type TextSize = 'small' | 'medium' | 'large' | 'extra-large';
type ButtonSize = 'normal' | 'large' | 'extra-large';

interface AppState {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  buttonSize: ButtonSize;
  setButtonSize: (size: ButtonSize) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  voiceGuideEnabled: boolean;
  setVoiceGuideEnabled: (enabled: boolean) => void;
  currentView: 'home' | 'call' | 'video-call' | 'settings';
  setCurrentView: (view: 'home' | 'call' | 'video-call' | 'settings') => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [textSize, setTextSize] = useState<TextSize>('medium');
  const [buttonSize, setButtonSize] = useState<ButtonSize>('large'); // Default to large for elderly
  const [highContrast, setHighContrast] = useState(false);
  const [voiceGuideEnabled, setVoiceGuideEnabled] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'call' | 'video-call' | 'settings'>('home');

  return (
    <AppContext.Provider
      value={{
        textSize,
        setTextSize,
        buttonSize,
        setButtonSize,
        highContrast,
        setHighContrast,
        voiceGuideEnabled,
        setVoiceGuideEnabled,
        currentView,
        setCurrentView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

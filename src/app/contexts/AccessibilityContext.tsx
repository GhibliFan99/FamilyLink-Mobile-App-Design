import { createContext, useContext, useState, FC, ReactNode, Dispatch, SetStateAction } from "react";

type AccessibilityContextType = {
  highContrast: boolean;
  setHighContrast: Dispatch<SetStateAction<boolean>>;
  textSize: number;
  setTextSize: Dispatch<SetStateAction<number>>;
  buttonSize: number;
  setButtonSize: Dispatch<SetStateAction<number>>;
  voiceGuideEnabled: boolean;
  setVoiceGuideEnabled: Dispatch<SetStateAction<boolean>>;
  volume: number; // 0-1
  setVolume: Dispatch<SetStateAction<number>>;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [textSize, setTextSize] = useState(1);
  const [buttonSize, setButtonSize] = useState(1);
  const [voiceGuideEnabled, setVoiceGuideEnabled] = useState(true);
  const [volume, setVolume] = useState(1);

  return (
    <AccessibilityContext.Provider value={{ highContrast, setHighContrast, textSize, setTextSize, buttonSize, setButtonSize, voiceGuideEnabled, setVoiceGuideEnabled, volume, setVolume }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
};

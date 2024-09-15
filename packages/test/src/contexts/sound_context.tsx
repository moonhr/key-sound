import React, { createContext, useState, useContext } from "react";
import { SoundButton } from "../../static/sound_button_interface";

// SoundContext 타입 정의
interface SoundContextType {
  sounds: SoundButton[];
  currentSound: SoundButton | null;
  addSound: (sound: SoundButton) => void;
  setCurrentSound: (sound: SoundButton) => void;
  replaceSound: (oldSound: SoundButton, newSound: SoundButton) => void;
}

// SoundContext 생성 및 기본값 설정
const SoundContext = createContext<SoundContextType | undefined>(undefined);

// SoundProvider 컴포넌트 정의
export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sounds, setSounds] = useState<SoundButton[]>([]);
  const [currentSound, setCurrentSound] = useState<SoundButton | null>(null);

  const addSound = (sound: SoundButton) => {
    setSounds((prevSounds) => [...prevSounds, sound]);
  };

  const replaceSound = (oldSound: SoundButton, newSound: SoundButton) => {
    setSounds((prevSounds) =>
      prevSounds.map((sound) => (sound.id === oldSound.id ? newSound : sound))
    );
  };

  return (
    <SoundContext.Provider
      value={{ sounds, currentSound, addSound, setCurrentSound, replaceSound }}
    >
      {children}
    </SoundContext.Provider>
  );
};

// useSoundContext 훅 정의
export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSoundContext must be used within a SoundProvider");
  }
  return context;
};

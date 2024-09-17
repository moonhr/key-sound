import React, { createContext, useState, useContext, ReactNode } from "react";
import { SoundButton } from "../../static/sound_button_interface";

interface SoundContextType {
  sounds: SoundButton[]; // 사운드 버튼 배열을 저장
  currentSound: SoundButton | null; // 현재 선택된 사운드를 저장
  addSound: (sound: SoundButton) => void; // 새로운 사운드를 추가하는 함수
  setCurrentSound: (sound: SoundButton) => void; // 현재 사운드를 설정하는 함수
  replaceSound: (oldSound: SoundButton, newSound: SoundButton) => void; // 기존 사운드를 새 사운드로 교체하는 함수
}

interface SoundProviderProps {
  children: ReactNode; // 이 컨텍스트에 둘러싸인 자식 요소들
  initialSounds: SoundButton[]; // 초기 사운드 데이터를 전달하는 용도
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<SoundProviderProps> = ({
  children,
  initialSounds,
}) => {
  const [sounds, setSounds] = useState<SoundButton[]>(initialSounds);
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

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSoundContext must be used within a SoundProvider");
  }
  return context;
};

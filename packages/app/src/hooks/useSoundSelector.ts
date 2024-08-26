// useSoundSelector.ts
"use client";
import { useState } from "react";
import axios from "axios";

export interface UseSoundSelectorProps {
  soundApiEndpoint: string;
}

export const useSoundSelector = ({
  soundApiEndpoint,
}: UseSoundSelectorProps) => {
  const [selectedSound, setSelectedSound] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isCached, setIsCached] = useState<boolean>(false);

  // 사운드를 선택했을 때 실행되는 함수
  const handleSelectSound = async (soundName: string) => {
    setSelectedSound(soundName);

    // 사운드 캐싱 확인
    const cachedSound = localStorage.getItem(soundName);

    if (cachedSound) {
      // 사운드가 캐싱되어 있다면 오디오 객체 생성
      setAudio(new Audio(cachedSound));
      setIsCached(true);
    } else {
      // 캐싱된 사운드가 없을 경우 API 요청
      try {
        console.log("사운드 요청");
        const response = await axios.get(`${soundApiEndpoint}/${soundName}`, {
          responseType: "blob",
        });
        const soundBlob = response.data;
        const soundUrl = URL.createObjectURL(soundBlob);

        // 사운드를 localStorage에 저장 (캐싱)
        localStorage.setItem(soundName, soundUrl);

        // 오디오 객체 생성
        setAudio(new Audio(soundUrl));
        setIsCached(true);
      } catch (error) {
        console.error("Error fetching sound:", error);
      }
    }
  };

  // 키 입력 시 사운드를 재생하는 함수
  const handlePlaySound = () => {
    if (isCached && audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  return {
    selectedSound,
    handleSelectSound,
    handlePlaySound,
  };
};

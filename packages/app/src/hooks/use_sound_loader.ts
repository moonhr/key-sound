// useSoundLoader.ts
// 사운드를 로드하고 캐싱하는 기능을 전담.
"use client";
import { useState } from "react";
import axios from "axios";

export interface UseSoundLoaderProps {
  soundApiEndpoint: string;
}

export const useSoundLoader = ({ soundApiEndpoint }: UseSoundLoaderProps) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isCached, setIsCached] = useState<boolean>(false);

  const loadSound = async (soundName: string) => {
    const cachedSound = localStorage.getItem(soundName);

    if (cachedSound) {
      setAudio(new Audio(cachedSound));
      setIsCached(true);
    } else {
      try {
        const response = await axios.get(`${soundApiEndpoint}/${soundName}`, {
          responseType: "blob",
        });
        const soundBlob = response.data;
        const soundUrl = URL.createObjectURL(soundBlob);
        localStorage.setItem(soundName, soundUrl);
        setAudio(new Audio(soundUrl));
        setIsCached(true);
      } catch (error) {
        console.error("Error fetching sound:", error);
      }
    }
  };

  return {
    audio,
    isCached,
    loadSound,
  };
};

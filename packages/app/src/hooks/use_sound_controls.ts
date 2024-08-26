// useSoundControls.ts
"use client";

import { useState } from "react";

export const useSoundControls = () => {
  const [volume, setVolume] = useState<number>(1); // 기본 음량은 1 (최대)
  const [pitch, setPitch] = useState<number>(1); // 기본 피치는 1 (원래 속도)

  // 음량 조절 함수
  const adjustVolume = (audio: HTMLAudioElement, newVolume: number) => {
    audio.volume = newVolume; // 0.0 ~ 1.0 범위
  };

  // 피치 조절 함수
  const adjustPitch = (audio: HTMLAudioElement, newPitch: number) => {
    audio.playbackRate = newPitch; // 0.5 ~ 2.0 범위 (원래 속도의 0.5배에서 2배까지)
  };

  return {
    volume,
    setVolume,
    pitch,
    setPitch,
    adjustVolume,
    adjustPitch,
  };
};

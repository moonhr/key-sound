"use client";

import { useState } from "react";
import * as Tone from "tone";

export const useSoundControls = () => {
  const [volume, setVolume] = useState<number>(1); // 기본 음량은 1 (최대)
  const [pitch, setPitch] = useState<number>(1); // 기본 피치는 1 (원래 속도)

  // 음량 조절 함수
  const adjustVolume = (player: Tone.Player, newVolume: number) => {
    player.volume.value = newVolume * 10 - 10; // Tone.js 볼륨은 -100 ~ 0 범위
  };

  // 피치 조절 함수
  const adjustPitch = (player: Tone.Player, newPitch: number) => {
    player.playbackRate = newPitch; // 0.5 ~ 2.0 범위 (원래 속도의 0.5배에서 2배까지)
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

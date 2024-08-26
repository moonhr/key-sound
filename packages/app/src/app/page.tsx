// Home.tsx
"use client";

import React, { useState, useCallback, useEffect } from "react";
import SoundSelector from "@/components/sound_selector";
import { API_ENDPOINTS } from "@/ts/end_point";
import { useSoundLoader } from "@/hooks/use_sound_loader";
import { useSoundControls } from "@/hooks/use_sound_controls";

export default function Home() {
  const [selectedSound, setSelectedSound] = useState<string | null>(null);
  const { audio, isCached, loadSound } = useSoundLoader({
    soundApiEndpoint: API_ENDPOINTS.SOUND,
  });
  const { volume, setVolume, pitch, setPitch, adjustVolume, adjustPitch } =
    useSoundControls();

  // 페이지 새로고침 시 로컬 스토리지를 비우는 useEffect 훅
  useEffect(() => {
    localStorage.clear();
  }, []);

  const onSelectSound = useCallback(
    (soundName: string) => {
      setSelectedSound(soundName);
      loadSound(soundName);
    },
    [loadSound]
  );

  const handlePlaySound = useCallback(() => {
    if (isCached && audio) {
      audio.currentTime = 0;
      audio.play();
      adjustVolume(audio, volume); // 볼륨 조절
      adjustPitch(audio, pitch); // 피치 조절
    }
  }, [audio, isCached, adjustVolume, adjustPitch, pitch, volume]);

  // 오디오가 선택되면 키보드 입력으로 사운드 재생
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedSound) {
        handlePlaySound();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedSound, handlePlaySound]);

  return (
    <div>
      <h1>사운드 선택</h1>
      <SoundSelector
        soundName="office-keyboard"
        onSelectSound={onSelectSound}
      />
      <SoundSelector soundName="Boom Short" onSelectSound={onSelectSound} />
      <SoundSelector
        soundName="Cartoon Walking Sound"
        onSelectSound={onSelectSound}
      />
      <SoundSelector soundName="iphone" onSelectSound={onSelectSound} />

      {/* 음량 조절 슬라이더 */}
      <div>
        <label htmlFor="volume">Volume: {Math.round(volume * 100)}%</label>
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>

      {/* 피치 조절 슬라이더 */}
      <div>
        <label htmlFor="pitch">Pitch: {pitch.toFixed(2)}</label>
        <input
          type="range"
          id="pitch"
          min="0.5"
          max="10"
          step="0.01"
          value={pitch}
          onChange={(e) => setPitch(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}

// Home.tsx
"use client";

import React, { useState, useCallback, useEffect } from "react";
import SoundSelector from "@/components/sound_selector";
import { API_ENDPOINTS } from "@/ts/end_point";
import { useSoundLoader } from "@/hooks/use_sound_loader";
import { useSoundControls } from "@/hooks/use_sound_controls";
import * as Tone from "tone";

export default function Home() {
  const [selectedSound, setSelectedSound] = useState<string | null>(null);
  const [player, setPlayer] = useState<Tone.Player | null>(null);

  const { audio, isCached, loadSound } = useSoundLoader({
    soundApiEndpoint: API_ENDPOINTS.SOUND,
  });
  const { volume, setVolume, pitch, setPitch, adjustVolume, adjustPitch } =
    useSoundControls();

  // 페이지 새로고침 시 로컬 스토리지를 비우는 useEffect 훅
  useEffect(() => {
    localStorage.clear();
  }, []);

  // 오디오 로딩 및 피치, 음량 설정
  useEffect(() => {
    if (selectedSound) {
      const newPlayer = new Tone.Player(selectedSound).toDestination();

      newPlayer
        .load()
        .then(() => {
          // 파일 로드가 완료되면 음량과 피치 설정
          adjustVolume(newPlayer, volume);
          adjustPitch(newPlayer, pitch);
          setPlayer(newPlayer);
        })
        .catch((error) => {
          console.error("Error loading audio file:", error);
        });
    }
  }, [selectedSound, volume, pitch, adjustVolume, adjustPitch]);

  const onSelectSound = useCallback(
    (soundName: string) => {
      setSelectedSound(soundName);
      loadSound(soundName);
    },
    [loadSound]
  );

  const handlePlaySound = useCallback(() => {
    console.log(player);
    if (player) {
      console.log(player);
      player.start();
      adjustVolume(player, volume); // 볼륨 조절
      adjustPitch(player, pitch); // 피치 조절
    }
  }, [player, adjustVolume, adjustPitch, pitch, volume]);

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

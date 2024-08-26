"use client";

import React, { useState, useCallback, useEffect } from "react";
import FileUploader from "@/components/file_uploader";
import SoundSelector from "@/components/sound_selector";
import VolumeControl from "@/components/volume_control";
import PitchControl from "@/components/pitch_control";
import { SoundSelectorPropsInterface } from "@/ts/interface/sound_selector_props";
import { API_ENDPOINTS } from "@/ts/end_point";
import { useSoundLoader } from "@/hooks/use_sound_loader";

export default function SoundPlayer() {
  const [selectedSound, setSelectedSound] = useState<string | null>(null);
  const [uploadedSoundUrl, setUploadedSoundUrl] = useState<string | null>(null);
  const [volume, setVolume] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(1);
  const { audio, isCached, loadSound } = useSoundLoader({
    soundApiEndpoint: API_ENDPOINTS.SOUND,
  });

  // 파일 업로드 시 URL 처리
  const handleFileUpload = useCallback((url: string) => {
    setUploadedSoundUrl(url);
    setSelectedSound(null); // 업로드된 파일로 사운드 선택 초기화
  }, []);

  // 사운드 선택 시 로드
  const onSelectSound = useCallback(
    (soundName: string) => {
      setSelectedSound(soundName);
      loadSound(soundName); // 사운드 로드
    },
    [loadSound]
  );

  // 사운드 재생 함수
  const handlePlaySound = useCallback(() => {
    const audioUrl =
      uploadedSoundUrl || (isCached && audio?.src) || selectedSound;
    if (audioUrl) {
      const audioElement = new Audio(audioUrl);
      audioElement.volume = volume;
      audioElement.playbackRate = pitch;
      audioElement.currentTime = 0;
      audioElement.play();
    }
  }, [uploadedSoundUrl, audio, isCached, selectedSound, volume, pitch]);

  // 키보드 입력에 따른 사운드 재생
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handlePlaySound();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePlaySound]);

  // SoundSelectorPropsInterface 배열
  const soundOptions: SoundSelectorPropsInterface[] = [
    { soundName: "black-key", onSelectSound: setSelectedSound },
    { soundName: "blue-key", onSelectSound: setSelectedSound },
    { soundName: "boom-short", onSelectSound: setSelectedSound },
    { soundName: "brown-key", onSelectSound: setSelectedSound },
    { soundName: "cartoon-walking-sound", onSelectSound: setSelectedSound },
    { soundName: "catoon-duck", onSelectSound: setSelectedSound },
    { soundName: "iphone", onSelectSound: setSelectedSound },
    { soundName: "low-noise-brown-key", onSelectSound: setSelectedSound },
    { soundName: "magic-wand", onSelectSound: setSelectedSound },
    { soundName: "mario-jumping-sound", onSelectSound: setSelectedSound },
    { soundName: "office-keyboard", onSelectSound: setSelectedSound },
    { soundName: "red-key", onSelectSound: setSelectedSound },
    { soundName: "shoot-arrow-sound", onSelectSound: setSelectedSound },
  ];
  return (
    <div>
      <h1>사운드 선택 및 업로드</h1>

      <FileUploader onFileUpload={handleFileUpload} />
      {uploadedSoundUrl && (
        <button onClick={handlePlaySound}>Play Uploaded Sound</button>
      )}

      <div className="p-10">
        {soundOptions.map(({ soundName }) => (
          <SoundSelector
            key={soundName}
            soundName={soundName}
            onSelectSound={onSelectSound}
          />
        ))}
      </div>
      <VolumeControl volume={volume} onVolumeChange={setVolume} />
      <PitchControl pitch={pitch} onPitchChange={setPitch} />
    </div>
  );
}

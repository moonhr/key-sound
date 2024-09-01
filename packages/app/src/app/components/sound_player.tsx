"use client";

import React, { useState, useCallback, useEffect } from "react";
// import FileUploader from "@/components/file_uploader";
import SoundSelector from "@/components/sound_selector";
import VolumeControl from "@/components/volume_control";
import PitchControl from "@/components/pitch_control";
import { SoundSelectorPropsInterface } from "@/ts/interface/sound_selector_props";
import { API_ENDPOINTS } from "@/ts/end_point";
import { useSoundLoader } from "@/hooks/use_sound_loader";
import { soundOptions } from "@/static/sound_options";

interface SoundPlayerProp {
  className?: string;
}

export default function SoundPlayer({ className }: SoundPlayerProp) {
  const [selectedSound, setSelectedSound] = useState<string | null>(null);
  const [uploadedSoundUrl, setUploadedSoundUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null); // 업로드된 파일명을 저장할 상태
  const [volume, setVolume] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(1);
  const { audio, isCached, loadSound } = useSoundLoader({
    soundApiEndpoint: API_ENDPOINTS.SOUND,
  });

  useEffect(() => {
    localStorage.clear();
  }, []);

  // 파일 업로드 시 URL 처리
  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        // 파일 타입 및 크기 제한
        if (file.type !== "audio/mpeg" || file.size > 300 * 1024) {
          alert("지원되지 않는 파일 형식이거나 파일 크기가 너무 큽니다.");
          console.log(file.type);
          console.log(file.size);
          return;
        }
        const url = URL.createObjectURL(file);
        setUploadedSoundUrl(url);
        setUploadedFileName(file.name);
        console.log(file.name);
        localStorage.setItem(file.name, url);
        setSelectedSound(null);
      }
    },
    []
  );

  // 사운드 선택 시 로드
  const onSelectSound = useCallback(
    (soundName: string) => {
      setSelectedSound(soundName);
      loadSound(soundName); // 사운드 로드
      setUploadedFileName(null);
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
    const handleKeyDown = () => {
      handlePlaySound();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePlaySound]);

  return (
    <div className={className}>
      {/* 파일 업로드 버튼 */}
      <input
        type="file"
        onChange={handleFileUpload}
        accept="audio/mp3"
        placeholder="파일업로드"
      />

      <div className="">
        <div className="p-3 grid grid-cols-8 grid-rows-5 gap-5 justify-center items-center ">
          {soundOptions.map((soundName) => (
            <SoundSelector
              key={soundName}
              soundName={soundName}
              onSelectSound={onSelectSound}
              className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 hover:bg-cyan-300"
            />
          ))}
        </div>
        {/* 사용자가 추가한 효과음 */}
        {uploadedSoundUrl ? (
          <button className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 hover:bg-cyan-300">{`추가된 효과음: ${uploadedFileName}`}</button>
        ) : null}
        <VolumeControl volume={volume} onVolumeChange={setVolume} />
        <PitchControl pitch={pitch} onPitchChange={setPitch} />
      </div>
    </div>
  );
}

"use client";
import React from "react";
import SoundSelector from "@/components/sound_selector";
import Textarea from "@/components/textarea";
import { API_ENDPOINTS } from "@/ts/end_point";
import { useSoundSelector } from "@/hooks/useSoundSelector";

export default function Home() {
  const { selectedSound, handleSelectSound, handlePlaySound } =
    useSoundSelector({
      soundApiEndpoint: API_ENDPOINTS.SOUND,
    });

  return (
    <>
      <div>사운드 선택</div>
      <SoundSelector
        soundName="office-keyboard"
        onSelectSound={handleSelectSound}
      />
      <SoundSelector soundName="Boom Short" onSelectSound={handleSelectSound} />
      <SoundSelector
        soundName="Cartoon Walking Sound"
        onSelectSound={handleSelectSound}
      />
      <SoundSelector soundName="iphone" onSelectSound={handleSelectSound} />

      <Textarea soundName={selectedSound} onPlaySound={handlePlaySound} />
    </>
  );
}

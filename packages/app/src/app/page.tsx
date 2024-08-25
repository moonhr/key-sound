import React from "react";
import SoundSelector from "@/components/sound_selector";
import { API_ENDPOINTS } from "@/ts/end_point";

export default function Home() {
  return (
    <>
      <div>사운드 선택</div>
      <SoundSelector
        soundName="office-keyboard"
        soundApiEndpoint={API_ENDPOINTS.SOUND}
      />
      <SoundSelector
        soundName="Boom Short"
        soundApiEndpoint={API_ENDPOINTS.SOUND}
      />
      <SoundSelector
        soundName="Cartoon Walking Sound"
        soundApiEndpoint={API_ENDPOINTS.SOUND}
      />  
      <SoundSelector
        soundName="iphone"
        soundApiEndpoint={API_ENDPOINTS.SOUND}
      />
    </>
  );
}

// pages/Home.tsx
"use client";

import React, { useEffect } from "react";
import SoundPlayer from "./components/sound_player";

export default function Home() {
  // 페이지 새로고침 시 로컬 스토리지를 비우는 useEffect 훅
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div>
      <SoundPlayer />
    </div>
  );
}

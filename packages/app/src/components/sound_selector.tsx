// SoundSelector.tsx
"use client";

import React from "react";
import { SoundSelectorPropsInterface } from "@/ts/interface/sound_selector_props";

const SoundSelector: React.FC<SoundSelectorPropsInterface> = ({
  soundName,
  onSelectSound,
  className,
}) => {
  // 버튼 클릭 시 선택된 사운드를 상위 컴포넌트에 전달
  const handleSelectSound = () => {
    onSelectSound(soundName);
  };

  return (
    <button onClick={handleSelectSound} className={className}>
      {soundName}
    </button>
  );
};

export default SoundSelector;

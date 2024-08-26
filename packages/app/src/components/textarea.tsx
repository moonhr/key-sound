// SoundPlayer.tsx
"use client";

import React from "react";
import { TextareaProps } from "@/ts/interface/textarea_props";

const Textarea: React.FC<TextareaProps> = ({ soundName, onPlaySound }) => {
  return (
    <div>
      <div>현재 소리 : {soundName}</div>
      {soundName ? (
        <textarea
          placeholder={`키보드 입력 - ${soundName}`}
          onKeyDown={onPlaySound}
        />
      ) : (
        <textarea placeholder="사운드를 선택하세요" disabled />
      )}
    </div>
  );
};

export default Textarea;

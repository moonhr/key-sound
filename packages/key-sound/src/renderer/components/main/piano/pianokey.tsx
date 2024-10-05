// PianoKey.tsx
import React from "react";
import "../../../style/piano.css";

interface PianoKeyProps {
  keyName: string;
  isActive: boolean;
  onKeyDown: () => void;
}

const PianoKey: React.FC<PianoKeyProps> = ({
  keyName,
  isActive,
  onKeyDown,
}) => {
  return (
    <div
      className={`${keyName === ";" ? "semicolon" : ""} ${keyName} piano-key ${
        isActive ? "active" : ""
      }`} // 눌린 키에 대한 스타일 적용
      onClick={onKeyDown} // 마우스 클릭으로도 사운드 재생
    >
      <p className="font-press-start piano-text">{keyName.toUpperCase()}</p>
    </div>
  );
};

export default PianoKey;

// PianoKey.tsx
import React from "react";

interface PianoKeyProps {
  keyName: string; // 키 이름 (a, s, d 등)
  isActive: boolean; // 현재 눌린 상태
  onKeyDown: () => void; // 키가 눌릴 때 호출되는 함수
}

const PianoKey: React.FC<PianoKeyProps> = ({
  keyName,
  isActive,
  onKeyDown,
}) => {
  return (
    <div
      className={`piano-key ${isActive ? "active" : ""}`} // 눌린 키에 대한 스타일 적용
      onClick={onKeyDown} // 마우스 클릭으로도 사운드 재생
    >
      {keyName.toUpperCase()}
    </div>
  );
};

export default PianoKey;

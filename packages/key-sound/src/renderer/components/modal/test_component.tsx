import React, { useState, useEffect, useRef } from "react";
import { staticData } from "../../../static/staticData";

interface TestComponentProps {
  onSaveKeySound: (key: string) => void; // 부모 컴포넌트로 선택한 키를 전달하기 위한 prop
}

const TestComponent: React.FC<TestComponentProps> = ({ onSaveKeySound }) => {
  const [isActive, setIsActive] = useState<string | null>(null);
  const [currentKey, setCurrentKey] = useState<string>("Standard Key");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 키보드 입력 처리
  const handleKeyPress = (event: KeyboardEvent) => {
    const pressedKey = event.key; // 눌린 키의 이름 가져오기
    const soundKey = staticData[pressedKey]; // 눌린 키와 매핑된 사운드 가져오기

    if (soundKey) {
      console.log(`Key pressed: ${pressedKey}`);
      if (audioRef.current) {
        audioRef.current.pause(); // 이전 오디오 멈추기
      }

      // 새로운 오디오 객체 생성 및 재생
      audioRef.current = new Audio(staticData[pressedKey].soundFile);
      audioRef.current.play();
    }
  };

  useEffect(() => {
    // 키보드 이벤트 리스너 등록
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      // 컴포넌트 언마운트 시 키보드 이벤트 리스너 제거
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleClick = (key: string) => {
    setIsActive(key);
    setCurrentKey(key);

    // 새로운 오디오 객체 생성 및 재생
    if (audioRef.current) {
      audioRef.current.pause(); // 이전 오디오 멈추기
    }

    audioRef.current = new Audio(staticData[key].soundFile);
    audioRef.current.play();

    setTimeout(() => setIsActive(null), 200);
  };

  const handleSave = () => {
    if (isActive) {
      onSaveKeySound(isActive);
    }
    console.log(`Saved sound for key: ${isActive}`);
  };

  if (Object.keys(staticData).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {Object.entries(staticData).map(([key, item]) => (
        <div key={key} onClick={() => handleClick(key)}>
          <img
            src={isActive === key ? item.activeSvg : item.svg}
            alt={item.name}
          />
        </div>
      ))}
      <p>Current selected sound: {currentKey}</p>
      <button onClick={handleSave}>Save</button> {/* Save 버튼 추가 */}
    </div>
  );
};

export default TestComponent;

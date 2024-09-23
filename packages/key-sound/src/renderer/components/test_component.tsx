import React, { useState, useEffect, useRef } from "react";
import { staticData } from "../../static/staticData";

const TestComponent = () => {
  const [isActive, setIsActive] = useState<string | null>(null);
  const [currentKey, setCurrentKey] = useState<string>("Standard Key");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 현재 선택된 키에 해당하는 오디오 객체 생성
    audioRef.current = new Audio(staticData[currentKey].soundFile);

    const handleKeyPress = (event: any, pressedKey: string) => {
      console.log(`Key pressed: ${pressedKey}`);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    };

    // IPC 리스너 설정
    window.electron.ipcRenderer.on("key-pressed", handleKeyPress);

    return () => {
      // 컴포넌트 언마운트 시 IPC 리스너 제거
      window.electron.ipcRenderer.removeListener("key-pressed", handleKeyPress);
      // 오디오 객체 정리
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentKey]);

  const handleClick = (key: string) => {
    setIsActive(key);
    setCurrentKey(key);

    // 새로운 오디오 객체 생성 및 재생
    audioRef.current = new Audio(staticData[key].soundFile);
    audioRef.current.play();

    setTimeout(() => setIsActive(null), 200);
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
    </div>
  );
};

export default TestComponent;

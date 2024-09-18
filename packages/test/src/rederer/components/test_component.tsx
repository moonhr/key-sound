import React, { useState, useEffect, useRef } from "react";
import { staticData } from "../../static/staticData";

const { ipcRenderer } = window.require("electron"); // Electron IPC 모듈 사용

// 현재 선택된 소리를 저장하는 전역 상태
let currentAudio = new Audio(staticData[0].soundFile);

export const TestComponent = () => {
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef(currentAudio);

  useEffect(() => {
    // main 프로세스에서 키 입력 이벤트 받기
    ipcRenderer.on("key-pressed", (event, key) => {
      console.log(`Key pressed: ${key}`);
      currentAudio.currentTime = 0; // 매번 처음부터 재생
      currentAudio.play();
    });

    return () => {
      ipcRenderer.removeAllListeners("key-pressed");
    };
  }, []);

  // 키보드 이벤트 설정
  useEffect(() => {
    const handleKeydown = () => {
      currentAudio.currentTime = 0; // 매번 처음부터 재생
      currentAudio.play();
    };
    // 모든 키 입력에 대해 이벤트 리스너 등록
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const handleClick = () => {
    setIsActive(true);

    // 버튼이 클릭될 때 현재 소리를 바꿈
    currentAudio.pause();
    currentAudio = new Audio(staticData[0].soundFile);
    audioRef.current = currentAudio;
    currentAudio.play();
    setTimeout(() => setIsActive(false), 200); // 200ms 후에 버튼 상태 초기화
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <img
        src={isActive ? staticData[0].activeSvg : staticData[0].svg}
        alt={staticData[0].name}
        style={{ width: "100px", height: "100px" }} // 크기 조정
      />
    </div>
  );
};

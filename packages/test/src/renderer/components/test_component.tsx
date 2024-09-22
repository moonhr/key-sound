import React, { useState, useEffect, useRef } from "react";
import { staticData } from "../../static/staticData";

const TestComponent = () => {
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef(new Audio(staticData[0].soundFile)); // 초기 오디오 객체

  useEffect(() => {
    const handleKeyPress = (event: any, key: string) => {
      console.log(`Key pressed globally: ${key}`);
      if (audioRef.current) {
        audioRef.current.currentTime = 0; // 매번 처음부터 재생
        audioRef.current.play();
      }
    };

    window.electron.ipcRenderer.on("key-pressed", handleKeyPress); // preload를 통한 ipcRenderer 접근

    return () => {
      window.electron.ipcRenderer.removeListener("key-pressed", handleKeyPress); // 이벤트 해제
    };
  }, []);

  const handleClick = () => {
    setIsActive(true);

    // 버튼이 클릭될 때 현재 소리를 바꿈
    if (audioRef.current) {
      audioRef.current.pause(); // 이전 오디오 중지
      audioRef.current = new Audio(staticData[0].soundFile); // 새로운 오디오로 교체
      audioRef.current.play(); // 새로운 오디오 재생
    }

    // 200ms 후에 버튼 상태 초기화
    setTimeout(() => setIsActive(false), 200);
  };

  if (!staticData.length) {
    return <div>Loading...</div>; // 데이터가 로딩 중일 때
  }

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

export default TestComponent;

import React, { useEffect, useRef } from "react";
import { useKeycap } from "../../../contexts/keycap_context"; // keycap 상태 불러오기

const whiteKeys = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const blackKeys = ["w", "e", "t", "y", "u", "o", "p"];

const Piano = () => {
  const { selectedSound } = useKeycap(); // 선택된 사운드 가져오기
  const audioRef = useRef<HTMLAudioElement | null>(null);
  console.log("piano selectedSound", selectedSound);

  const playSound = (key: string) => {
    if (audioRef.current) {
      audioRef.current.pause(); // 이전 사운드 멈추기
    }

    if (selectedSound) {
      // keyof를 사용하여 selectedSound에서 사운드 URL 가져오기
      const soundUrl = selectedSound;
      if (soundUrl) {
        audioRef.current = new Audio(soundUrl);
        audioRef.current.play();
      }
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const pressedKey = event.key.toLowerCase(); // 눌린 키
    console.log("눌림");
    console.log(event.key);
    if (whiteKeys.includes(pressedKey) || blackKeys.includes(pressedKey)) {
      playSound(pressedKey); // 흰건반 또는 검은건반이면 사운드 재생
    }
  };

  useEffect(() => {
    // 키보드 이벤트 리스너 등록
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedSound]);

  return (
    <div>
      <p>
        키보드를 사용하여 피아노를 연주하세요! (a-s-d-f-g-h-j-k-l 및
        w-e-t-y-u-o-p)
      </p>
    </div>
  );
};

export default Piano;

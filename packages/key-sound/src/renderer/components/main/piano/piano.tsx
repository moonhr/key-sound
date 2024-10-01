import React, { useEffect, useState, useRef } from "react";
import { useKeycap } from "../../../contexts/keycap_context"; // keycap 상태 불러오기
import "../../../style/piano.css";
import keyPitchMap from "./keyPitchMap";

const Piano = () => {
  const { selectedSound } = useKeycap(); // 선택된 사운드 가져오기
  const audioContextRef = useRef<AudioContext | null>(null); // AudioContext 참조
  const [activeKeys, setActiveKeys] = useState<string[]>([]); // 현재 눌린 키 저장

  // 오디오 버퍼를 로드하는 함수
  const loadSound = async (url: string) => {
    if (!audioContextRef.current) return;

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContextRef.current.decodeAudioData(
      arrayBuffer
    );

    return audioBuffer;
  };

  // 사운드 재생 함수
  const playSound = async (key: string) => {
    if (!selectedSound) return; // 사운드가 없으면 종료

    // AudioContext가 없다면 새로 생성
    if (
      !audioContextRef.current ||
      audioContextRef.current.state === "closed"
    ) {
      audioContextRef.current = new AudioContext();
    } else if (audioContextRef.current.state === "suspended") {
      // 상태가 suspended인 경우 resume() 호출
      await audioContextRef.current.resume();
    }

    const audioContext = audioContextRef.current;

    // 오디오 버퍼 로드
    const audioBuffer = await loadSound(selectedSound);
    if (!audioBuffer) return;

    // AudioBufferSourceNode 생성
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;

    // 피치 조절: playbackRate를 사용하여 피치를 조정
    const frequency = keyPitchMap[key]; // key에 맞는 주파수 가져오기
    const baseFrequency = 261.63; // C4(도)의 주파수
    const playbackRate = frequency / baseFrequency; // 주파수를 재생 속도로 변환

    // 재생 속도 설정 (피치 조정)
    source.playbackRate.value = playbackRate;

    // 소스를 AudioContext의 destination에 연결
    source.connect(audioContext.destination);

    // 사운드 재생
    source.start();

    // 눌린 키 배열에 추가
    setActiveKeys((prevKeys) => [...prevKeys, key]);

    // 눌린 키 배열에서 해당 키를 200ms 후에 제거
    setTimeout(() => {
      setActiveKeys((prevKeys) => prevKeys.filter((k) => k !== key));
    }, 200);
  };

  // 키보드 입력 처리
  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    console.log(key);
    if (keyPitchMap[key]) {
      playSound(key); // key에 맞는 피치로 사운드 재생
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (audioContextRef.current) {
        audioContextRef.current.close(); // AudioContext 종료
      }
    };
  }, [selectedSound]);

  return (
    <div>
      <p>
        키보드를 사용하여 피아노를 연주하세요! (a-s-d-f-g-h-j-k-l 및
        w-e-t-y-u-o-p)
      </p>
      <div className="piano-keys">
        {/* 눌린 키에 따라 스타일 적용 */}
        {Object.keys(keyPitchMap).map((key) => (
          <div
            key={key}
            className={`piano-key ${activeKeys.includes(key) ? "active" : ""}`}
          >
            {key.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Piano;

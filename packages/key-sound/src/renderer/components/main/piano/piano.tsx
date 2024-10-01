import React, { useEffect, useState, useRef } from "react";
import { useKeycap } from "../../../contexts/keycap_context"; // keycap 상태 불러오기
import "../../../style/piano.css";
import keyPitchMap from "./keyPitchMap";
import PianoKey from "./pianokey";
import Playbar from "../playbar/playbar";

const Piano = () => {
  const { selectedSound } = useKeycap(); // 선택된 사운드 가져오기
  const audioContextRef = useRef<AudioContext | null>(null); // AudioContext 참조
  const [activeKeys, setActiveKeys] = useState<string[]>([]); // 현재 눌린 키 저장
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]); // 녹음된 청크 저장

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
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    } else if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    const audioContext = audioContextRef.current;
    const audioBuffer = await loadSound(selectedSound);
    if (!audioBuffer) return;

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;

    const frequency = keyPitchMap[key];
    const baseFrequency = 261.63; // C4(도)의 주파수
    const playbackRate = frequency / baseFrequency;
    source.playbackRate.value = playbackRate;

    // 소스를 AudioContext의 destination에 연결
    source.connect(audioContext.destination);

    // 사운드 재생
    source.start();

    setActiveKeys((prevKeys) => [...prevKeys, key]);
    setTimeout(() => {
      setActiveKeys((prevKeys) => prevKeys.filter((k) => k !== key));
    }, 200);
  };

  // 녹음 시작
  const startRecording = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const destination = audioContextRef.current.createMediaStreamDestination();
    const recorder = new MediaRecorder(destination.stream);

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);
      // 여기서 blob을 사용하여 파일을 저장하거나 다운로드 링크를 생성할 수 있습니다.
    };

    // 녹음을 시작합니다.
    recorder.start();
    setMediaRecorder(recorder);
  };

  // 녹음 중지
  const stopRecording = () => {
    mediaRecorder?.stop();
    setMediaRecorder(null);
  };

  // 키보드 입력 처리
  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    if (keyPitchMap[key]) {
      playSound(key);
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
        {Object.keys(keyPitchMap).map((key) => (
          <PianoKey
            key={key}
            keyName={key}
            isActive={activeKeys.includes(key)}
            onKeyDown={() => playSound(key)}
          />
        ))}
      </div>
      <Playbar startRecording={startRecording} stopRecording={stopRecording} />
    </div>
  );
};

export default Piano;

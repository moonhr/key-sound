import React, { useEffect, useState, useRef } from "react";
import { useKeycap } from "../../../contexts/keycap_context"; // keycap 상태 불러오기
import keyPitchMap from "./keyPitchMap";
import PianoKey from "./pianokey";
import Playbar from "../playbar/playbar";
import Stopbar from "../playbar/stopbar";

const Piano = () => {
  const { selectedSound } = useKeycap(); // 선택된 사운드 가져오기
  const audioContextRef = useRef<AudioContext | null>(null); // AudioContext 참조
  const [activeKeys, setActiveKeys] = useState<string[]>([]); // 현재 눌린 키 저장
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const recordedChunksRef = useRef<Blob[]>([]); // 녹음된 청크 저장
  const [isRecording, setIsRecording] = useState(false); // 녹음 상태 저장

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

    // 사운드 재생
    source.connect(audioContext.destination);
    source.start();

    // 눌린 키 표시
    setActiveKeys((prevKeys) => [...prevKeys, key]);
    setTimeout(() => {
      setActiveKeys((prevKeys) => prevKeys.filter((k) => k !== key));
    }, 200);
  };

  // 녹음 시작
  const startRecording = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const destination = audioContextRef.current.createMediaStreamDestination();

    // MediaRecorder 지원 여부 확인
    if (!MediaRecorder) {
      console.error("MediaRecorder API is not supported in this environment.");
      return;
    }

    const recorder = new MediaRecorder(destination.stream);
    setMediaRecorder(recorder); // MediaRecorder 상태 설정

    // MediaRecorder 데이터가 준비되면 recordedChunksRef에 추가
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    // 에러 처리
    recorder.onerror = (event) => {
      console.error("Error during recording:", event);
    };

    // 마이크 권한 요청 (사용자에게 권한 요청)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(destination); // 스트림 연결
    } catch (error) {
      console.error("Error accessing microphone:", error);
      return;
    }

    recorder.start(); // 녹음 시작
    setIsRecording(true); // 녹음 상태 변경

    recorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recording.webm"; // 다운로드 파일 이름
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      recordedChunksRef.current = []; // 녹음된 청크 초기화
      setMediaRecorder(null); // MediaRecorder 초기화
      setIsRecording(false); // 녹음 상태 변경
    };
  };

  // 녹음 중지
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop(); // 녹음 중지
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      event.preventDefault(); // 기본 스페이스바 동작 방지
      if (isRecording) {
        stopRecording(); // 녹음 중지
      } else {
        startRecording(); // 녹음 시작
      }
    }

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
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-full h-full mt-4 piano">
        <div className="relative flex items-center justify-center w-[1025px] h-[430px] max-w-[100%]">
          {Object.keys(keyPitchMap).map((key) => (
            <PianoKey
              key={key}
              keyName={key}
              isActive={activeKeys.includes(key)}
              onKeyDown={() => playSound(key)}
            />
          ))}
        </div>
        <div
          className="z-10 w-auto mt-10 text-2xl font-press-start"
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? <Stopbar /> : <Playbar />}
        </div>{" "}
      </div>
    </div>
  );
};

export default Piano;

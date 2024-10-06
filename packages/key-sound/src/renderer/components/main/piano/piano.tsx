import React, { useEffect, useState, useRef, useCallback } from "react";
import { useKeycap } from "../../../contexts/keycap_context";
import keyPitchMap from "./keyPitchMap";
import PianoKey from "./pianokey";
import Playbar from "../playbar/playbar";
import Stopbar from "../playbar/stopbar";

const Piano = () => {
  const { selectedSound } = useKeycap();
  const audioContextRef = useRef<AudioContext | null>(null);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const recordedChunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const currentSoundUrlRef = useRef<string | null>(null);

  // AudioContext 초기화 함수
  const initAudioContext = useCallback(() => {
    if (
      !audioContextRef.current ||
      audioContextRef.current.state === "closed"
    ) {
      audioContextRef.current = new AudioContext();
    } else if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  // 사운드 로드 함수
  const loadSound = useCallback(
    async (url: string) => {
      const audioContext = initAudioContext();
      if (currentSoundUrlRef.current !== url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        audioBufferRef.current = audioBuffer;
        currentSoundUrlRef.current = url;
      }
      return audioBufferRef.current;
    },
    [initAudioContext]
  );

  // 사운드 재생 함수
  const playSound = useCallback(
    async (key: string) => {
      if (!selectedSound) return;

      const audioContext = initAudioContext();
      const audioBuffer = await loadSound(selectedSound);
      if (!audioBuffer) return;

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      const frequency = keyPitchMap[key];
      const baseFrequency = 261.63;
      const playbackRate = frequency / baseFrequency;
      source.playbackRate.value = playbackRate;

      source.connect(audioContext.destination);
      source.start();

      setActiveKeys((prevKeys) => [...prevKeys, key]);
      setTimeout(() => {
        setActiveKeys((prevKeys) => prevKeys.filter((k) => k !== key));
      }, 200);
    },
    [selectedSound, initAudioContext, loadSound]
  );

  // 키 이벤트 핸들러
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        if (isRecording) {
          stopRecording();
        } else {
          startRecording();
        }
      }

      const key = event.key;
      if (keyPitchMap[key]) {
        playSound(key);
      }
    },
    [isRecording, playSound]
  );

  // 녹음 시작 함수
  const startRecording = useCallback(async () => {
    const audioContext = initAudioContext();
    const destination = audioContext.createMediaStreamDestination();

    if (!MediaRecorder) {
      console.error("MediaRecorder API is not supported in this environment.");
      return;
    }

    const recorder = new MediaRecorder(destination.stream);
    setMediaRecorder(recorder);

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    recorder.onerror = (event) => {
      console.error("Error during recording:", event);
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(destination);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      return;
    }

    recorder.start();
    setIsRecording(true);

    recorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recording.webm";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      recordedChunksRef.current = [];
      setMediaRecorder(null);
      setIsRecording(false);
    };
  }, [initAudioContext]);

  // 녹음 중지 함수
  const stopRecording = useCallback(() => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  }, [mediaRecorder]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (selectedSound) {
      loadSound(selectedSound);
    }
  }, [selectedSound, loadSound]);

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
        </div>
      </div>
    </div>
  );
};

export default Piano;

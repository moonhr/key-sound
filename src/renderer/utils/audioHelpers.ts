import { MutableRefObject } from "react";

//* 공통 오디오 유틸리티 함수를 포함

/**
 * AudioContext를 초기화하거나 재개
 * @param audioContextRef
 * @returns
 */
export const initAudioContext = (
  audioContextRef: MutableRefObject<AudioContext | null>
): AudioContext => {
  if (!audioContextRef.current || audioContextRef.current.state === "closed") {
    audioContextRef.current = new AudioContext();
  } else if (audioContextRef.current.state === "suspended") {
    audioContextRef.current.resume();
  }
  return audioContextRef.current;
};

/**
 * 사운드 파일을 로드하고 디코딩
 * @param url
 * @param audioContext
 * @param audioBufferRef
 * @param currentSoundUrlRef
 * @returns
 */
export const loadSound = async (
  url: string,
  audioContext: AudioContext,
  audioBufferRef: MutableRefObject<AudioBuffer | null>,
  currentSoundUrlRef: MutableRefObject<string | null>
): Promise<AudioBuffer | null> => {
  if (currentSoundUrlRef.current !== url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    audioBufferRef.current = audioBuffer;
    currentSoundUrlRef.current = url;
  }
  return audioBufferRef.current;
};

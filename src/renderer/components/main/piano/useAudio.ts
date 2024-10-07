import { useState, useRef, useCallback, useEffect } from "react";
import KEY_PITCH_MAP from "./keyPitchMap";
import { initAudioContext, loadSound } from "../../../utils/audioHelpers";

/**
 * * 훅: 오디오 관련 로직을 담당
 * @param selectedSound 
 * @returns hook
 */
export const useAudio = (selectedSound: string) => {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const currentSoundUrlRef = useRef<string | null>(null);

  const playSound = useCallback(
    async (key: string) => {
      if (!selectedSound) return;

      const audioContext = initAudioContext(audioContextRef);
      const audioBuffer = await loadSound(
        selectedSound,
        audioContext,
        audioBufferRef,
        currentSoundUrlRef
      );
      if (!audioBuffer) return;

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      const frequency = KEY_PITCH_MAP[key];
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
    [selectedSound]
  );

  useEffect(() => {
    if (selectedSound) {
      const audioContext = initAudioContext(audioContextRef);
      loadSound(
        selectedSound,
        audioContext,
        audioBufferRef,
        currentSoundUrlRef
      );
    }
  }, [selectedSound]);

  return { activeKeys, playSound };
};

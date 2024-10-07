import { useState, useRef, useCallback } from "react";
import { initAudioContext } from "../../../utils/audioHelpers";

/**
 * *  훅: 녹음 관련 로직을 담당
 * @returns hook
 */
export const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const recordedChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);

  const startRecording = useCallback(async () => {
    const audioContext = initAudioContext(audioContextRef);
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
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  }, [mediaRecorder]);

  return { isRecording, startRecording, stopRecording };
};

import React, { useRef, useEffect } from "react";
import { useSoundFile } from "../../../contexts/soune_file_context";

const PlayButton: React.FC = () => {
  const { soundFile } = useSoundFile();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let fileUrl: string | null = null;

    if (soundFile) {
      fileUrl = URL.createObjectURL(soundFile);
      if (audioRef.current) {
        audioRef.current.src = fileUrl;
      }
    }

    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [soundFile]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div>
      {/* 올바른 MIME 타입은 audio/mpeg */}
      {soundFile?.type === "audio/mpeg" ? (
        <audio ref={audioRef} controls />
      ) : (
        <p>MP3 파일만 재생할 수 있습니다.</p>
      )}
      <button onClick={handlePlay}>재생</button>
    </div>
  );
};

export default PlayButton;

import React, { useRef, useEffect, useState } from "react";
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
    if (soundFile?.type !== "audio/mpeg") {
      // 파일 타입이 올바르지 않으면 경고창을 표시
      alert("재생할 파일이 없습니다.");
      return;
    }

    if (audioRef.current) {
      audioRef.current.play();
      // 재생 시 에러 메시지를 초기화
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handlePlay}
        className={` ${
          soundFile ? "opacity-100 hover:scale-105" : "opacity-50"
        }`}
      >
        <svg
          width="49"
          height="49"
          viewBox="0 0 49 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.3333 38.7917V10.2083L38.7916 24.5L16.3333 38.7917Z"
            fill="#1D1B20"
          />
        </svg>

        {/* MP3 파일일 경우에만 audio 요소를 렌더링 */}
        {soundFile?.type === "audio/mpeg" && (
          <audio ref={audioRef} controls style={{ display: "none" }} />
        )}
      </button>
    </div>
  );
};

export default PlayButton;

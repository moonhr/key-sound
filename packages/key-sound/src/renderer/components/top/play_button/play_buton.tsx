import React, { useRef, useEffect, useState } from "react";
import { useSoundFile } from "../../../contexts/soune_file_context";

const PlayButton: React.FC = () => {
  const { soundFile } = useSoundFile();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      // 파일 타입이 올바르지 않으면 경고 메시지를 설정
      setErrorMessage("MP3 파일만 재생할 수 있습니다.");
      return;
    }

    if (audioRef.current) {
      audioRef.current.play();
      // 재생 시 에러 메시지를 초기화
      setErrorMessage(null);
    }
  };

  return (
    <div>
      <button
        onClick={handlePlay}
        className={` ${
          soundFile ? "opacity-100 hover:bg-slate-800" : "opacity-50"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="25"
          viewBox="0 0 23 29"
          fill="none"
        >
          <path
            d="M0.333252 28.7917V0.208328L22.7916 14.5L0.333252 28.7917Z"
            fill="#1D1B20"
          />
        </svg>
        {/* 에러 메시지가 있을 때만 표시 */}
        {errorMessage && <p>{errorMessage}</p>}

        {/* MP3 파일일 경우에만 audio 요소를 렌더링 */}
        {soundFile?.type === "audio/mpeg" && (
          <audio ref={audioRef} controls style={{ display: "none" }} />
        )}
      </button>
    </div>
  );
};

export default PlayButton;

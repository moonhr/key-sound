// Playbar.tsx
import React from "react";

interface PlaybarProps {
  startRecording: () => void;
  stopRecording: () => void;
}

const Playbar: React.FC<PlaybarProps> = ({ startRecording, stopRecording }) => {
  return (
    <div>
      <button onClick={startRecording}>녹음 시작</button>
      <button onClick={stopRecording}>녹음 중지</button>
    </div>
  );
};

export default Playbar;

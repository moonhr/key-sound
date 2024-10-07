import React from "react";
import { useKeycap } from "../../../contexts/keycap_context";
import { useAudio } from "./useAudio";
import { useRecording } from "./useRecording";
import PianoKey from "./pianokey";
import Playbar from "../playbar/playbar";
import Stopbar from "../playbar/stopbar";
import KEY_PITCH_MAP from "./keyPitchMap";

const Piano: React.FC = () => {
  const { selectedSound } = useKeycap();
  const { activeKeys, playSound } = useAudio(selectedSound!);
  const { isRecording, startRecording, stopRecording } = useRecording();

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        isRecording ? stopRecording() : startRecording();
      }

      const key = event.key;
      if (KEY_PITCH_MAP[key]) {
        playSound(key);
      }
    },
    [isRecording, playSound, startRecording, stopRecording]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-full h-full mt-4 piano">
        <div className="relative flex items-center justify-center w-[1025px] h-[430px] max-w-[100%]">
          {Object.keys(KEY_PITCH_MAP).map((key) => (
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

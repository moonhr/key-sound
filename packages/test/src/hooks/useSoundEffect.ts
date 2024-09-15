import { useEffect } from "react";
import { useSoundContext } from "../contexts/sound_context";

export const useSoundEffect = () => {
  const { currentSound } = useSoundContext();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (currentSound) {
        const audio = new Audio(currentSound.soundFile);
        audio.play();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentSound]);
};

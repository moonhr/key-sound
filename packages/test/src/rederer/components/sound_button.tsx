import React from "react";
import { SoundButton as SoundButtonType } from "../../static/sound_button_interface";
import { useSoundContext } from "../contexts/sound_context";

interface SoundButtonProps {
  sound: SoundButtonType;
  onClick: () => void;
}

export const SoundButton: React.FC<SoundButtonProps> = ({ sound }) => {
  const { currentSound, setCurrentSound } = useSoundContext();

  const handleClick = () => {
    setCurrentSound(sound);
  };

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: sound.customColor || "default" }}
    >
      <img
        src={currentSound?.id === sound.id ? sound.activeSvg : sound.svg}
        alt={sound.name}
      />
      <span>{sound.name}</span>
    </button>
  );
};

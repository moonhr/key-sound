import Button from "../atom/button/button";
import React, { useState } from "react";

interface KeycapProps {
  soundName: string;
  onSelectSound: (soundName: string) => void;
  className?: string;
  children: React.ReactNode;
}

const SoundKeycap: React.FC<KeycapProps> = ({
  soundName,
  onSelectSound,
  className,
  children,
}) => {
  const handleSelectSound = () => {
    onSelectSound(soundName);
  };

  return (
    <div onClick={handleSelectSound} className={className}>
      {children}
      <Button text="" />
    </div>
  );
};
export default SoundKeycap;

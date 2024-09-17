import { SoundButton } from "../../static/sound_button_interface";
import React, { useState, useEffect, useRef } from "react";
import "../../static/sound/brown-key.mp3";

const staticData: SoundButton[] = [
  {
    id: "1",
    name: "Brown Key",
    soundFile: "../../static/sound/brown-key.mp3",
    svg: "../../static/svg/BrownKey.svg",
    activeSvg: "../../static/svg/BrownKey_active.svg",
  },
];

export const TestComponent = () => {
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef(new Audio(staticData[0].soundFile));

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleClick = () => {
    setIsActive(true);
    audioRef.current.play();
    setTimeout(() => setIsActive(false), 200); // Reset after 200ms
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <img
        src={isActive ? staticData[0].activeSvg : staticData[0].svg}
        alt={staticData[0].name}
        style={{ width: "100px", height: "100px" }} // Adjust size as needed
      />
    </div>
  );
};

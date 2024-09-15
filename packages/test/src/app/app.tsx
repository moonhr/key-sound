import React from "react";
import { SoundButton } from "../components/sound";
import { useSoundContext } from "../contexts/sound_context";
import { SoundProvider } from "../contexts/sound_context";
import { useSoundEffect } from "../hooks/useSoundEffect";

export const App: React.FC = () => {
  const { sounds } = useSoundContext();

  const handleOthersClick = () => {
    // Navigate to OthersPage
  };

  const handleAddClick = () => {
    // Open file dialog and add new sound
  };

  useSoundEffect();

  return (
    <SoundProvider>
      <div>
        {sounds.slice(0, 5).map((sound) => (
          <SoundButton key={sound.id} sound={sound} />
        ))}
        <button onClick={handleOthersClick}>Others</button>
        <button onClick={handleAddClick}>Add</button>
      </div>
    </SoundProvider>
  );
};

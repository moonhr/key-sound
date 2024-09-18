import React from "react";
import { SoundButton } from "../components/sound_button";
import { SoundProvider, useSoundContext } from "../contexts/sound_context";
import { useSoundEffect } from "../hooks/useSoundEffect";
import { dummyData } from "../../static/dummyData";
import { staticData } from "../../static/staticData";

import { TestComponent } from "../components/test_component";

const AppContent: React.FC = () => {
  // const { sounds, addSound, currentSound, setCurrentSound } = useSoundContext();

  // const handleOthersClick = () => {
  //   // Navigate to OthersPage
  //   console.log("Navigate to Others Page");
  // };

  // const handleAddClick = () => {
  //   // Open file dialog and add new sound
  //   console.log("Open file dialog");
  // };

  // useSoundEffect();

  return (
    // <div>
    //   {sounds.map((sound) => (
    //     <SoundButton
    //       key={sound.id}
    //       sound={sound}
    //       onClick={() => setCurrentSound(sound)}
    //     />
    //   ))}
    //   <button onClick={handleOthersClick}>Others</button>
    //   <button onClick={handleAddClick}>Add</button>
    // </div>
    <div>
      <TestComponent />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    // <SoundProvider initialSounds={staticData}>
    <AppContent />
    // </SoundProvider>
  );
};

import React from "react";
import Load from "./load/load";
import Play_button from "./play_button/play_buton";
import Bar from "./bar/bar";
import Key_sound from "./key_sound/key_sound";
import Off_button from "./off_button/off_button";
import { useSoundFile } from "../../contexts/soune_file_context";

const Top = () => {
  const { soundFile, setSoundFile } = useSoundFile();
  return (
    <div className="flex flex-row">
      <Load />
      <Play_button />
      <Bar />
      <Key_sound />
      <Off_button />
    </div>
  );
};
export default Top;

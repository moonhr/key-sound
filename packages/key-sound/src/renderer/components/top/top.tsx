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
    <div className="border border-black bg-[#C9C9C9] rounded-lg w-[1025px] h-[70px] flex justify-center items-center">
      <div className="flex flex-row items-center w-full gap-3 mx-6 justify-evenly">
        <Load />
        <Play_button />
        <Bar />
        <Key_sound />
        <Off_button />
      </div>
    </div>
  );
};
export default Top;

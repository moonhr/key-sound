import React from "react";
import Load from "./load/load";
import Play_button from "./play_button/play_buton";
import Key_sound from "./key_sound/key_sound";
import Off_button from "./off_button/off_button";

const Top = () => {
  return (
    <div className="flex flex-row">
      <Load />
      <Play_button />
      <Key_sound />
      <Off_button />
    </div>
  );
};
export default Top;

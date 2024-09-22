import { SoundButton } from "./sound_button_interface";
import BrownKeySound from "./sound/brown-key.mp3";
import BrownKey from "./svg/BrownKey.svg";
import BrownKeyActive from "./svg/BrownKey_active.svg";

// const BrownKeySound = require("./sound/brown-key.mp3") as string;
// const BrownKey = require("./svg/BrownKey.svg") as string;
// const BrownKeyActive = require("./svg/BrownKey_active.svg") as string;

export const staticData: SoundButton[] = [
  {
    name: "Brown Key",
    soundFile: BrownKeySound,
    svg: BrownKey,
    activeSvg: BrownKeyActive,
  },
];

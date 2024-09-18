import { SoundButton } from "./sound_button_interface";
import BrownKey from "../static/svg/BrownKey.svg";
import BrownKeyActive from "../static/svg/BrownKey_active.svg";
import BrownKeySound from "../static/sound/brown-key.mp3";

export const staticData: SoundButton[] = [
  {
    name: "Brown Key",
    soundFile: BrownKeySound,
    svg: BrownKey,
    activeSvg: BrownKeyActive,
  },
];

import { SoundButton } from "./sound_button_interface";
import BrownKeySound from "./sound/brown-key.mp3";
import BlueKeySound from "./sound/blue-key.mp3";
import BlackKeySound from "./sound/black-key.mp3";
import RedKeySound from "./sound/red-key.mp3";
import StandardKeySound from "./sound/standard-key.mp3";
import DuckKeySound from "./sound/duck-key.mp3";

import BrownKey from "./svg/BrownKey.svg";
import BlueKey from "./svg/BlueKey.svg";
import BlackKey from "./svg/BlackKey.svg";
import RedKey from "./svg/RedKey.svg";
import StandardKey from "./svg/Standard.svg";
import DuckKey from "./svg/DuckKey.svg";

import BrownKeyActive from "./svg/BrownKey_active.svg";
import BlueKeyActive from "./svg/BlueKey_active.svg";
import BlackKeyActive from "./svg/BlackKey_active.svg";
import RedKeyActive from "./svg/RedKey_active.svg";
import StandardKeyActive from "./svg/Standard_active.svg";
import DuckKeyActive from "./svg/DuckKey_active.svg";

export const staticData: Record<string, SoundButton> = {
  BrownKey: {
    name: "Brown Key",
    soundFile: BrownKeySound,
    svg: BrownKey,
    activeSvg: BrownKeyActive,
  },
  BlueKey: {
    name: "Blue Key",
    soundFile: BlueKeySound,
    svg: BlueKey,
    activeSvg: BlueKeyActive,
  },
  BlackKey: {
    name: "Black Key",
    soundFile: BlackKeySound,
    svg: BlackKey,
    activeSvg: BlackKeyActive,
  },
  RedKey: {
    name: "Red Key",
    soundFile: RedKeySound,
    svg: RedKey,
    activeSvg: RedKeyActive,
  },
  StandardKey: {
    name: "Standard Key",
    soundFile: StandardKeySound,
    svg: StandardKey,
    activeSvg: StandardKeyActive,
  },
  DuckKey: {
    name: "Duck Key",
    soundFile: DuckKeySound,
    svg: DuckKey,
    activeSvg: DuckKeyActive,
  },
};

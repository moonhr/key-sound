export interface SoundSelectorPropsInterface {
  soundName: string; // 사운드 파일 이름
  onSelectSound: (soundName: string) => void;
  className?: string;
}

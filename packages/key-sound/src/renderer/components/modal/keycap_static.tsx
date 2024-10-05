// KeycapStatic.tsx
import React, { useState, useRef, useEffect } from "react";
import { staticData } from "../../../static/staticData";

interface KeycapStaticProps {
  onSaveKeySound: (key: string) => void; // 부모 컴포넌트로 선택한 키를 전달하기 위한 prop
}

const KeycapStatic: React.FC<KeycapStaticProps> = ({ onSaveKeySound }) => {
  const [isActive, setIsActive] = useState<string | null>(null);
  const [currentKey, setCurrentKey] = useState<string>("Standard Key");
  const [selectedKey, setSelectedKey] = useState<string | null>(null); // 별도의 상태로 선택된 key 저장
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 키보드 입력 처리
  const handleKeyPress = (event: KeyboardEvent) => {
    const pressedKey = event.key; // 눌린 키의 이름 가져오기
    const soundKey = staticData[pressedKey]; // 눌린 키와 매핑된 사운드 가져오기

    if (soundKey) {
      console.log(`Key pressed: ${pressedKey}`);
      if (audioRef.current) {
        audioRef.current.pause(); // 이전 오디오 멈추기
      }

      // 새로운 오디오 객체 생성 및 재생
      audioRef.current = new Audio(staticData[pressedKey].soundFile);
      audioRef.current.play();
    }
  };

  useEffect(() => {
    // 키보드 이벤트 리스너 등록
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      // 컴포넌트 언마운트 시 키보드 이벤트 리스너 제거
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleClick = (key: string) => {
    setIsActive(key);
    setCurrentKey(key);
    setSelectedKey(key); // Save 시 전달할 key는 따로 저장
    console.log(key);
    console.log(isActive);

    // 새로운 오디오 객체 생성 및 재생
    if (audioRef.current) {
      audioRef.current.pause(); // 이전 오디오 멈추기
    }

    audioRef.current = new Audio(staticData[key].soundFile);
    audioRef.current.play();

    setTimeout(() => setIsActive(null), 200);
  };

  // Save 버튼 클릭 시 부모 컴포넌트로 선택한 키 전달
  const handleSave = () => {
    if (selectedKey) {
      onSaveKeySound(selectedKey); // 선택된 키를 부모 컴포넌트로 전달
    }
    console.log(`Saved sound for key: ${selectedKey}`);
  };

  if (Object.keys(staticData).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="relative bg-black w-[300px] h-[180px] grid grid-cols-3 gap-1 p-1 rounded-xl">
        {Object.entries(staticData).map(([key, item]) => (
          <div
            key={key}
            className="relative group"
            onClick={() => handleClick(key)}
          >
            <img
              src={isActive === key ? item.activeSvg : item.svg}
              alt={item.name}
              className="absolute bottom-0 w-[120%]"
            />
            <p className="hidden group-hover:block absolute bottom-[100%] left-1/2 transform -translate-x-1/2 mb-2 text-white bg-black bg-opacity-80 rounded-lg p-1 whitespace-nowrap">
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <button onClick={handleSave}>Save</button> {/* Save 버튼 추가 */}
    </div>
  );
};

export default KeycapStatic;

// 키보드 사운드 선택 컴포넌트
// 버튼을 처음 클릭했을 때 해당 사운드가 브라우저에 존재하지 않으면 api요청으로 사운드를 받아온다.
// 사운드가 브라우저 캐싱되어 존재한다면 키보드 입력시에 사운드가 재생된다.
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { SoundSelectorPropsInterface } from "@/ts/interface/sound_selector_props";

const SoundSelector: React.FC<SoundSelectorPropsInterface> = ({
  soundName,
  soundApiEndpoint,
}) => {
  //컴포넌트가 마운트 될 때마다 audio와 isCached는 초기화된다.
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isCached, setIsCached] = useState<boolean>(false);

  useEffect(() => {
    // 사운드 캐싱 확인
    const cachedSound = localStorage.getItem(soundName);

    if (cachedSound) {
      // 사운드가 캐싱되어 있다면 오디오 객체 생성
      setAudio(new Audio(cachedSound));
      setIsCached(true);
    }
  }, [soundName]);

  //캐싱된 사운드가 없을 경우 api요청
  const fetchSound = async () => {
    try {
      console.log("사운드 요청");
      const response = await axios.get(`${soundApiEndpoint}/${soundName}`, {
        responseType: "blob", // Blob 형태로 응답받기 위해 설정
      });
      //응답 데이터 할당
      const soundBlob = response.data;
      console.log(soundBlob);
      //브라우저 내에서 사용가능한 임시 url생성. 이를통해 태그 src속성에 할당 가능해짐.
      const soundUrl = URL.createObjectURL(soundBlob);
      console.log(soundUrl);

      // 사운드를 localStorage에 저장 (캐싱)
      localStorage.setItem(soundName, soundUrl);

      // 오디오 객체 생성
      setAudio(new Audio(soundUrl));
      setIsCached(true);
    } catch (error) {
      console.error("Error fetching sound:", error);
    }
  };

  //해당 사운드 버튼 클릭 시 실행
  const handlePlaySound = () => {
    if (isCached && audio) {
      audio.currentTime = 0; // 재생 시마다 처음부터 재생
      audio.play();
    } else {
      // 사운드가 캐싱되지 않은 경우, API 요청으로 사운드 불러오기
      fetchSound();
    }
  };

  return (
    <div>
      <button onClick={handlePlaySound}>{soundName}</button>
      <textarea placeholder="키보드 입력" onKeyDown={handlePlaySound} />
    </div>
  );
};

export default SoundSelector;

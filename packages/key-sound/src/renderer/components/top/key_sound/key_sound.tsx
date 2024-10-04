import React, { useState } from "react";
import Modal from "../../modal/modal";
import KeycapStatic from "../../modal/keycap_static";
import { useKeycap } from "../../../contexts/keycap_context";
import { staticData } from "../../../../static/staticData";

const KeySound = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  // const [keySound, setKeySound] = useState<string | null>(null);
  const [selectedKeycap, setSelectedKeycap] = useState<{
    svg: string;
    soundFile: string;
  } | null>({
    svg: staticData.DuckKey.svg,
    soundFile: staticData.DuckKey.soundFile,
  });
  const { setSelectedSound } = useKeycap();

  const handleSaveKeySound = (selectedKey: string) => {
    const selectedData = staticData[selectedKey];
    setSelectedKeycap({
      svg: selectedData.svg,
      soundFile: selectedData.soundFile,
    });
    setSelectedSound(selectedData.soundFile);
    setModalOpen(false); // 모달 닫기
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="w-4 h-4">
        {/* 선택된 키캡과 사운드가 있는지 확인 */}
        <div>
          {selectedKeycap ? (
            <div>
              <img src={selectedKeycap.svg} alt="Selected Keycap" />
            </div>
          ) : (
            <p>키 사운드를 선택하세요!</p>
          )}
        </div>
      </button>
      {/* 모달 창 */}
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <KeycapStatic onSaveKeySound={handleSaveKeySound} />
        </Modal>
      )}
    </div>
  );
};

export default KeySound;

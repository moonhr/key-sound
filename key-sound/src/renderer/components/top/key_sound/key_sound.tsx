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
    <div className="flex items-center justify-center h-full">
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center justify-center w-8 h-8"
      >
        {selectedKeycap ? (
          <div className="flex items-center justify-center h-full">
            <img src={selectedKeycap.svg} alt="Selected Keycap" />
          </div>
        ) : null}
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

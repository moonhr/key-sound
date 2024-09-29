import React, { useState } from "react";
import Modal from "../../modal/modal";
import TestComponent from "../../modal/test_component";

const KeySound = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [keySound, setKeySound] = useState<string | null>(null);

  const handleSaveKeySound = (selectedSound: string) => {
    setKeySound(selectedSound);
    setModalOpen(false); // 모달 닫기
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>모달 열기</button>
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <TestComponent onSaveKeySound={handleSaveKeySound} />
        </Modal>
      )}
      <div>
        {keySound ? (
          <p>Selected Sound: {keySound}</p>
        ) : (
          <p>키 사운드를 선택하세요!</p>
        )}
      </div>
    </div>
  );
};

export default KeySound;

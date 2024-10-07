// Modal.tsx
import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const handleOverlayClick = () => {
    onClose();
  };
  return (
    <div
      className="top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-[#D9D9D9]  bg-opacity-70 fixed"
      onClick={handleOverlayClick}
    >
      <div
        className="p-16 bg-white border border-black w-[60%] rounded-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="absolute cursor-pointer top-4 right-4"
          onClick={onClose}
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;

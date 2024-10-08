import React from "react";

const Off_button = () => {
  const handleClose = () => {
    // ipcRenderer를 통해 main 프로세스에 'closeApp' 메시지를 보냄
    window.electronAPI.closeApp();
  };

  return (
    <div className="" onClick={handleClose}>
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.1718 5.8696L5.15918 15.8822M5.15918 5.8696L15.1718 15.8822"
          stroke="#1E1E1E"
          strokeWidth="2.10791"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
export default Off_button;

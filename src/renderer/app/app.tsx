import React from "react";

import Top from "../components/top/top";
import Main from "../components/main/main";
import { SoundFileProvider } from "../contexts/soune_file_context";
import { KeycapProvider } from "../contexts/keycap_context";

const AppContent: React.FC = () => {
  return (
    <div className="w-full h-[100vh] bg-[#D9D9D9] rounded-xl flex flex-col p-4 border border-black justify-center items-center">
      <KeycapProvider>
        <SoundFileProvider>
          <Top />
        </SoundFileProvider>
        <Main />
      </KeycapProvider>
    </div>
  );
};

export const App: React.FC = () => {
  return <AppContent />;
};

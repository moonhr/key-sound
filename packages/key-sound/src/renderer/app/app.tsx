import React from "react";
// import TestComponent from "../components/test_component";

import Top from "../components/top/top";
import Main from "../components/main/main";
import { SoundFileProvider } from "../contexts/soune_file_context";
import { KeycapProvider } from "../contexts/keycap_context";

const AppContent: React.FC = () => {
  return (
    <div>
      <KeycapProvider>
        <SoundFileProvider>
          <Top />
        </SoundFileProvider>
        <Main />
      </KeycapProvider>
      {/* <TestComponent /> */}
    </div>
  );
};

export const App: React.FC = () => {
  return <AppContent />;
};

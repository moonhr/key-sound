import React from "react";
// import TestComponent from "../components/test_component";

import Top from "../components/top/top";
import Main from "../components/main/main";
import { SoundFileProvider } from "../contexts/soune_file_context";

const AppContent: React.FC = () => {
  return (
    <div>
      <SoundFileProvider>
        <Top />
      </SoundFileProvider>
      <Main />
      {/* <TestComponent /> */}
    </div>
  );
};

export const App: React.FC = () => {
  return <AppContent />;
};

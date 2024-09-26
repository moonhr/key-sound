import React from "react";
// import TestComponent from "../components/test_component";

import Top from "../components/top/top";
import Main from "../components/main/main";

const AppContent: React.FC = () => {
  return (
    <div>
      <Top />
      <Main />
      {/* <TestComponent /> */}
    </div>
  );
};

export const App: React.FC = () => {
  return <AppContent />;
};

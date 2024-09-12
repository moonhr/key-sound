// pages/index.tsx
import React from "react";

const IndexPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to Nextron</h1>
      <p>This is a simple example of using Next.js with Electron.</p>
      <button onClick={() => alert("Hello from Electron!")}>Click Me</button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column", // TypeScript에서 명시적 타입 필요
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
};

export default IndexPage;

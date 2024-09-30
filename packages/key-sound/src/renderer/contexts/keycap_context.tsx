import React, { useContext, useState, createContext, ReactNode } from "react";

interface KeycapContextType {
  selectedSound: string | null;
  setSelectedSound: (key: string | null) => void;
}

const KeycapContext = createContext<KeycapContextType | undefined>(undefined);

// Provider 컴포넌트 정의
export const KeycapProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedSound, setSelectedSound] = useState<string | null>(null);

  return (
    <KeycapContext.Provider
      value={{
        selectedSound: selectedSound,
        setSelectedSound: setSelectedSound,
      }}
    >
      {children}
    </KeycapContext.Provider>
  );
};

export const useKeycap = () => {
  const context = useContext(KeycapContext);
  if (!context) {
    throw new Error("useKeycap must be used within a KeycapProvider");
  }
  return context;
};

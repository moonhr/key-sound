"use client";
import React, { createContext, useState, useContext } from "react";

type SoundFileContextType = {
  soundFile: File | null;
  setSoundFile: (file: File | null) => void;
};

const SoundFileContext = createContext<SoundFileContextType | undefined>(
  undefined
);

export const SoundFileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //불러온 파일을 저장할 상태
  const [soundFile, setSoundFile] = useState<File | null>(null);

  return (
    <SoundFileContext.Provider
      value={{
        soundFile,
        setSoundFile,
      }}
    >
      {children}
    </SoundFileContext.Provider>
  );
};

export const useSoundFile = () => {
  const context = useContext(SoundFileContext);
  if (context === undefined) {
    throw new Error("error");
  }
  return context;
};

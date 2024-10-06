import React from "react";
import { useSoundFile } from "../../../contexts/soune_file_context";

const LoadFile: React.FC = () => {
  const { setSoundFile } = useSoundFile();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSoundFile(file); // mp3 또는 mov 파일만 허용
    } else {
      alert("mp3 또는 mov 파일만 불러올 수 있습니다.");
    }
  };

  return (
    <div className="flex flex-col w-5 h-4 gap-1">
      <input
        type="file"
        accept=".mp3" // mp3 파일만 허용
        onChange={handleFileChange}
        className="absolute w-5 opacity-0"
      />
      <span className="w-full h-2 bg-black rounded " />
      <span className="w-full h-2 bg-black rounded " />
      <span className="w-full h-2 bg-black rounded " />
    </div>
  );
};

export default LoadFile;

import React from "react";
import { useSoundFile } from "../../../contexts/soune_file_context";

const Bar: React.FC = () => {
  const { soundFile } = useSoundFile();

  return (
    <div className="w-[200px] bg-slate-400">
      {soundFile ? (
        <p>불러온 파일명: {soundFile.name}</p>
      ) : (
        <p>파일이 불러오지 않았습니다.</p>
      )}
    </div>
  );
};

export default Bar;

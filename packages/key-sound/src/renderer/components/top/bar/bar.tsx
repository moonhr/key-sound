import React from "react";
import { useSoundFile } from "../../../contexts/soune_file_context";

const Bar: React.FC = () => {
  const { soundFile } = useSoundFile();

  return (
    <div className=" w-[450px] bg-[#E4E4E4] border border-black rounded-full flex justify-center items-center h-[40px] ">
      {soundFile ? (
        <p>{soundFile.name}</p>
      ) : (
        <p className="opacity-30">파일을 불러오지 않았습니다.</p>
      )}
    </div>
  );
};

export default Bar;

import { Request, Response } from "express";
import path from "path";
import fs from "fs";

// 특정 사운드를 가져오는 함수
export const getSoundByName = (req: Request, res: Response) => {
  const { soundName } = req.params;

  // 사운드 파일의 경로 설정 (여기서는 예시로 사운드 파일이 "sounds" 디렉토리에 있다고 가정)
  const soundPath = path.join(
    __dirname,
    "../../../../sound",
    `${soundName}.mp3`
  );
  console.log(soundPath);
  // 파일 존재 여부 확인 및 응답
  if (fs.existsSync(soundPath)) {
    res.sendFile(soundPath);
  } else {
    res.status(404).send({ message: "Sound not found" });
  }
};

// 사운드를 재생하는 함수
export const playSound = (req: Request, res: Response) => {
  // 사운드 재생 로직 구현
  res.status(200).send({ message: "Play sound" });
};

// 사운드를 업로드하는 함수
export const uploadSound = (req: Request, res: Response) => {
  // 사운드 업로드 로직 구현
  res.status(201).send({ message: "Upload sound" });
};

// 사운드를 삭제하는 함수
export const deleteSound = (req: Request, res: Response) => {
  // 사운드 삭제 로직 구현
  res.status(200).send({ message: "Delete sound" });
};

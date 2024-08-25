import { Router } from "express";
import {
  getSoundByName,
  playSound,
  uploadSound,
  deleteSound,
} from "./sound.controller";

const router = Router();

// 특정 사운드를 가져오는 엔드포인트
router.get("/:soundName", getSoundByName);

// 사운드를 재생하는 엔드포인트
router.post("/play", playSound);

// 사운드를 업로드하는 엔드포인트
router.post("/upload", uploadSound);

// 사운드를 삭제하는 엔드포인트
router.delete("/delete", deleteSound);

export default router;

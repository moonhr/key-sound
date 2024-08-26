import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import soundRoutes from "./api/sound/sound.routes";

const app = express();
const PORT = process.env.PORT || 3001;

// 미들웨어 설정
// CORS 설정
const allowedOrigins = ["http://localhost:3000"]; // 허용할 도메인 목록

app.use(cors());
app.use(morgan("dev")); // 로그 기록 (개발 환경)
app.use(express.json()); // JSON 요청 바디 파싱
app.use(express.static(path.join(__dirname, "../frontend/public"))); // 정적 파일 제공
app.use("/api/sound", soundRoutes);

// 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to KeySound API!");
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

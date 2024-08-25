import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3001;

// 미들웨어 설정

// CORS 설정
const allowedOrigins = ["http://localhost:3000"]; // 허용할 도메인 목록

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
        callback(null, true); // 허용된 도메인
      } else {
        callback(new Error("Not allowed by CORS")); // 허용되지 않은 도메인
      }
    },
  })
);
app.use(morgan("dev")); // 로그 기록 (개발 환경)
app.use(express.json()); // JSON 요청 바디 파싱
app.use(express.static(path.join(__dirname, "../frontend/public"))); // 정적 파일 제공

// 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to KeySound API!");
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

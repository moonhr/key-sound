import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SoundSelector from "@/components/keyboard";
import axios from "axios";

// axios의 get 메서드를 모킹합니다.
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// URL.createObjectURL 모킹
global.URL.createObjectURL = jest.fn(() => "mocked-url");

describe("SoundSelector", () => {
  beforeEach(() => {
    localStorage.clear(); // 매 테스트마다 로컬 스토리지 초기화
  });

  it("should render and handle button click", async () => {
    // axios 요청을 모킹하여 Blob 응답을 반환하도록 설정합니다.
    mockedAxios.get.mockResolvedValueOnce({
      data: new Blob(["audio data"], { type: "audio/wav" }),
    });

    render(
      <SoundSelector
        soundName="test-sound"
        apiEndpoint="http://localhost:3001/sounds"
      />
    );

    const button = screen.getByText("test-sound");
    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorage.getItem("test-sound")).toBeTruthy();
    });

    // textarea 입력 이벤트 확인
    const textarea = screen.getByPlaceholderText("키보드 입력");
    fireEvent.keyDown(textarea, { key: "Enter", code: "Enter" });
    // 추가적인 검증 로직이 필요할 수 있습니다.
  });

  it("should play cached sound", async () => {
    const mockBlob = new Blob(["audio data"], { type: "audio/wav" });
    const soundUrl = "mocked-url"; // URL.createObjectURL 모킹에서 반환된 값

    // localStorage에 사운드 URL 저장
    localStorage.setItem("test-sound", soundUrl);

    render(
      <SoundSelector
        soundName="test-sound"
        apiEndpoint="http://localhost:3001/sounds"
      />
    );

    // 여기서는 `audio.play` 메서드의 호출 여부를 검사할 수 있습니다.
    // `audio` 객체를 모킹하거나, 실제로 호출이 이루어지는지 확인하는 로직을 추가할 수 있습니다.
  });
});

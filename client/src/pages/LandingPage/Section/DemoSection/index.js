import { PulseLoader } from "react-spinners";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import {
  Container,
  Button,
  CaptureIntervalInput,
  ImagePreview,
  WebcamView,
  ResultDisplay,
  CameraAndPreviewContainer,
  LoadingBar,
} from "./styled";

function DemoSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [demoResult, setDemoResult] = useState("");

  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const defaultCaptureInterval = 5;
  const [captureInterval, setCaptureInterval] = useState(
    defaultCaptureInterval,
  );
  const [capturedImage, setCapturedImage] = useState(null);

  const getRandomLetter = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[Math.floor(Math.random() * letters.length)];
  };

  const captureImage = () => {
    if (webcamRef.current) {
      setIsLoading(true); // 로딩 시작
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(null); // 이전 이미지를 초기화

      // FormData 객체 생성
      const formData = new FormData();
      formData.append("file1", imageSrc);

      // 캡처된 이미지를 서버에 전송
      axios
        .post("/api/sign-lan/analysis", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Image sent successfully", response);
          setDemoResult(getRandomLetter()); // 랜덤 알파벳 업데이트
          setCapturedImage(imageSrc); // 요청이 완료되면 이미지 설정
        })
        .catch((error) => {
          console.error("Error sending image", error);
          setDemoResult(getRandomLetter()); // 랜덤 알파벳 업데이트
          setCapturedImage(imageSrc); // 요청이 완료되면 이미지 설정
        })
        .finally(() => {
          setIsLoading(false); // 로딩 종료
        });
    }
  };

  const startAutoCapture = () => {
    captureImage(); // 즉시 이미지 캡처
    setIsCapturing(true); // 자동 캡처 상태를 true로 설정
  };

  const stopAutoCapture = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsCapturing(false); // 자동 캡처 상태를 false로 설정
  };

  const toggleAutoCapture = () => {
    setIsCapturing(!isCapturing); // 자동 캡처 상태를 반전시킵니다.
  };

  useEffect(() => {
    let id;
    if (isCapturing) {
      // 자동 캡처 시작 시 즉시 한 번 캡처
      captureImage();
      id = setInterval(captureImage, captureInterval * 1000);
    }
    // 컴포넌트 언마운트시 실행될 정리 함수
    return () => {
      clearInterval(id); // setInterval을 정리합니다.
    };
  }, [isCapturing, captureInterval]); // intervalId를 의존성 배열에서 제거합니다.
  return (
    <Container>
      <CameraAndPreviewContainer>
        <WebcamView>
          <Webcam ref={webcamRef} />
        </WebcamView>
        <ImagePreview>
          {isLoading ? (
            // isLoading 상태가 true일 때 로더를 표시합니다.
            <PulseLoader color="#717171" size="32" margin="4" />
          ) : capturedImage ? (
            <>
              <img src={capturedImage} alt="Captured" />
              <div className="overlay-text">{demoResult}</div>
            </>
          ) : (
            <div className="placeholder">미리보기가 여기에 표시됩니다.</div>
          )}
        </ImagePreview>
      </CameraAndPreviewContainer>
      <Button onClick={captureImage}>수동 캡처</Button>
      <Button onClick={toggleAutoCapture}>
        {isCapturing ? "자동 캡처 중지" : "자동 캡처 시작"}
      </Button>
      <CaptureIntervalInput
        type="number"
        value={captureInterval}
        onChange={(e) => {
          // 입력된 값이 5 이상인 경우에만 상태를 업데이트합니다.
          const newInterval = parseInt(e.target.value, 10);
          if (newInterval >= defaultCaptureInterval) {
            setCaptureInterval(newInterval);
          }
        }}
        disabled={isCapturing}
      />
    </Container>
  );
}

export default DemoSection;

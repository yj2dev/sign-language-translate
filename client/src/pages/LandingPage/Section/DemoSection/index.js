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
  ButtonContainer,
} from "./styled";

function DemoSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [demoResult, setDemoResult] = useState("");

  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const defaultCaptureInterval = 2;
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

      // Base64 인코딩된 데이터 URL을 Blob 객체로 변환
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "webcam-image.png", {
            type: "image/png",
          });

          // FormData 객체 생성
          const fd = new FormData();
          fd.append("file0", file);

          // FormData 객체의 내용을 로깅
          for (let [key, value] of fd.entries()) {
            console.log(`${key}:`, value);
          }

          // 캡처된 이미지를 서버에 전송
          return axios.post("/api/sign-lan/analysis", fd, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        })
        .then((response) => {
          console.log("Image sent successfully", response);
          setDemoResult(response.data.result); // 랜덤 알파벳 업데이트
          setCapturedImage(imageSrc); // 요청이 완료되면 이미지 설정
        })
        .catch((error) => {
          console.error("Error sending image", error);
          setDemoResult("Error"); // 랜덤 알파벳 업데이트
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
      <h1 id="demo-section">수화로 세상과 소통해 보아요.</h1>
      <h1>당신의 이야기를 듣고 싶습니다.</h1>

      <CameraAndPreviewContainer>
        <WebcamView>
          <Webcam ref={webcamRef} />
        </WebcamView>
        <ImagePreview>
          {isLoading ? (
            // isLoading 상태가 true일 때 로더를 표시합니다.
            <PulseLoader color="#cccccc" size="32" margin="8" />
          ) : capturedImage ? (
            <>
              <img src={capturedImage} alt="Captured" />
              <div className="overlay-text">{demoResult}</div>
            </>
          ) : (
            <div className="placeholder">
              카메라에 수화를 취한 후 <span>캡처</span> <br /> 버튼을 클릭해
              결과를 확인하세요
            </div>
          )}
        </ImagePreview>
      </CameraAndPreviewContainer>
      <ButtonContainer>
        <div className="flex_1">
          <Button disabled={isCapturing} onClick={captureImage}>
            캡처
          </Button>
        </div>
        <div className="flex_1 flex_row">
          <Button
            className={isCapturing && "active"}
            onClick={toggleAutoCapture}
          >
            {isCapturing ? "자동 캡처 중지" : "자동 캡처 시작"}
          </Button>
          <CaptureIntervalInput
            className="btn_1"
            type="number"
            value={captureInterval}
            onChange={(e) => {
              const newInterval = parseInt(e.target.value, 10);
              if (newInterval >= defaultCaptureInterval) {
                setCaptureInterval(newInterval);
              }
            }}
            disabled={isCapturing}
            title="자동 캡처를 할 때 캡처 간 딜레이 시간입니다."
          />
        </div>
      </ButtonContainer>
    </Container>
  );
}

export default DemoSection;

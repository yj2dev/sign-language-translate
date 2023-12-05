import { Container } from "./styled";
import axios from "axios";
import Webcam from "react-webcam";
import { useState, useEffect } from "react";

const DemoSection = () => {
  const capture = () => {
    const [isCapturing, setIsCapturing] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const capture = () => {
      // 웹캠에서 이미지 캡처 로직
      const image = "captured-image-data"; // 임시 이미지 데이터

      // 캡처된 이미지를 서버에 전송
      axios
        .post("your-server-endpoint", { image: image })
        .then((response) => {
          console.log("Image sent successfully", response);
        })
        .catch((error) => {
          console.error("Error sending image", error);
        });
    };

    useEffect(() => {
      if (isCapturing) {
        const id = setInterval(capture, 5000);
        setIntervalId(id);
      } else if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }

      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }, [isCapturing]);

    return (
      <DemoSection>
        <Webcam /> {/* 웹캠 컴포넌트, 실제 구현 필요 */}
        <button onClick={() => setIsCapturing(!isCapturing)}>
          {isCapturing ? "자동 캡처 중지" : "5초마다 자동 캡처"}
        </button>
        <div id="demo-result">B</div>
      </DemoSection>
    );
  };
};

export default DemoSection;

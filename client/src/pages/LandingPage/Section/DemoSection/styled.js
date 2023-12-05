import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  background-color: #fff; // 백그라운드 컬러를 밝은 톤으로 변경
  padding: 20px;
  color: #333; // 기본 텍스트 컬러를 어둡게 설정
`;

export const CameraAndPreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch; // 내부 아이템들이 동일한 높이를 갖도록 설정
  width: 100%;
  max-width: 1440px;
`;

export const WebcamView = styled.div`
  flex: 1;
  margin: 10px;
  padding: 10px;
  border: 3px solid #333;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  video {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    transform: scaleX(-1);
  }
`;

export const ImagePreview = styled.div`
  flex: 1;
  margin: 10px;
  padding: 10px;
  border: 3px solid #333;
  background-color: #f8f8f8;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    transform: scaleX(-1);
  }

  .overlay-text {
    font-family: "Diphylleia", serif;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    font-size: 8em;
    width: 1em;
    height: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e31e26;
    z-index: 10;
  }
`;
export const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  font-size: 1em;
  border: 2px solid #333; // 테두리 추가 및 컬러 조정
  border-radius: 5px;
  background-color: #fff; // 버튼 배경을 밝게 설정
  color: #333; // 버튼 글자 컬러를 어둡게 설정
  cursor: pointer;

  &:hover {
    background-color: #e31e26; // 호버 상태일 때의 배경 컬러를 이미지의 레드와 맞춤
    color: #fff; // 호버 상태일 때의 글자 컬러를 밝게 설정
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: default;
  }
`;

export const CaptureIntervalInput = styled.input`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1em;
`;

export const LoadingBar = styled.div`
  width: 100%;
  background-color: #ddd;
  margin: 20px 0;

  div {
    height: 5px;
    width: 0;
    background-color: #e31e26;
    transition: width 0.5s ease-in-out;
  }
`;

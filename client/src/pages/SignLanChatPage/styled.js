import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  //user-select: none;
  flex-direction: row;
  height: 640px;
  //height: 100vh;
  //width: 80%;
  max-width: 1000px;
  background-color: #fff;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.1),
    0 0 6px rgba(0, 0, 0, 0.05);

  padding: 44px 32px;
  margin: 32px 0;

  .flex-1.analysis-section {
    //min-height: 600px;
    height: 600px;
    //border: 1px solid red;
    //flex: 1;
    width: 58%;
    padding: 0px 32px 16px 16px;
    //border-right: 2px dashed #e5e7eb;
  }

  .flex-1.chat-section {
    &:focus {
      outline: none;
    }
    height: 600px;
    width: 350px;
    padding: 20px 24px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border: 4px dashed #6e90b7;
    border-radius: 24px;

    /* 그림자 효과 추가 */
    box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.1),
      0 2px 4px rgba(0, 0, 0, 0.05);

    /* 호버 시 변화하는 효과 */
    transition: all 0.3s ease;

    /* 호버 시 효과 */
    &:hover {
      box-shadow:
        0 8px 16px rgba(0, 0, 0, 0.1),
        0 4px 8px rgba(0, 0, 0, 0.05);
      transform: translateY(-5px);
    }

    /* 포커스 시 효과 (옵션) */
    &:focus-within {
      border-color: #5078a7;
      box-shadow: 0 0 0 2px rgba(80, 120, 167, 0.5);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    padding: 16px;
  }
`;

export const FileDropSection = styled.div`
  //width: 80%;
  height: 50%;
  //padding: 32px;
  border: 4px dashed #e5e7eb;
  border-radius: 24px;
  background-color: #f9fafb;
  color: #9da0a5;
  display: flex;

  transition: 0.2s;

  font-size: 1.2em;
  cursor: pointer;
  margin-bottom: 32px;
  justify-content: center;
  align-items: center;
  padding: 12px;

  &.active {
    height: 100px;
    transition: 0.2s;
    border-color: #739be0;
    color: #799bd7;
  }

  &.drag {
    border-color: #99ccff;
    color: #99ccff;
  }

  &:hover {
    transition: 0.2s;
    border-color: #b3c6e7;
    color: #9cb3d9;
  }

  .drop-content {
    text-align: center;
  }

  p {
    padding: 0px;
    margin: 0px;
  }

  .react-icons {
    justify-content: center;
    align-items: center;
    font-size: 38px;
  }
`;

export const DragOverlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  justify-content: center;
  align-items: center;
  z-index: 10;
  font-size: 24px;
`;

export const PreviewImageSection = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 485px; /* 최대 높이 설정 */
  overflow-y: auto; /* 이미지가 많을 때 스크롤 가능 */
  position: relative;

  .disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: default;
  }

  #upload-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    color: #9da0a5;
    letter-spacing: 4px;
    line-height: 44px;

    .tip {
      margin-top: 32px;
      font-size: 0.7em;
      color: indianred;
      font-weight: 800;
    }
  }
  .images-container {
    position: relative;
    display: grid;
    grid-template-columns: repeat(
      3,
      1fr
    ); /* 가로로 3개의 동일한 크기의 열 생성 */
    gap: 12px; /* 이미지 사이의 간격 */
  }

  #translate-btn {
    width: calc(100% - 8px);
    position: sticky;
    bottom: 0; /* 버튼을 컨테이너의 바닥에 고정 */
    margin-top: 12px; /* 버튼을 컨테이너의 바닥에 고정 */
    padding: 12px 20px;
    background-color: #739be0; /* 버튼 배경색 */
    color: white; /* 버튼 글씨색 */
    border: none;
    border-radius: 8px;
    font-size: 1.2em;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #5671a4; /* 마우스 오버시 색상 변경 */
    }
  }

  img {
    position: relative;
    width: 144px; /* 컨테이너의 너비에 맞게 이미지 너비 조정 */
    height: 144px; /* 이미지의 원래 비율을 유지 */
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
  }

  .button-container {
    text-align: center; /* 버튼을 중앙에 정렬 */
    padding: 12px;
  }

  .preview-item {
    position: relative;
    transition: transform 0.2s ease-in-out;

    &.dragging {
      opacity: 0.5;
      transform: scale(0.95);
    }

    .del-btn {
      position: absolute;
      top: 0;
      right: 10px;
      padding: 6px 6px;
      border: none;
      background-color: rgb(255, 0, 0, 0.5);
      border-radius: 0 8px 0 4px;
      color: white;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s;

      &:hover {
        background-color: rgb(255, 0, 0, 1);
        padding: 8px 10px;
        transition: 0.2s;
      }
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      border: none;
      top: 0;
      left: 0;
      padding: 2px 10px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 8px 0 4px 0;
      color: white;
    }
  }
`;

export const ChatSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 570px;
  margin-bottom: 16px;
  position: relative; // 상대적 위치 설정

  .chatbot-title {
    //content: "ChatGPT 4"; // 표시할 텍스트
    position: sticky; // 고정 위치
    top: 0; // 상단에 위치
    color: #0d47a1;
    background: rgba(255, 255, 255, 0.9); // 약간 투명한 배경
    padding: 16px 0; // 패딩
    width: 100%; // 전체 너비
    text-align: center; // 텍스트 중앙 정렬
    font-weight: bold; // 글씨 굵기
    //border-bottom: 1px solid #ccc; // 하단 테두리
    //box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); // 그림자 효과
  }
`;

export const Message = styled.div`
  background-color: #f1f3f4;
  padding: 8px 16px;
  border-radius: 20px;
  margin: 8px 0;
  align-self: flex-start;
  max-width: 74%;

  &.even {
    align-self: flex-end;
    background-color: #0d47a1;
    color: #fff;
  }

  &.odd {
    align-self: flex-start;
  }
`;

export const InputArea = styled.div`
  display: flex;
  gap: 8px;

  input {
    flex-grow: 1;
    padding: 8px 16px;
    border-radius: 20px;
    border: 1px solid #e5e7eb;
  }
  input:focus {
    outline: none;
    border-color: #0d47a1;
    transition: border-color 0.1s ease-in-out;
  }

  button {
    padding: 8px 16px;
    background-color: #0d47a1;
    width: 72px;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &:not(.disabled):hover {
      background-color: #1565c0;
    }

    &.disabled {
      background-color: rgba(13, 71, 161, 0.6);
      cursor: default;
    }
  }
`;

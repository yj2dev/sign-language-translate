import styled from "styled-components";

export const Container = styled.div`
  user-select: none;
  //border: 1px dashed #9da0a5;
  margin: 24px 0;
  padding: 32px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-bottom: none;
  border-top: none;
  //height: auto;
  height: 100vh;
  width: 80%; // 기본 너비를 80%로 설정
  max-width: 1000px; // 최대 너비를 1000px로 설정
  background-color: #fff;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.1),
    0 0 6px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    // 모바일 화면에 대한 미디어 쿼리
    width: 100%; // 모바일 화면에서는 너비를 100%로 설정
    height: auto; // 모바일에서 높이를 자동으로 조절
  }
`;
export const FileDropSection = styled.div`
  width: 74%;
  padding: 64px;
  border: 4px dashed #e5e7eb;
  border-radius: 24px;
  background-color: #f9fafb;
  color: #9da0a5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  cursor: pointer;

  .drop-content {
    text-align: center;
  }
  .react-icons {
    font-size: 42px;
    margin-bottom: 12px;
  }

  p {
    margin: 0 0 4px 0;
  }

  &.in {
    border: 4px dashed #99ccff;
    color: #99ccff;
    transition: 0.2s;
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
  box-sizing: border-box;
  justify-content: center;

  flex-direction: row;
  flex-wrap: wrap;
  border: 2px dashed orange;
  gap: 12px;

  img {
    border: 1px solid red;
    width: 256px;
    height: 256px;
    //height: 256px;
    object-fit: cover;
  }
  .preview-item {
    position: relative;
    // 기타 스타일...

    &.dragging {
      border: 2px dashed blue; // 드래그 중인 항목 스타일
      opacity: 0.5;
    }

    .del-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: black;
      color: white;
      padding: 2px 5px;
    }

    span {
      position: absolute;
      top: 10px;
      left: 10px;
      background-color: black;
      color: white;
      padding: 2px 5px;
    }
  }
`;

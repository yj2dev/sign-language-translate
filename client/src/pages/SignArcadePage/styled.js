import styled from "styled-components";

export const Container = styled.div`
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

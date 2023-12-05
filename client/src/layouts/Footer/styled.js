import styled from "styled-components";

export const FooterContainer = styled.footer`
  font-size: 0.9em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 0;
  color: #333; // 변경된 텍스트 색상
  background-color: #f8f8f8; // 변경된 배경색
  bottom: 0;
  width: 100%;
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
  align-items: center;
`;

export const FooterLink = styled.a`
  color: #333; // 변경된 링크 색상
  text-decoration: none;
  margin-right: 8em;
  &:hover {
    text-decoration: underline; // 호버 스타일 변경
    font-weight: bold; // 호버 시 글씨 두껍게
  }
`;

export const FooterCopyRight = styled.div`
  text-align: center;
  //width: 100%; // 전체 너비 사용
`;

// React 컴포넌트는 동일하게 유지

import styled, { keyframes } from "styled-components";

// 커서 깜빡임 효과를 위한 keyframes 정의
export const blinkAnimation = keyframes`
  50% {
    border-color: transparent;
  }
`;

// 타이핑 효과를 위한 styled-component 정의
export const TypingText = styled.div`
  //border-right: 2px solid; /* 커서 효과 */
  //white-space: nowrap; /* 줄 바꿈 방지 */
  //overflow: hidden; /* 넘치는 텍스트 숨김 */
  //animation: ${blinkAnimation} 0.7s infinite; /* 깜빡임 효과 */
`;

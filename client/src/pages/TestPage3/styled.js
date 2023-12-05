import styled from "styled-components";

export const Container = styled.div`
  //border: 4px dashed cornflowerblue;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const FileDropSection = styled.div`
  width: 80%;
  height: 250px;
  border: 4px dashed #e5e7eb;
  border-radius: 24px;
  background-color: #f9fafb;
  color: #9da0a5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  user-select: none;

  .react-icons {
    font-size: 42px;
    margin-bottom: 12px;
  }

  p {
    margin: 0;
  }

  &.in {
    border: 4px dashed #99ccff;
    color: #99ccff;
    transition: 0.2s;
  }
`;

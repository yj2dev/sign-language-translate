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
  cursor: pointer;

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

export const PreviewImage = styled.img`
  width: 100%;
  padding-right: 32px;
  //height: 256px;
  object-fit: cover;
`;

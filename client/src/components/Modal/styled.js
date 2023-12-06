import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    position: relative;
    background: white;
    padding: 20px;
    border-radius: 5px;
    width:20%;
    height:60%;
  }
  .close-btn {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

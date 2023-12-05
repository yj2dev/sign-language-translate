import styled from "styled-components";
export const HeaderContainer = styled.header`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  background-color: #fff;
  justify-content: space-evenly;
  align-items: center;
  height: 64px;
  border-bottom: 1px solid transparent;

  &.active {
    transition: 0.2s;
    border-bottom: 1px solid #cccccc;
  }

  nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 32px;
  }

  nav ul li {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  nav ul li a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const HeaderLeftNav = styled.nav`
  flex: 1;
  display: flex;
  margin-left: 32px;
  justify-content: flex-start;
  align-items: center;
  font-size: 24px;
  font-family: "Diphylleia", serif;
  img {
    //width: 36px;
    //height: 36px;
    width: 36px;
    padding-right: 4px;
  }
`;

export const HeaderCenterNav = styled.nav`
  flex: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  @media (max-width: 600px) {
    flex-direction: row;
  }
`;
export const HeaderRightNav = styled.nav`
  flex: 1;
  display: flex;
  margin-right: 32px;
  justify-content: flex-end;
  align-items: center;

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid #cccccc;
  }
  .login-btn {
    cursor: pointer;
    font-size: 1em;
    background-color: transparent;
    border: none;
  }
`;

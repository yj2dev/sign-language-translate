import styled from "styled-components";

export const Container = styled.div`
  //border: 4px solid orchid;
  font-size: 2em;
  color: #cccccc;

  .intro_wrapper {
    background-color: #f2f2f2;
    width: 100%;
    height: 100%;
    //background-image: url("https://i.ibb.co/988TYyd/signlang.jpg");
    // background-size: cover;
    // backgroundRepeat: no-repeat;
    // display: flex;
  }

  .intro-content {
    position: relative;
    top: 80px;
    left:40px;
    
  }

  h2,
  p {
    margin-left: 120px;
  }

  h2 {
    margin-top: -10px;
  }

  p {
    font-size: 20px;
    width: 40%;
    margin-left: 80px;
  }

  hr.divider {
    height: 0.15rem;
    max-width: 25rem;
    margin: 3.5rem;
    background-color: white;
    opacity: 1;
    margin-top: 5px;
  }

  .intro {
    font-family: "Diphylleia", serif;
    color: #a0a0a0;
  }

  h3 {
    text-align: center;
  }

  .sl-img {
    width: 40%;
    float: right;
    position: relative;
    margin-top: -250px;
  }

  h3 {
    text-align: right;
  }

  .intro-bottom {
    position: absolute;
    top: 200px;
    right: 300px;
  }

  .divider2 {
    max-width: 50rem;
  }

  .intro-title {
    display: flex;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .icon {
    margin-left: 10px;
    margin-bottom: 20px;
  }
`;

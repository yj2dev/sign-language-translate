import styled from "styled-components";

export const Container = styled.div`

    .login_tit {
        border-bottom: solid 1px #ababab;
        padding-bottom : 20px;
    }

    h4 {
        text-align: center;
        font-family: "Diphylleia", serif;
    }

    p {
        font-family: "Diphylleia", serif;
    }
      
    .login_input_div p {
        font-weight: bold;
        margin-bottom : 8px;
    }
      
    .login_input_div input {
        width: 92%;
        padding: 4px;
        margin-top: -10px;
    }
      
    .login_div {
        text-align: left;
        padding-left: 20px;
    }
      
    .submit_div {
        display: grid;
        grid-template-columns: 45% auto;
        margin-top: 12%;
    }
      
    .submit_div div {
        text-align: center;
    }
      
    .submit_div div input {
        cursor: pointer;
    }

    .l_btn {
        padding: 15px;
        fontSize: 16px;
        width: 120px;
        font-family: "Diphylleia", serif;
        background-color: #F2F2F2;
        border: none;
        border-radius: 10px;
    }
`;

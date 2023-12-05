import { useNavigate } from "react-router-dom";
import { Container } from "./styled";
import { useState } from "react";
import Modal from "../Modal";
import axios from "axios";

const RegisterModal = ({ show, onClose, onShowLogin }) => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [nickname, setNickname] = useState();
  const [password, setPassword] = useState("");

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onClickRegister = (e) => {
    const payload = {
      nickname,
      id,
      password,
    };

    axios
      .post("/api/user", payload)
      .catch((res) => {
        console.log("res >> ", res);
      })
      .then((err) => {
        console.log(err);
      });
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h2>회원가입</h2>
      <br />
      <input
        type="text"
        placeholder="nickname"
        value={nickname}
        onChange={onChangeNickname}
      />
      <br />
      <input type="text" value={id} onChange={onChangeId} />
      <br />
      <input type="password" value={password} onChange={onChangePassword} />
      <br />
      <button onClick={onClickRegister}>회원가입 완료</button>
      <button onClick={onShowLogin}>로그인</button>
    </Modal>
  );
};

export default RegisterModal;

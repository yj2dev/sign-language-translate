import { useNavigate } from "react-router-dom";
import { Container } from "./styled";
import { useState } from "react";
import Modal from "../Modal";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/userState";

const LoginModal = ({ show, onClose, onShowRegister }) => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useRecoilState(userState);

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onClickLogin = (e) => {
    const payload = {
      id,
      password,
    };

    axios
      .post("/api/user/login", payload)
      .then((res) => {
        setUser(res.data);
        onClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h2>로그인</h2>
      <br />
      <input type="text" value={id} onChange={onChangeId} />
      <br />
      <input type="password" value={password} onChange={onChangePassword} />
      <br />
      <button onClick={onClickLogin}>로그인</button>
      <button onClick={onShowRegister}>회원가입</button>
    </Modal>
  );
};

export default LoginModal;

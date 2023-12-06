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
      <Container>
        <div>
            <h4 className='login_tit'> 로그인 </h4>
                <div className='login_div'>
                  <div className='login_input_div'>
                    <p>  아이디 </p>
                      <input type='text' name='id' value={id} onChange={onChangeId}/>
                  </div>

                  <div className='login_input_div' style={{ 'marginTop' : '40px'}}>
                      <p>  비밀번호 </p>
                      <input type='text' name='password' value={password} onChange={onChangePassword}/>
                    </div>

                    <div className='submit_div'>
                      <div><button className="l_btn" onClick={onClickLogin}>로그인</button> </div>
                      <div><button className="l_btn" onClick={onShowRegister}>회원가입</button> </div>
                    </div>
                  </div>
          </div>
      </Container>
    </Modal>
  );
};

export default LoginModal;

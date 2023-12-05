import { HeaderRightNav } from "../../styled";
import { useEffect, useState } from "react";
import LoginModal from "../../../../components/LoginModal";
import RegisterModal from "../../../../components/RegisterModal";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../../../../recoil/userState";
import { Link } from "react-router-dom";

const HeaderRight = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [user, setUser] = useRecoilState(userState);

  const getUserSate = () => {
    axios
      .get("/api/user/auth")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));

    console.log(user);
  };

  useEffect(() => {
    console.log(new Date());
    getUserSate();
  }, []);

  const onClickLogout = () => {
    axios
      .get("/api/user/logout")
      .then((res) => {
        setUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onShowLoginModal = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  const onShowRegisterModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const onCloseModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  return (
    <HeaderRightNav>
      <LoginModal
        show={showLoginModal}
        onClose={onCloseModal}
        onShowRegister={onShowRegisterModal}
      />
      <RegisterModal
        show={showRegisterModal}
        onClose={onCloseModal}
        onShowLogin={onShowLoginModal}
      />
      <ul>
        <li>
          <Link to="test">소개</Link>
        </li>
        <li>
          <Link to="test2">체험</Link>
        </li>
        <li>
          <Link to="test3">이용하기</Link>
        </li>
        <li>
          <Link to="test4">익히기</Link>
        </li>
      </ul>
      {/*<ul>*/}
      {/*  <li>*/}
      {/*    <button onClick={onClickLogout}>로그아웃</button>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    {user ? (*/}
      {/*      user.profileUrl ? (*/}
      {/*        <img src={user.profileUrl} alt="user profile" />*/}
      {/*      ) : (*/}
      {/*        <img*/}
      {/*          src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${user.id}`}*/}
      {/*          alt="user profile"*/}
      {/*        />*/}
      {/*        // <img*/}
      {/*        //   src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.id}`}*/}
      {/*        //   alt="user profile"*/}
      {/*        // />*/}
      {/*      )*/}
      {/*    ) : (*/}
      {/*      <button className="login-btn" onClick={onShowLoginModal}>*/}
      {/*        로그인*/}
      {/*      </button>*/}
      {/*    )}*/}
      {/*  </li>*/}
      {/*</ul>*/}
    </HeaderRightNav>
  );
};

export default HeaderRight;

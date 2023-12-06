import { HeaderRightNav } from "../../styled";
import { useEffect, useState } from "react";
import LoginModal from "../../../../components/LoginModal";
import RegisterModal from "../../../../components/RegisterModal";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../../../../recoil/userState";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderRight = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const scrollToIntroduceSection = () => {
    navigate("/");

    setTimeout(() => {
      // 최상단으로 스크롤
      window.scrollTo({
        top: 0, // 스크롤할 Y 좌표
        left: 0, // 스크롤할 X 좌표
        behavior: "smooth", // 부드러운 스크롤 효과
      });
    }, 0);
  };

  const scrollToDemoSection = () => {
    // 현재 경로가 "/"가 아니면 navigate를 호출
    if (location.pathname !== "/") {
      navigate("/");
    }

    // 스크롤을 내리기 위해 약간의 지연을 준다
    // 페이지가 이미 "/"에 있다면 바로 스크롤 내린다
    setTimeout(
      () => {
        const section = document.getElementById("demo-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      },
      location.pathname === "/" ? 0 : 350,
    );
  };

  const moveToChatPage = () => {
    navigate("/chat");

    setTimeout(() => {
      // 최상단으로 스크롤
      window.scrollTo({
        top: 0, // 스크롤할 Y 좌표
        left: 0, // 스크롤할 X 좌표
        behavior: "smooth", // 부드러운 스크롤 효과
      });
    }, 0);
  };
  const moveToArcadePage = () => {
    navigate("/arcade");

    setTimeout(() => {
      // 최상단으로 스크롤
      window.scrollTo({
        top: 0, // 스크롤할 Y 좌표
        left: 0, // 스크롤할 X 좌표
        behavior: "smooth", // 부드러운 스크롤 효과
      });
    }, 0);
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
          <span onClick={scrollToIntroduceSection}>소개</span>
        </li>
        <li>
          <span onClick={scrollToDemoSection}>체험</span>
        </li>
        <li>
          <span onClick={moveToChatPage}>대화하기</span>
          {/*<Link to="chat">이용하기</Link>*/}
        </li>
        {/*<li>*/}
        {/*  <span onClick={moveToArcadePage}>익히기</span>*/}
        {/*<Link to="arcade">익히기</Link>*/}
        {/*</li>*/}
      </ul>
      {/*<ul>*/}
      {/*  <li>*/}
      {/*    <button onClick={onClickLogout}>로그아웃</button>*/}
      {/*    /!*  모달 메뉴로 넣어야함 *!/*/}
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

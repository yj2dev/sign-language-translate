import { Link } from "react-router-dom";
import { HeaderLeftNav } from "../../styled";
import logoImg from "./img/logo.png";
const HeaderLeft = () => {
  const onClickLogo = () => {
    window.scrollTo(0, 0);
  };
  return (
    <HeaderLeftNav>
      <ul>
        <li>
          <Link to="/" onClick={onClickLogo}>
            <img src={logoImg} alt="logo" />
            <Link to="/">손말로 사랑해</Link>
            {/*'손말'이라는 표현을 사용하여 수어의 특징을 강조하고, '사랑해'라는 메시지를 직접적으로 표현합니다.*/}
          </Link>
        </li>
      </ul>
    </HeaderLeftNav>
  );
};

export default HeaderLeft;

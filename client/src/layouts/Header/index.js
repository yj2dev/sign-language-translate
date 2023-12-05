import { HeaderContainer } from "./styled";
import HeaderLeft from "./Section/HeaderLeft";
import HeaderCenter from "./Section/HeaderCenter";
import HeaderRight from "./Section/HeaderRight";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScroll, setIsScroll] = useState(0);
  const updateScroll = () => {
    setIsScroll(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  return (
    <HeaderContainer className={isScroll && "active"}>
      <HeaderLeft />
      <HeaderCenter />
      <HeaderRight />
    </HeaderContainer>
  );
};

export default Header;

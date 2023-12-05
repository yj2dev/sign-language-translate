import {
  FooterContainer,
  FooterContent,
  FooterCopyRight,
  FooterLink,
} from "./styled";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLink href="https://aivle.kt.co.kr/home/main/indexMain">
          KT 에이블 스쿨
          <br />
          홈페이지
        </FooterLink>
        <FooterCopyRight>
          © 2023 KT 에이블 스쿨 미니 프로젝트 7차. All rights reserved.
        </FooterCopyRight>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

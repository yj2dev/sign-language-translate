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
        <FooterCopyRight>
          © 2023 KT 에이블 스쿨 미니 프로젝트 7차 AI 전남/전북 26조. All rights
          reserved.
        </FooterCopyRight>
        <FooterLink href="https://aivle.kt.co.kr/home/main/indexMain">
          KT 에이블 스쿨
        </FooterLink>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

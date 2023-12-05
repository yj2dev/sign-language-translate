import { Container, IntroduceSection, DemoSection } from "./styled";
import bannerImg from "./img/banner.png";
import axios from "axios";

const LandingPage = () => {
  return (
    <Container>
      <IntroduceSection>소개섹션</IntroduceSection>
      <DemoSection>체험섹션</DemoSection>
    </Container>
  );
};

export default LandingPage;

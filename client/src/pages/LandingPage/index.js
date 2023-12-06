import { Container } from "./styled";
import IntroduceSection from "./Section/IntroduceSection";
import DemoSection from "./Section/DemoSection";
import Sign_Lang_Model from "./Section/Sign_Lang_Model";
import Team_info from "./Section/Team_info";

const LandingPage = () => {
  return (
    <Container>
      <IntroduceSection />
      <DemoSection />
      <Sign_Lang_Model />
      <Team_info />
    </Container>
  );
};

export default LandingPage;

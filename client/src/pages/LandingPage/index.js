import { Container } from "./styled";
import IntroduceSection from "./Section/IntroduceSection";
import DemoSection from "./Section/DemoSection";
const LandingPage = () => {
  return (
    <Container>
      <IntroduceSection />
      <DemoSection />
    </Container>
  );
};

export default LandingPage;

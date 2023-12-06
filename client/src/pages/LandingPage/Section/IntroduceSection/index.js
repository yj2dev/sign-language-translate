import { Container } from "./styled";
import signImg from "./img/signlang.png";
import { FaHandHoldingHeart } from "react-icons/fa";

const IntroduceSection = () => {
  return (
    <Container>
      <div className="intro_wrapper">
        <div>
          <div className="intro-content">
            <p className="intro">수어(手語) 대화형 AI</p>
            <div className="intro-title">
              <h2 className="intro">손말로 사랑해</h2>
              <FaHandHoldingHeart className="icon" />
            </div>
            <hr class="divider"></hr>
            <p className="intro">
              '손말'이라는 표현을 사용하여 수어의 특징을 강조하고,<br/>
              '사랑해'라는 메시지를 직접적으로 표현하는 이름입니다.
            </p>
            <p className="intro">
              수어(수화, Sign Language)를 사용하는 사용자들과의 <br/>
              원활한 의사소통을 돕기 위해 개발된 혁신적인 솔루션으로, <br/>
              청각장애인이 언어 소통의 장벽 없이 정보에 접근할 수 있도록 하며 <br/>
              일상 생활에서의 활동 및 서비스 이용에 대한 접근성을 향상시킵니다.
            </p>
          </div>
          <img src={signImg} className="sl-img" alt="sllogo" />
        </div>
      </div>
    </Container>
  );
};

export default IntroduceSection;

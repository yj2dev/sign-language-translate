import { Container } from "./styled";
import signImg from "./img/signlang.png";
import { FaHandHoldingHeart } from "react-icons/fa";

const IntroduceSection = () => {
  return <Container>
            <div className="intro_wrapper">
              <div>
                <div className="intro-content">
                  <p className="intro pin">수어(手語) 대화형 AI</p>
                  <div className="intro-title">
                  <h2 className="intro">손말로 사랑해</h2>
                  <FaHandHoldingHeart className="icon"/>
                  </div>
                  <hr class="divider"></hr>
                 <p className="intro">수어(수화, Sign Language)를 사용하는 사용자들과의 원활한 의사소통을 돕기 위해 개발된 혁신적인 솔루션(내용 수정 및 보완 예정)</p>
                </div>
                <img src={signImg} className="sl-img" alt="sllogo"/>
                <div className="intro-content">
                  <div className="intro-bottom">
                  <h3 className="intro">체험 하기</h3>
                  <hr class="divider2"></hr>
                  </div>
                </div>
              </div>
            </div>
            
          </Container>;
};

export default IntroduceSection;

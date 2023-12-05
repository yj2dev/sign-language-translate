import { Container } from "./styled";

const _defaultPage = () => {
  return (
    <Container>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>

      <p>한글 테스트</p>
      <p>
        위 코드에서 ReactDOM.render() 함수는 App 컴포넌트를 페이지의 root
        엘리먼트에 렌더링합니다. 이 과정에서 App.js 파일의 내용이 실행되기
        시작합니다. 따라서, 실행 순서는 다음과 같습니다: index.js가 실행되어
        애플리케이션의 진입점을 설정합니다. index.js에서 App 컴포넌트를
        불러옵니다. App 컴포넌트가 렌더링되면서 App.js의 내용이 실행됩니다.
        이러한 구조는 React 애플리케이션의 모듈화와 컴포넌트 기반 아키텍처를
        지원합니다. index.js는 애플리케이션을 초기화하고, App.js는
        애플리케이션의 주요 뷰나 로직을 정의합니다.
      </p>
      <p>한글 테스트</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
        deserunt dignissimos facilis nulla porro quas sunt tenetur voluptatem?
        Doloribus, unde?
      </p>
    </Container>
  );
};

export default _defaultPage;

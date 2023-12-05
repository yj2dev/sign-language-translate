import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import SignLanChatPage from "./pages/SignLanChatPage";
import SignArcadePage from "./pages/SignArcadePage";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      // 스크롤 여부에 따라 body의 margin-top을 조정합니다.
      document.body.style.marginTop = scrolled ? "72px" : "84px";
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="layout">
          <Routes>
            <Route path="/" element={LandingPage()} />
            <Route path="/chat" element={SignLanChatPage()} />
            <Route path="/arcade" element={SignArcadePage()} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

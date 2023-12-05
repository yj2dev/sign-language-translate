import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import SignLanChatPage from "./pages/SignLanChatPage";
import SignArcadePage from "./pages/SignArcadePage";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import TestPage from "./pages/TestPage";
import TestPage2 from "./pages/TestPage2";
import TestPage3 from "./pages/TestPage3";
import TestPage4 from "./pages/TestPage4";
import TestPage5 from "./pages/TestPage5";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="layout">
          <Routes>
            <Route path="/" element={LandingPage()} />
            <Route path="/test" element={TestPage()} />
            <Route path="/test2" element={TestPage2()} />
            <Route path="/test3" element={TestPage3()} />
            <Route path="/test4" element={TestPage4()} />
            <Route path="/test5" element={TestPage5()} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import axios from "axios";
import getCookie from "./utils/Cookie";

// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.xsrfHeaderName = "x-CSRFToken";
// axios.defaults.withCredentials = true;

// axios.defaults.baseURL = "http://localhost:8000"; // 개발 서버

// axios.defaults.baseURL = "http://13.212.5.129"; // 운영 서버, dongmin ec2

axios.defaults.baseURL = "http://222.105.252.28:8080"; // 운영 서버, yujin school

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.headers.common["X-CSRFToken"] = getCookie("csrftoken");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RecoilRoot>,
);

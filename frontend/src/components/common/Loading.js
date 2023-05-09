import React from "react";
import "../../styles/Loading.css";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import loading from "../../assets/perfume.mp4";
function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="loading-container">
      <video id="loading-video" src={loading} autoPlay loop muted></video>

      <Link to="/">
        <button className="main-page-btn">메인 페이지로 이동하기</button>
      </Link>
    </div>
  );
}

export default Loading;

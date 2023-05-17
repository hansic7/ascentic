import React, { useState, useEffect } from "react";
import "../../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import iconUser from "../../assets/iconUser.svg";
import iconBag from "../../assets/iconBag.svg";
import iconSearch from "../../assets/iconSearch.svg";
import { getCookie, removeCookie } from "../../utils/Cookies";
import Loading from "./Loading";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin } from "../../store/modules/login";

//HSM
//RouteTest.js 에 임시로 연결

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLogin);
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) return null;
  function handleLogout() {
    removeCookie("accessToken");
    dispatch(setIsLogin(false));
    navigate("/", { replace: true });
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = getCookie("accessToken");
      if (token) {
        await dispatch(setIsLogin(true));
      }
    };
    checkLoginStatus();
  }, [dispatch]);

  return (
    <div className="header-wrap">
      {/* flexbox 부모 컨테이너 */}
      <nav className="navbar">
        {/* flexbox 자식 컨테이너 #1 */}
        <div className="navbarLogo">
          <li>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              [a]scentic
            </Link>
          </li>
        </div>
        {/* flexbox 자식 컨테이너 #2 */}
        <ul className="navbarMenu">
          <li>
            <Link
              to="/storemain"
              style={{ textDecoration: "none", color: "black" }}
            >
              체험
            </Link>
          </li>
          <li>
            <Link
              to="/storemain"
              style={{ textDecoration: "none", color: "black" }}
            >
              스토어
            </Link>
          </li>
          <li>
            <Link
              to="/proddetail"
              style={{ textDecoration: "none", color: "black" }}
            >
              커뮤니티
            </Link>
          </li>
        </ul>
        {/* flexbox 자식 컨테이너 #3 */}
        <ul className="navbarIcon">
          <li>
            <img src={iconSearch} alt="iconSearch"></img>
          </li>
          <li>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <img src={iconUser} alt="iconMyPage"></img>
            </Link>
          </li>
          <li>
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <img src={iconBag} alt="iconBag"></img>
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <Link to="/" style={{ textDecoration: "none" }}>
                <button onClick={handleLogout}>임시</button>
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
};

export default Header;

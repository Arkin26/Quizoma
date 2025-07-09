import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("userEmail"));
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = ["Home", "Features", "Reviews"];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("userEmail"));
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);
    window.addEventListener("localStorageChange", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("localStorageChange", checkLoginStatus);
    };
  }, [location.pathname]);

  const handleAuthNavigation = (authPath) => {
    if (!["/login", "/signup"].includes(location.pathname)) {
      localStorage.setItem("redirectAfterAuth", location.pathname);
    }
    navigate(authPath);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowDropdown(false);
    window.dispatchEvent(new Event("localStorageChange"));
    navigate("/");
  };

  const handleRippleEffect = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.classList.add("ripple-effect");
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <header className={`quizoma-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="quizoma-header-container">

        {/* Left - Hamburger for mobile */}
        <div className="quizoma-mobile-menu-icon mobile-only">
          <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <svg width="24" height="24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Left - Desktop Nav */}
        <div className="quizoma-nav-left desktop-only">
          <ul className="quizoma-nav-links">
            {navItems.map((item) => (
              <li key={item}>
                <button className="quizoma-nav-link" onClick={handleRippleEffect}>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Center - Logo */}
        <div className="quizoma-logo" onClick={() => navigate("/")}>
          Quizoma
        </div>

        {/* Right - Auth/Profile */}
        <div className="quizoma-nav-right">
          {isLoggedIn ? (
            <div className="quizoma-profile-container">
              <button className="quizoma-profile-btn" onClick={() => setShowDropdown((prev) => !prev)}>
                <img src="/a.png" alt="User Icon" className="quizoma-profile-icon" />
              </button>
              {showDropdown && (
                <div className="quizoma-dropdown">
                
                  <button onClick={handleLogout} className="quizoma-logout-btn">
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => handleAuthNavigation("/login")}
                className="quizoma-login-link"
                onMouseDown={handleRippleEffect}
              >
                Login
              </button>
              <button
                className="quizoma-signup-btn"
                onClick={() => handleAuthNavigation("/signup")}
                onMouseDown={handleRippleEffect}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {showMobileMenu && (
        <div className="quizoma-mobile-dropdown">
          {navItems.map((item) => (
            <button key={item} className="quizoma-nav-link" onClick={handleRippleEffect}>
              {item}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

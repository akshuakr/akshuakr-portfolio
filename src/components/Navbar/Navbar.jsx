import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [scrollStopped, setScrollStopped] = useState(false);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let timeoutId;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      if (scrollY > lastScrollY) {
        setScrollDirection("down");
        setScrollStopped(false);
      } else if (scrollY < lastScrollY) {
        setScrollDirection("up");
        setScrollStopped(false);
      }
      lastScrollY = scrollY;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrollStopped(true);
        setScrollDirection("up"); // force show after stop
      }, 1400); // 200ms of no scrolling triggers stop
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
      clearTimeout(timeoutId);
    };
  }, []);

  return scrollDirection;
};

const Navbar = () => {
  const scrollDirection = useScrollDirection();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenResume = () => {
    navigate("/resume");
  };

  return (
    <div
      className={`${styles.container} ${
        scrollDirection === "down" ? styles.navbarHidden : styles.navbarVisible
      }`}
    >
      <div className={styles.content}>
        <div className={`${styles.logoText} cursor-invert-effect`}>akshuakr</div>
        <div className={styles.sideButtonsContainer}>
          <a className={`button button-sm button-dot dot-hover-effect `} href="#contact">
            <span data-text="Let's Talk" className={styles.jugad}>
              Let&apos;s Talk
            </span>
          </a>
          <div className={styles.menuContainer} ref={menuRef}>
            <button
              className={`button button-sm button-dot button-white dot-hover-effect`}
              onClick={toggleMenu}
            >
              <span data-text="Menu">Menu</span>
            </button>

            {isMenuOpen && (
              <div className={`${styles.dropdownMenu} ${isMenuOpen ? styles.show : ""}`}>
                <a href="#about" className={`${styles.menuItem} dot-hover-effect`}>
                  <i className="bi bi-arrow-right"></i>About
                </a>
                <a href="#services" className={`${styles.menuItem} dot-hover-effect`}>
                  <i className="bi bi-arrow-right"></i>Services
                </a>

                <a href="#contact" className={`${styles.menuItem} dot-hover-effect`}>
                  <i className="bi bi-arrow-right"></i>Contact
                </a>
                <a onClick={handleOpenResume} className={`${styles.menuItem} dot-hover-effect`}>
                  <i className="bi bi-arrow-right"></i>Resume
                </a>
              </div>
            )}
          </div>
        </div>
        {/* <div className={`dot-hover-effect`}>buttons</div> */}
      </div>
    </div>
  );
};

export default Navbar;

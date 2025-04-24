import { useState, useEffect } from "react";
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
      }, 2200); // 200ms of no scrolling triggers stop
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

          <button
            className={`button button-sm button-dot button-white dot-hover-effect`}
            onClick={() => console.log("Menu Clicked")}
          >
            <span data-text="Menu">Menu</span>
          </button>
        </div>
        {/* <div className={`dot-hover-effect`}>buttons</div> */}
      </div>
    </div>
  );
};

export default Navbar;

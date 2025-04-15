// 'use client';
import { useEffect } from "react";
// import Image from "next/image";
import styles from "./Hero.module.scss";

const Hero = () => {
  useEffect(() => {
    const wrapper = document.querySelector(`.${styles.heroNameWrapper}`);
    const name = document.querySelector(`.${styles.heroName}`);

    if (!wrapper || !name) return;

    const handleMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * -10;

      name.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleLeave = () => {
      name.style.transform = "rotateX(0deg) rotateY(0deg)";
    };

    wrapper.addEventListener("mousemove", handleMove);
    wrapper.addEventListener("mouseleave", handleLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMove);
      wrapper.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div className={styles.hero}>
      <div className={styles.heroNameWrapper}>
        <div className={`${styles.heroName} cursor-invert-effect`}>Akshansh Rohilla</div>
      </div>
      <div className={`${styles.tagline} cursor-invert-effect`}>
        Turning ideas into real, working products.
      </div>
      <div className={`${styles.heroDetailsContainer} `}>
        <div className={`${styles.left} `}>
          <div className={`${styles.leftChildren} cursor-invert-effect`}>
            <h6 className={`${styles.leftTitles} ${styles.sectionHeadingGradient}`}>Biography</h6>
            <p className={styles.leftDescriptions}>
              I’m a full-stack developer with 3 years of experience in the MERN stack, along with
              growing expertise in Next.js and FastAPI. I’ve worked in early-stage startups, where I
              built and shipped scalable web applications end-to-end and handled production
              deployments with reliable infrastructure.
            </p>
            <p className={styles.leftDescriptions}>
              A graduate of{" "}
              <span style={{ color: "white", fontWeight: "500" }}>
                Delhi Technological University (formerly DCE)
              </span>
              , I’m open to both freelance work and full-time roles where I can contribute and grow
              as a developer.
            </p>
          </div>

          <div className={`${styles.leftChildren} cursor-invert-effect`}>
            <h6 className={`${styles.leftTitles} ${styles.sectionHeadingGradient}`}>Skills</h6>
            <div className={styles["list-inline-dot"]}>
              <span>•&nbsp;&nbsp;JavaScript (ES6+)</span>
              <span>•&nbsp;&nbsp;React</span>
              <span>•&nbsp;&nbsp;Next.js</span>
              <span>•&nbsp;&nbsp;Node.js</span>
              <span>•&nbsp;&nbsp;Express</span>
              <span>•&nbsp;&nbsp;MongoDB</span>
              <span>•&nbsp;&nbsp;MySQL</span>
              <span>•&nbsp;&nbsp;Python (FastAPI)</span>
              <span>•&nbsp;&nbsp;REST APIs</span>
              <span>•&nbsp;&nbsp;Tailwind</span>
              <span>•&nbsp;&nbsp;HTML</span>
              <span>•&nbsp;&nbsp;CSS</span>
              <span>•&nbsp;&nbsp;Git</span>
              <span>•&nbsp;&nbsp;CI/CD</span>
              <span>•&nbsp;&nbsp;NGINX</span>
              <span>•&nbsp;&nbsp;PM2</span>
              <span>•&nbsp;&nbsp;Linux</span>
              <span>•&nbsp;&nbsp;AWS EC2</span>
              <span>•&nbsp;&nbsp;AWS S3</span>
              <span>•&nbsp;&nbsp;Microsoft Azure</span>
            </div>
          </div>

          <div className={styles.leftChildren}>
            <h6
              className={`${styles.leftTitles} ${styles.sectionHeadingGradient} cursor-invert-effect`}
            >
              Connect
            </h6>
            <div className={styles.connectIconsContainer}>
              <a className="button-circle button-circle-sm dot-hover-effect" href="#">
                <i className="bi bi-linkedin"></i>
                <i className="bi bi-linkedin"></i>
              </a>
              <a className="button-circle button-circle-sm dot-hover-effect" href="#">
                <i className="bi bi-github"></i>
                <i className="bi bi-github"></i>
              </a>
              <a className="button-circle button-circle-sm dot-hover-effect" href="#">
                <i className="bi bi-twitter-x"></i>
                <i className="bi bi-twitter-x"></i>
              </a>
            </div>
          </div>
        </div>
        <div className={`${styles.middle} `}>
          <div className={`${styles.circularWrapper} cursor-invert-effect`}>
            <img src="/images/akshu1000.png" alt="Akshu Don" width={320} height={320} priority />
          </div>
        </div>
        <div className={`${styles.right} cursor-invert-effect`}>
          <div className={`${styles.rightChildren}`}>
            <h6 className={`${styles.rightTitle} ${styles.sectionHeadingGradient}`}>
              YEARS OF EXPERIENCE
            </h6>
            <div className={styles.rightDetails}>3</div>
          </div>
          <div className={`${styles.rightChildren}`}>
            <h6 className={`${styles.rightTitle} ${styles.sectionHeadingGradient}`}>
              STARTUPS WORKED WITH
            </h6>
            <div className={styles.rightDetails}>3</div>
          </div>
          <div className={`${styles.rightChildren}`}>
            <h6 className={`${styles.rightTitle} ${styles.sectionHeadingGradient}`}>LOOKING FOR</h6>
            {/* <div className={styles.rightSpecial}>FREELANCE & FULL-TIME OPPORTUNITIES</div> */}
            <div className={styles.rightSpecial}>FREELANCE</div>
            <div className={styles.rightSpecial}>& FULL-TIME</div>
            <div className={styles.rightSpecial}>OPPORTUNITIES</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

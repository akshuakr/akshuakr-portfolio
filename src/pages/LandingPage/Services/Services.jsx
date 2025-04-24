import styles from "./Services.module.scss";

const Services = () => {
  return (
    <div className={`${styles.container} cursor-invert-effect`}>
      <div className={styles.left}>
        <div className={styles.sectionIntro}>Services</div>
        <div className={styles.sectionHeading}>
          What I <span className={styles.sectionHeadingGradient}>Do</span>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.serviceBox}>
          <div className={styles.serviceOrder}>01/</div>
          <div className={styles.serviceIconAndTitle}>
            <div className={styles.serviceIcon}>
              <img src="/icons/frontend.png" alt="frontend" width={32} height={32} />
            </div>
            <div className={styles.serviceTitle}>Frontend Development</div>
          </div>
          <div className={styles.serviceDesc}>
            Building responsive, accessible UIs with React, Next.js, TailwindCSS, and Material UI.
            Experienced in integrating tools like Google Analytics, Mixpanel, and Microsoft Clarity
            for user behavior insights. Proficient with Redux, component-driven architecture, and
            performance optimization across devices.
          </div>
        </div>
        <div className={styles.serviceBox}>
          <div className={styles.serviceOrder}>02/</div>
          <div className={styles.serviceIconAndTitle}>
            <div className={styles.serviceIcon}>
              <img src="/icons/backend.png" alt="backend" width={38} height={38} />
            </div>
            <div className={styles.serviceTitle}>Backend Engineering</div>
          </div>
          <div className={styles.serviceDesc}>
            Architecting scalable backend systems using Node.js, Express, and FastAPI. Proficient in
            designing RESTful APIs, implementing JWT-based auth, and integrating MongoDB, MySQL and
            Redis. Experienced with message brokers like Kafka for distributed processing and
            building API layers that interface with AI/ML models.
          </div>
        </div>
        <div className={styles.serviceBox}>
          <div className={styles.serviceOrder}>03/</div>
          <div className={styles.serviceIconAndTitle}>
            <div className={styles.serviceIcon}>
              <img src="/icons/devops.png" alt="Devops" width={40} height={40} />
            </div>
            <div className={styles.serviceTitle}>
              Deployment{" "}
              <span className={styles.lineBreak}>
                <br />
              </span>
              & DevOps
            </div>
          </div>
          <div className={styles.serviceDesc}>
            End-to-end deployment expertise using VPS, NGINX, and CI/CD pipelines. Skilled in
            Dockerizing applications, provisioning SSL certificates, and configuring secure,
            scalable environments. I’ve deployed both full-stack apps and AI/ML models to production
            with custom domain routing and robust server setups.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

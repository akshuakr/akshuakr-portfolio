import Navbar from "../../components/Navbar/Navbar";
import styles from "./LandingPage.module.scss";
import Hero from "./Hero/Hero";
import Services from "./Services/Services";
import Carousel from "./Carousel/Carousel";
import GlobalApiTrigger from "../../components/GlobalApiTrigger";
import Contact from "./Contact/Contact";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <Hero />
      <Services />
      <Carousel />
      <Contact />
      <div style={{ height: "100px" }}></div>
    </div>
  );
};

export default LandingPage;

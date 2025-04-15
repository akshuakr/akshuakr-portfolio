import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./LandingPage.module.scss";
import Hero from "./Hero/Hero";
import Hero695 from "./Hero/Hero695";
import Hero730 from "./Hero/Hero730";
import Services from "./Services/Services";
import Carousel from "./Carousel/Carousel";
import GlobalApiTrigger from "../../components/GlobalApiTrigger";
// import Hero695 from "./Hero/Hero695";
// import Hero730 from "./Hero/Hero730";
// import Services from "./Services/Services";
// import Carousel from "./Carousel/Carousel";

function useViewport() {
  // Initialize with dummy values because `window` is not available on the server
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // This function updates the viewport state with actual dimensions
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Call it initially so we get the dimensions on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewport;
}

const LandingPage = () => {
  const { height } = useViewport();

  let HeroComponent = Hero;

  //   if (height <= 695) {
  //     // HeroComponent = Hero695;
  //     HeroComponent = Hero;
  //   } else if (height <= 730) {
  //     // HeroComponent = Hero730;
  //     HeroComponent = Hero;
  //   } else {
  //     HeroComponent = Hero;
  //   }

  return (
    <div className={styles.container}>
      {/* <div style={{ height: '500px' }}>
                <Carousel />
            </div> */}

      {/* <GlobalApiTrigger /> */}

      <Navbar />
      <HeroComponent />
      <Services />
      <Carousel />
      <div style={{ height: "300px" }}></div>
    </div>
  );
};

export default LandingPage;

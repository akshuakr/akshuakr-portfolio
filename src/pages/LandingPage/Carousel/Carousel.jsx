import styles from "./Carousel.module.scss";

const Carousel = () => {
  // const imageContainerRef = useRef(null);

  // useEffect(() => {
  //     const containerWidth = imageContainerRef.current?.offsetWidth;
  //     // Optional: Use this width for dynamic scroll or debugging
  //     console.log("Container width:", containerWidth);
  // }, []);

  const images = [
    { path: "icons/html.svg", height: 240, width: 240 },
    { path: "icons/css.svg", height: 240, width: 240 },
    { path: "icons/js.svg", height: 240, width: 240 },
    { path: "icons/ts.svg", height: 240, width: 240 },
    { path: "icons/react.svg", height: 240, width: 240 },
    { path: "icons/tailwind.svg", height: 240, width: 240 },
    { path: "icons/redux.svg", height: 240, width: 240 },
    { path: "icons/nextjs.svg", height: 240, width: 240 },
    { path: "icons/mui.svg", height: 240, width: 240 },
    { path: "icons/git.svg", height: 240, width: 240 },
    { path: "icons/nodejs.svg", height: 270, width: 270 },
    { path: "icons/vue.svg", height: 240, width: 240 },
    { path: "icons/express.svg", height: 240, width: 240 },
    { path: "icons/mongo.svg", height: 240, width: 240 },
    { path: "icons/mysql.svg", height: 240, width: 240 },
    { path: "icons/redis.svg", height: 240, width: 240 },
    { path: "icons/kafka.svg", height: 240, width: 240 },
    { path: "icons/python.svg", height: 100, width: 300 },
    { path: "icons/fastapi.svg", height: 100, width: 300 },
    { path: "icons/nginx.svg", height: 100, width: 300 },
    { path: "icons/pm2.png", height: 100, width: 400 },
    { path: "icons/ubuntu.svg", height: 100, width: 400 },
    { path: "icons/linux.svg", height: 240, width: 240 },
    { path: "icons/aws.svg", height: 240, width: 240 },
    { path: "icons/azure.svg", height: 300, width: 300 },
    { path: "icons/postman.svg", height: 300, width: 300 },
  ];

  // const allImages = Array(6).fill(images).flat();
  const allImages = [...images, ...images];
  // const allImages = [...images];

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carousel}>
        {allImages.map((src, index) => (
          <div key={index} className={`${styles.imageContainer} dot-hover-effect`}>
            <img
              src={`/${src.path}`}
              height={src.height * 0.35}
              width={src.width * 0.35}
              alt="carousel item"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

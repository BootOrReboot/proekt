import { useEffect, useState } from "react";
import style from "../styles/mainPage.module.css";
import styleMax from "../styles/screenSizes/max.module.css";
import styleLap from "../styles/screenSizes/laptop.module.css";
import styleMob from "../styles/screenSizes/mobile.module.css";
import { useRouter } from "next/router";

export default function Loader() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);
  const [crash, setCrash] = useState(false);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
    };

    handleResize(); // Call once to set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (screenWidth >= 1366 && styles != styleMax) {
    setStyles(() => {
      return styleMax;
    });
  } else if (screenWidth >= 1024 && screenWidth <= 1365 && styles != styleLap) {
    setStyles(() => {
      return styleLap;
    });
  } else if (screenWidth >= 700 && screenWidth <= 1023 && styles != style) {
    setStyles(() => {
      return style;
    });
  } else if (screenWidth <= 699 && screenWidth > 0 && styles != styleMob) {
    setStyles(() => {
      return styleMob;
    });
  }
  setTimeout(() => {
    setCrash(true);
  }, 10000);
  setTimeout(() => {
    history.forward();
  }, 11000);
  return (
    <>
      <div className={styles.loaderChanger}>
        <div
          style={{
            width: "100%",
            display: "flex",
            height: "20vw",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <span
            className={styles.loaderScreen}
            style={{
              width: "20vw",
              height: "20vw",
            }}
          ></span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "4vw",
          margin: "2vw 0vw",
          fontWeight: "bold",
        }}
      >
        {crash ? "there's been a crash" : ""}
      </div>
    </>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
}

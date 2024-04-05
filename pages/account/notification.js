import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/mainPage.module.css";
import styleMax from "../../styles/screenSizes/max.module.css";
import styleLap from "../../styles/screenSizes/laptop.module.css";
import styleMob from "../../styles/screenSizes/mobile.module.css";
import { useState, useEffect } from "react";

export default function notify() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);
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
  return (
    <>
      <div className={styles.notifikacii}>
        <div className={styles.notifikacija}>
          <div className={styles.left}>
            <div className={styles.tekst}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              quas sunt nostrum culpa labore cupiditate, eius, molestiae
              architecto rem, omnis magnam facilis aut laborum deserunt ratione?
              Iusto, eveniet. Doloremque, ex!
            </div>
            <div className={styles.pratena}>
              <p>20 Maj 2024, 10:20</p>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.delete}>
              <a href="">
                <FontAwesomeIcon icon={faTrash} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

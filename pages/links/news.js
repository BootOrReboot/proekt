import style from "../../styles/mainPage.module.css";
import styleMax from "../../styles/screenSizes/max.module.css";
import styleLap from "../../styles/screenSizes/laptop.module.css";
import styleMob from "../../styles/screenSizes/mobile.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import test from "../../images/test-slika.png";
import mladite from "../../images/mladite.png";
import hemija from "../../images/hemija.jpg";
import { useState, useEffect } from "react";

export default function Vesti() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);
  const [news, setNews] = useState([
    { name: "Светски ден на бубрегот", image: test, date: "14 Март 2024" },
    { name: "Светски ден на бубрегот", image: test, date: "14 Март 2024" },
    {
      name: "Новинарски спринт во СОУ „Ѓорче Петров“",
      image: mladite,
      date: "08 Март 2024",
    },
    {
      name: "Општински натпревар по хемија",
      image: hemija,
      date: "18 Фебруари 2024",
    },
  ]);
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
      <div>
        <div className={styles.vestiNastani}>
          <h1>Вести и Настани</h1>
          <div>
            {news.map((el, index) => (
              <div className={styles.vestNastan} key={index}>
                <div className={styles.slika}>
                  <Image src={el.image} alt="test slika" />
                </div>
                <div className={styles.naslov}>
                  <p>{el.name}</p>
                </div>
                <div className={styles.objaveno}>
                  <FontAwesomeIcon icon={faCalendar} />
                  {el.date} by Елена Ѓорѓиевска
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

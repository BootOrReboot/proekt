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
import jazik from "../../images/denNaJazici.jpg";
import { useState, useEffect } from "react";

import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

export default function Vesti() {
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);
  const t = useTranslations("News");
  const [news, setNews] = useState([
    {
      name: "Ден на Јазиците и Уметноста",
      image: jazik,
      date: `11 ${t("Април")} 2024`,
      id: 1,
    },
    {
      name: "Светски ден на бубрегот",
      image: test,
      date: `14 ${t("Март")} 2024`,
      id: 2,
    },
    {
      name: "Новинарски спринт",
      image: mladite,
      date: `08 ${t("Март")} 2024`,
      id: 3,
    },
    {
      name: "Општински натпревар по хемија",
      image: hemija,
      date: `18 ${t("Фебруари")} 2024`,
      id: 4,
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
  const moreNews = (e) => {
    const page = e.target.parentNode.id;

    if (router.locale == "al") {
      window.location.href = `/al/newspaper?page=${page}`;
    } else {
      window.location.href = `/newspaper?page=${page}`;
    }
  };
  return (
    <>
      <div>
        <div className={styles.vestiNastani}>
          <h1>{t("Вести и Настани")}</h1>
          <div>
            {news.map((el, index) => (
              <div className={styles.vestNastan} key={index}>
                <div className={styles.slika}>
                  <Image src={el.image} alt="test slika" />
                </div>
                <div className={styles.naslov} id={el.id} onClick={moreNews}>
                  <p>{t(el.name)}</p>
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
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}

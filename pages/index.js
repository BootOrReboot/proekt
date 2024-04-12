import style from "../styles/mainPage.module.css";
import styleMax from "../styles/screenSizes/max.module.css";
import styleLap from "../styles/screenSizes/laptop.module.css";
import styleMob from "../styles/screenSizes/mobile.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import vraboteni from "../images/vraboteni.png";
import bezbednost from "../images/bezbednost.png";
import test from "../images/test-slika.png";
import mladite from "../images/mladite.png";
import hemija from "../images/hemija.jpg";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function Home() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);
  const t = useTranslations("Main");
  const t2 = useTranslations("News");
  const [news, setNews] = useState([
    {
      name: "Светски ден на бубрегот",
      image: test,
      date: `14 ${t2("Март")} 2024`,
    },
    {
      name: "Новинарски спринт",
      image: mladite,
      date: `08 ${t2("Март")} 2024`,
    },
    {
      name: "Општински натпревар по хемија",
      image: hemija,
      date: `18 ${t2("Фебруари")} 2024`,
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
    <div>
      <div className={styles.content}>
        <div className={styles.text}>
          <div className={`${styles.center} ${styles.split}`}>
            <span>{t("Ѓорче Петров")}</span>
            <span>{t("Крива Паланка")}</span>
          </div>
        </div>
        <div className={styles.img}>
          <Image
            src={vraboteni}
            alt="Gjorce Petrov Vraboteni"
            priority={true}
          />
        </div>
      </div>
      <div className={`${styles.content} ${styles.reverse} `}>
        <div className={styles.img}>
          <Image src={bezbednost} alt="Bezbednost" />
        </div>
        <div className={styles.text}>
          <div className={styles.split}>
            <h1>{t("Безбедност")}</h1>
            <p>{t("Безбедност опис")}</p>
          </div>
        </div>
      </div>
      <div className={styles.socialLinks}>
        <a
          href="https://www.youtube.com/@sougorcepetrovkrivapalanka4547"
          target="_blank"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a href="https://www.facebook.com/gjorcepetrov" target="_blank">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://www.instagram.com/uz_gjorchepetrov/" target="_blank">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>

      <div className={styles.vestiNastani}>
        <h1>{t2("Вести и Настани")}</h1>
        <div>
          {news.map((el, index) => (
            <div className={styles.vestNastan} key={index}>
              <div className={styles.slika}>
                <Image src={el.image} alt="test slika" />
              </div>
              <div className={styles.naslov}>
                <p>{t2(el.name)}</p>
              </div>
              <div className={styles.objaveno}>
                <FontAwesomeIcon icon={faCalendar} />
                {el.date} by Елена Ѓорѓиевска
              </div>
            </div>
          ))}
        </div>
        <div className={styles.povekje}>
          <button
            type="button"
            onClick={() =>
              (window.location.href =
                "https://master--sougjorchepetrov.netlify.app/links/news")
            }
          >
            {t("Повеќе")} &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
}

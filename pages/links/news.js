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
  const [news, setNews] = useState([]);
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
    };

    const lang = router.locale;
    fetch("https://master--sougjorchepetrov.netlify.app/api/topNews", {
      method: "POST",
      body: JSON.stringify({ lang: lang, site: "news" }),
    })
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        console.log(res);
        setNews(res.message);
      });

    handleResize(); // Call once to set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [router.locale]);
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
                  <Image
                    src={el.image}
                    alt="test slika"
                    width={50}
                    height={50}
                  />
                </div>
                <div className={styles.naslov} id={el.id} onClick={moreNews}>
                  <p>{el.name}</p>
                </div>
                <div className={styles.objaveno}>
                  <FontAwesomeIcon icon={faCalendar} />
                  {el.day + " " + t(el.month) + " " + el.year} by Елена
                  Ѓорѓиевска
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

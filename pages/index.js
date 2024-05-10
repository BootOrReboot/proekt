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
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

export default function Home() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);
  const t = useTranslations("Main");
  const t2 = useTranslations("News");
  const router = useRouter();
  const [news, setNews] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
    };

    const lang = router.locale;
    fetch("https://master--sougjorchepetrov.netlify.app/api/topNews", {
      method: "POST",
      body: JSON.stringify({ lang: lang }),
    })
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        console.log(res);
        setNews(res.message);
        setSpinner(false);
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
  const toPage = (e) => {
    const page = e.target.parentNode.id;

    if (router.locale == "al") {
      window.location.href = `/al/newspaper?page=${page}`;
    } else {
      window.location.href = `/newspaper?page=${page}`;
    }
  };
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

        {spinner ? (
          <div className={styles.loaderChanger}>
            <div
              style={{
                width: "15vw",
                height: "12vw",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <span className={styles.loader}></span>
            </div>
          </div>
        ) : (
          <div style={{ flexDirection: "row-reverse" }}>
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
                <div className={styles.naslov} id={el.id} onClick={toPage}>
                  <p>{el.name}</p>
                </div>
                <div className={styles.objaveno}>
                  <FontAwesomeIcon icon={faCalendar} />
                  {el.day + " " + t2(el.month) + " " + el.year} by Елена
                  Ѓорѓиевска
                </div>
              </div>
            ))}
          </div>
        )}

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

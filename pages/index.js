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
import { useWindowSize } from "@uidotdev/usehooks";

export default function Home() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);
  const [news, setNews] = useState([
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
  setTimeout(() => {
    setScreenWidth(window.innerWidth);
  }, 1);
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

  console.log(screenWidth);
  console.log(styles);
  return (
    <div>
      <div className={styles.content}>
        <div className={styles.text}>
          <div
            className={`${style.center} ${style.split} ${styleMax.center} ${styleMax.split} ${styleLap.center} ${styleLap.split} ${styleMob.center} ${styleMob.split}`}
          >
            <span>Ѓорче Петров</span>
            <span>Крива Паланка</span>
          </div>
        </div>
        <div
          className={`${style.img} ${styleLap.img} ${styleMax.img} ${styleMob.img}`}
        >
          <Image
            src={vraboteni}
            alt="Gjorce Petrov Vraboteni"
            priority={true}
          />
        </div>
      </div>
      <div
        className={`${style.content} ${style.reverse} ${styleMax.content} ${styleMax.reverse} ${styleMob.content} ${styleMob.reverse} ${styleLap.content} ${styleLap.reverse}`}
      >
        <div
          className={`${style.img} ${styleMob.img} ${styleMax.img} ${styleLap.img}`}
        >
          <Image src={bezbednost} alt="Bezbednost" />
        </div>
        <div
          className={`${style.text} ${styleLap.text} ${styleMax.text} ${styleMob.text}`}
        >
          <div
            className={`${style.split} ${styleLap.split} ${styleMax.split} ${styleMob.split}`}
          >
            <h1>Безбедност</h1>
            <p>
              Во Гимназија „Ѓорче Петров“, веруваме дека нашите ученици имаат
              право на чиста, безбедна и заштитена средина за учење. Ние го
              направивме тоа можно со регуларни процедури за чистење и
              дезинфекција, како и почитување на сите безбедносни протоколи.
              Нашата мисија е да го повисиме знаењето на нашите ученици со
              систем кој ги поддржува да станат граѓани кои ќе можат да бидат
              успешни во глобалната усогласеност.
            </p>
          </div>
        </div>
      </div>
      <div
        className={`${style.socialLinks} ${styleLap.socialLinks} ${styleMax.socialLinks} ${styleMob.socialLinks}`}
      >
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

      <div
        className={`${style.vestiNovosti} ${styleLap.vestiNovosti} ${styleMax.vestiNovosti} ${styleMob.vestiNovosti}`}
      >
        <h1>Вести и Настани</h1>
        <div>
          {news.map((el, index) => (
            <div className={styles.vestNovost} key={index}>
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
        <div
          className={`${style.povekje} ${styleLap.povekje} ${styleMax.povekje} ${styleMob.povekje}`}
        >
          <button
            type="button"
            onClick={() => (window.location.href = "vesti-nastani.html")}
          >
            Повеќе &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}

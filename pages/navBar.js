import style from "../styles/mainPage.module.css";
import styleMax from "../styles/screenSizes/max.module.css";
import styleLap from "../styles/screenSizes/laptop.module.css";
import styleMob from "../styles/screenSizes/mobile.module.css";
import Image from "next/image";
import profile from "../images/icons/profile.svg";
import notif from "../images/icons/notification.svg";
import logo from "../images/logo-gjorce-petrov.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function Nav() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);
  useEffect(() => {
    setScreenWidth(window.innerWidth);
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
  function openNav() {
    const nav = document.getElementById("navigation");
    const socials = document.getElementById("socials");

    nav.style.display = "flex";
    socials.style.display = "flex";
    document.documentElement.style.overflowY = "hidden";
  }
  function closeNav() {
    const nav = document.getElementById("navigation");
    const socials = document.getElementById("socials");

    nav.style.display = "none";
    socials.style.display = "none";
    document.documentElement.style.overflowY = "auto";
  }
  return (
    <>
      <section className={styles.section}>
        <div className={styles.account}>
          <button className={styles.notification} type="button">
            <Image src={notif} alt="Notifications" />
          </button>
          <button type="button" className={styles.profile}>
            <Image src={profile} alt="Profile" />
          </button>
        </div>
      </section>
      <header className={styles.header}>
        <div>
          <a href="/">
            <Image src={logo} alt="logo" />
          </a>
          <p>Ѓорче Петров</p>
        </div>
        <nav>
          <button
            type="button"
            className={styles.menu}
            id="menu-button"
            onClick={openNav}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <div id={styles.navigation}>
            <a
              onClick={closeNav}
              className={`${styles.mobile} ${styles.close} `}
            >
              <FontAwesomeIcon icon={faWindowClose} />
            </a>
            <div className={styles.center}>
              <a href="">За Гимназијата</a>
              <a href="">Струки</a>
              <a href="">Уписи</a>
              <a href="links/news">Вести и Настани</a>
              <a href="">Проекти</a>
              <a href="">Часови</a>
              <a href="" className={styles.mobile}>
                Логин
              </a>
              <a href="" className={styles.mobile}>
                Регистрација
              </a>
            </div>

            <div
              className={`${styles.socialLinks} ${styles.mobile} `}
              id="socials"
              style={{ display: "none" }}
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
              <a
                href="https://www.instagram.com/uz_gjorchepetrov/"
                target="_blank"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

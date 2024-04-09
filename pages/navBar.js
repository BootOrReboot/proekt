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
import { useState, useEffect, use } from "react";
import Button from "@mui/material/Button";
import { useSearchParams } from "next/navigation";
export default function Nav() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);
  const [error, setError] = useState("");
  const [haveNotification, setHaveNotification] = useState(false);
  const search = useSearchParams();

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
    };

    const search = new URLSearchParams(window.location.search);

    const user = search.get("username");
    if (user !== null) {
      fetch("http://localhost:3000/api/notificationAPI/checkSeenNotif", {
        method: "POST",
        body: user,
      })
        .then((r) => {
          return r.json();
        })
        .then((res) => {
          console.log(res.message);
          setHaveNotification(res.message);
        });
    } else {
      setHaveNotification(false);
    }

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
  function openNav() {
    const socials = document.getElementById("socials");
    const nav = document.getElementById(`${styles.navigation}`);
    if (window.innerWidth < 700) socials.style.display = "flex";
    document.documentElement.style.overflowY = "hidden";
    nav.style.display = "flex";
    nav.style.animationName = `${styles.fadeIn}`;
    nav.style.animationPlayState = "running";
  }
  function closeNav() {
    const nav = document.getElementById(`${styles.navigation}`);
    const socials = document.getElementById("socials");
    socials.style.display = "none";
    document.documentElement.style.overflowY = "auto";
    nav.style.animationName = `${styles.fadeOut}`;
    if (screenWidth < 700) {
      nav.style.display = "none";
    } else {
      setTimeout(() => {
        nav.style.display = "none";
      }, 1000);
    }
  }
  function toggleProfileDropdown() {
    const accDropdown = document.getElementById(`${styles.accountDropdown}`);
    if (accDropdown.style.display == "none") {
      accDropdown.style.display = "flex";
    } else {
      accDropdown.style.display = "none";
    }
  }
  const notify = () => {
    const username = search.get("username");
    if (username !== null) {
      fetch("http://localhost:3000/api/notificationAPI/changeSeen", {
        method: "POST",
        body: username,
      })
        .then((r) => {
          return r.json();
        })
        .then((res) => {
          console.log(res);
          location.href = `http://localhost:3000/account/notification?username=${username}`;
        });
    } else {
      setError("Register or Login First");
    }
  };
  return (
    <>
      <section className={styles.section}>
        <div className={styles.account}>
          {error === "" ? (
            haveNotification ? (
              <Button className={styles.notification} onClick={notify}>
                <Image src={notif} alt="Notifications" />
              </Button>
            ) : (
              <Button
                className={styles.notification}
                onClick={notify}
                style={{ position: "relative" }}
              >
                <Image src={notif} alt="Notifications" />
                <div
                  style={{
                    width: "25%",
                    height: "25%",
                    backgroundColor: "white",
                    border: "red solid 4px",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                ></div>
              </Button>
            )
          ) : haveNotification ? (
            <>
              <Button
                className={styles.notification}
                onClick={notify}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Image src={notif} alt="Notifications" />
                <div id="error">{error}</div>
              </Button>
            </>
          ) : (
            <>
              <Button
                className={styles.notification}
                onClick={notify}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Image src={notif} alt="Notifications" />
                <div
                  style={{
                    width: "25%",
                    height: "15%",
                    backgroundColor: "white",
                    border: "red solid 4px",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                ></div>
                <div id="error">{error}</div>
              </Button>
            </>
          )}

          <Button className={styles.profile} onClick={toggleProfileDropdown}>
            <Image src={profile} alt="Profile" />
          </Button>
        </div>
      </section>
      <div id={styles.accountDropdown} style={{ display: "none" }}>
        <div className={styles.options}>
          <a href="loginregister.html">Профил</a>
          <a href="">Поставувања</a>
          <a href="">Одјави се</a>
        </div>
      </div>
      <header className={styles.header}>
        <div>
          <a href="/">
            <Image src={logo} alt="logo" priority={true} />
          </a>
          <p>Ѓорче Петров</p>
        </div>
        <nav>
          <button
            type="button"
            className={styles.menu}
            id="menu-button"
            onClick={openNav}
            style={{ overflow: "hidden" }}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          {screenWidth >= 1024 ? (
            <div id={styles.navigation} style={{ display: "flex" }}>
              <a
                onClick={closeNav}
                className={`${styles.mobile} ${styles.close} `}
              >
                <FontAwesomeIcon icon={faWindowClose} />
              </a>
              <div className={styles.center}>
                <a href="http://localhost:3000/links/schoolInfo">
                  За Гимназијата
                </a>
                <a href="">Струки</a>

                <a href="http://localhost:3000/links/news">Вести и Настани</a>

                <a className={styles.mobile} href="loginregister.html">
                  Профил
                </a>
                <a className={styles.mobile} href="notifikacii.html">
                  Нотификации
                </a>
                <a className={styles.mobile} href="">
                  Поставувања
                </a>
                <a className={styles.mobile} href="">
                  Одјави се
                </a>
              </div>

              <div
                className={`${styles.socialLinks} ${styles.mobile} `}
                id="socials"
                style={{ display: "none" }}
              >
                <a
                  className={styles.socialTags}
                  href="https://www.youtube.com/@sougorcepetrovkrivapalanka4547"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a
                  href="https://www.facebook.com/gjorcepetrov"
                  target="_blank"
                  className={styles.socialTags}
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  className={styles.socialTags}
                  href="https://www.instagram.com/uz_gjorchepetrov/"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          ) : (
            <div id={styles.navigation} style={{ display: "none" }}>
              <a
                onClick={closeNav}
                className={`${styles.mobile} ${styles.close} `}
              >
                <FontAwesomeIcon icon={faWindowClose} />
              </a>
              <div className={styles.center}>
                <a href="links/schoolInfo">За Гимназијата</a>
                <a href="">Струки</a>
                <a href="">Уписи</a>
                <a href="links/news">Вести и Настани</a>
                <a href="">Проекти</a>
                <a href="">Часови</a>
                <a className={styles.mobile} href="loginregister.html">
                  Профил
                </a>
                <a className={styles.mobile} href="notifikacii.html">
                  Нотификации
                </a>
                <a className={styles.mobile} href="">
                  Поставувања
                </a>
                <a className={styles.mobile} href="">
                  Одјави се
                </a>
              </div>

              <div
                className={`${styles.socialLinks} ${styles.mobile} `}
                id="socials"
                style={{ display: "none" }}
              >
                <a
                  className={styles.socialTags}
                  href="https://www.youtube.com/@sougorcepetrovkrivapalanka4547"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a
                  href="https://www.facebook.com/gjorcepetrov"
                  target="_blank"
                  className={styles.socialTags}
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  className={styles.socialTags}
                  href="https://www.instagram.com/uz_gjorchepetrov/"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}

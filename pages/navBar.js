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
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { deleteCookie, getCookie } from "cookies-next";

export default function Nav() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);
  const [spinner, setSpinner] = useState(false);
  const [haveNotification, setHaveNotification] = useState(false);
  const [account, setAccount] = useState({});
  const [hasId, setHasId] = useState(false);
  const [loggedIn, setLoggedIn] = useState("hidden");
  const [admin, setAdmin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
    };

    const cookie = getCookie("id");
    console.log(cookie);
    if (cookie !== undefined) {
      fetch(
        "https://master--sougjorchepetrov.netlify.app/api/notificationAPI/checkSeenNotif",
        {
          method: "POST",
          body: cookie,
        }
      )
        .then((r) => {
          return r.json();
        })
        .then((res) => {
          setHaveNotification(res.message.seen);
          setAccount(res.message);
          setAdmin(res.message.isAdmin);
        });
      setHasId(true);
      setLoggedIn("visible");
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
    const username = getCookie("id");

    if (username !== null) {
      setSpinner(true);
      fetch(
        "https://master--sougjorchepetrov.netlify.app/api/notificationAPI/changeSeen",
        {
          method: "POST",
          body: username,
        }
      )
        .then((r) => {
          return r.json();
        })
        .then((res) => {
          console.log(res);
          location.href = `https://master--sougjorchepetrov.netlify.app/account/notification`;
        });
    } else {
      setError("Register or Login First");
    }
  };
  const notifyM = () => {
    const username = getCookie("id");

    if (username !== null) {
      setSpinner(true);
      fetch(
        "https://master--sougjorchepetrov.netlify.app/api/notificationAPI/changeSeen",
        {
          method: "POST",
          body: username,
        }
      )
        .then((r) => {
          return r.json();
        })
        .then((res) => {
          console.log(res);
          window.location.href = `https://master--sougjorchepetrov.netlify.app/account/notification`;
        });
    } else {
      setErrorM("Register or Login First");
    }
  };
  const LogOut = () => {
    setSpinner(true);
    fetch(
      "https://master--sougjorchepetrov.netlify.app/api/loginRegAPI/loggingOut",
      {
        method: "POST",
        body: account.email,
      }
    )
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        console.log(res.message);
        deleteCookie("id");
        window.location.href = "/";
        setSpinner(false);
      });
  };
  const lang = router.locale == "mk" ? "al" : "mk";
  const t = useTranslations("Nav");
  const key = Object.keys(router.query)[0];
  const value = Object.values(router.query)[0];
  // if (spinner) {
  //   setTimeout(() => {
  //     setSpinner(false);
  //   }, 11000);
  // }
  return (
    <>
      <section className={styles.section}>
        {key === undefined ? (
          <Link
            href={router.pathname}
            locale={lang}
            style={{ fontSize: "2.5vw", fontWeight: "bold" }}
          >
            {lang.toUpperCase()}
          </Link>
        ) : (
          <Link
            href={router.pathname + `?${key}=${value}`}
            locale={lang}
            style={{ fontSize: "2.5vw", fontWeight: "bold" }}
          >
            {lang.toUpperCase()}
          </Link>
        )}

        <div className={styles.account}>
          {haveNotification ? (
            spinner ? (
              <>
                <div
                  style={{
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span className={styles.loaderScreenNav} style={{}}></span>
                </div>
              </>
            ) : (
              <Button
                className={styles.notification}
                onClick={notify}
                style={{ visibility: `${loggedIn}` }}
              >
                <Image src={notif} alt="Notifications" />
              </Button>
            )
          ) : spinner ? (
            <>
              <div
                style={{
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <span className={styles.loaderScreenNav} style={{}}></span>
              </div>
            </>
          ) : (
            <Button
              className={styles.notification}
              onClick={notify}
              style={{ position: "relative", visibility: `${loggedIn}` }}
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
          )}

          <Button className={styles.profile} onClick={toggleProfileDropdown}>
            <Image src={profile} alt="Profile" />
          </Button>
        </div>
      </section>
      <div id={styles.accountDropdown} style={{ display: "none" }}>
        <div className={styles.options}>
          {Object.keys(account).length !== 0 ? (
            <>
              <Link href=".">{account.firstName + " " + account.lastName}</Link>
              <a onClick={LogOut}>
                {spinner ? (
                  <>
                    <div
                      style={{
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        className={styles.loaderScreenNav}
                        style={{}}
                      ></span>
                    </div>
                  </>
                ) : (
                  t("Одјави се")
                )}
              </a>
            </>
          ) : (
            <>
              <Link href="https://master--sougjorchepetrov.netlify.app/loginAndRegister">
                {t("Логирај се или Регистрирај се")}
              </Link>
            </>
          )}
        </div>
      </div>
      <header className={styles.header}>
        <div>
          <Link href="/">
            <Image src={logo} alt="logo" priority={true} />
          </Link>
          <p>{t("Ѓорче Петров")}</p>
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
                {hasId ? (
                  admin ? (
                    <>
                      <Link href={`/links/schoolInfo?id=${account.email}`}>
                        {t("За Гимназијата")}
                      </Link>
                      <Link href={`/branches?id=${account.email}`}>
                        {t("Струки")}
                      </Link>

                      <Link href={`/links/news?id=${account.email}`}>
                        {t("Вести и Настани")}
                      </Link>
                      <Link href={`/adminPanel?id=${account.email}`}>
                        {t("Admin")}
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href={`/links/schoolInfo?id=${account.email}`}>
                        {t("За Гимназијата")}
                      </Link>
                      <Link href={`/branches?id=${account.email}`}>
                        {t("Струки")}
                      </Link>

                      <Link href={`/links/news?id=${account.email}`}>
                        {t("Вести и Настани")}
                      </Link>
                    </>
                  )
                ) : admin ? (
                  <>
                    <Link href={`/links/schoolInfo`}>
                      {t("За Гимназијата")}
                    </Link>
                    <Link href={`/branches`}>{t("Струки")}</Link>

                    <Link href={`/links/news`}>{t("Вести и Настани")}</Link>
                    <Link href={`/adminPanel`}>{t("Admin")}</Link>
                  </>
                ) : (
                  <>
                    <Link href={`/links/schoolInfo`}>
                      {t("За Гимназијата")}
                    </Link>
                    <Link href={`/branches`}>{t("Струки")}</Link>

                    <Link href={`/links/news`}>{t("Вести и Настани")}</Link>
                  </>
                )}
                {Object.keys(account).length !== 0 ? (
                  <>
                    <Link className={styles.mobile} href=".">
                      {account.firstName + " " + account.lastName}
                    </Link>
                    <a
                      className={styles.mobile}
                      onClick={notifyM}
                      style={{ visibility: `${loggedIn}` }}
                    >
                      {spinner ? (
                        <>
                          <div
                            style={{
                              overflow: "hidden",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <span
                              className={styles.loaderScreenNav}
                              style={{}}
                            ></span>
                          </div>
                        </>
                      ) : (
                        t("Нотификации")
                      )}
                    </a>
                    <a className={styles.mobile} onClick={LogOut}>
                      {spinner ? (
                        <>
                          <div
                            style={{
                              overflow: "hidden",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <span
                              className={styles.loaderScreenNav}
                              style={{}}
                            ></span>
                          </div>
                        </>
                      ) : (
                        t("Одјави се")
                      )}
                    </a>
                  </>
                ) : (
                  <>
                    <Link
                      className={styles.mobile}
                      href="https://master--sougjorchepetrov.netlify.app/loginAndRegister"
                      style={{ wordWrap: "break-word", width: "100%" }}
                    >
                      {t("Логирај се или Регистрирај се")}
                    </Link>
                    <a
                      className={styles.mobile}
                      onClick={notifyM}
                      style={{ visibility: `${loggedIn}` }}
                    >
                      {spinner ? (
                        <>
                          <div
                            style={{
                              overflow: "hidden",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <span
                              className={styles.loaderScreenNav}
                              style={{}}
                            ></span>
                          </div>
                        </>
                      ) : (
                        t("Нотификации")
                      )}
                    </a>
                  </>
                )}
              </div>

              <div
                className={`${styles.socialLinks} ${styles.mobile} `}
                id="socials"
                style={{ display: "none" }}
              >
                <Link
                  className={styles.socialTags}
                  href="https://www.youtube.com/@sougorcepetrovkrivapalanka4547"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </Link>
                <Link
                  href="https://www.facebook.com/gjorcepetrov"
                  target="_blank"
                  className={styles.socialTags}
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </Link>
                <Link
                  className={styles.socialTags}
                  href="https://www.instagram.com/uz_gjorchepetrov/"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
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
                {hasId ? (
                  <>
                    {key === undefined ? (
                      <Link
                        href={router.pathname}
                        locale={lang}
                        style={{
                          fontSize: "5.5vw",
                          display: "flex",
                          fontWeight: "bold",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        {lang.toUpperCase()}
                      </Link>
                    ) : (
                      <Link
                        href={router.pathname + `?${key}=${value}`}
                        locale={lang}
                        style={{
                          fontSize: "5.5vw",
                          display: "flex",
                          fontWeight: "bold",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        {lang.toUpperCase()}
                      </Link>
                    )}
                    {admin ? (
                      <>
                        <Link href={`/links/schoolInfo?id=${account.email}`}>
                          {t("За Гимназијата")}
                        </Link>
                        <Link href={`/branches?id=${account.email}`}>
                          {t("Струки")}
                        </Link>

                        <Link href={`/links/news?id=${account.email}`}>
                          {t("Вести и Настани")}
                        </Link>
                        <Link href={`/adminPanel?id=${account.email}`}>
                          {t("Admin")}
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link href={`/links/schoolInfo?id=${account.email}`}>
                          {t("За Гимназијата")}
                        </Link>
                        <Link href={`/branches?id=${account.email}`}>
                          {t("Струки")}
                        </Link>

                        <Link href={`/links/news?id=${account.email}`}>
                          {t("Вести и Настани")}
                        </Link>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {key === undefined ? (
                      <Link
                        href={router.pathname}
                        locale={lang}
                        style={{
                          fontSize: "5.5vw",
                          display: "flex",
                          fontWeight: "bold",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        {lang.toUpperCase()}
                      </Link>
                    ) : (
                      <Link
                        href={router.pathname + `?${key}=${value}`}
                        locale={lang}
                        style={{
                          fontSize: "5.5vw",
                          display: "flex",
                          fontWeight: "bold",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        {lang.toUpperCase()}
                      </Link>
                    )}
                    {admin ? (
                      <>
                        <Link href={`/links/schoolInfo`}>
                          {t("За Гимназијата")}
                        </Link>
                        <Link href={`/branches`}>{t("Струки")}</Link>

                        <Link href={`/links/news`}>{t("Вести и Настани")}</Link>
                        <Link href={`/adminPanel`}>{t("Admin")}</Link>
                      </>
                    ) : (
                      <>
                        <Link href={`/links/schoolInfo`}>
                          {t("За Гимназијата")}
                        </Link>
                        <Link href={`/branches`}>{t("Струки")}</Link>

                        <Link href={`/links/news`}>{t("Вести и Настани")}</Link>
                      </>
                    )}
                  </>
                )}

                {Object.keys(account).length === 0 ? (
                  <>
                    <Link
                      className={styles.mobile}
                      href="https://master--sougjorchepetrov.netlify.app/loginAndRegister"
                      style={{ wordWrap: "break-word", width: "100%" }}
                    >
                      {t("Логирај се или Регистрирај се")}
                    </Link>
                    <a
                      className={styles.mobile}
                      onClick={notifyM}
                      style={{ visibility: `${loggedIn}` }}
                    >
                      {spinner ? (
                        <>
                          <div
                            style={{
                              overflow: "hidden",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <span
                              className={styles.loaderScreenNav}
                              style={{}}
                            ></span>
                          </div>
                        </>
                      ) : (
                        t("Нотификации")
                      )}
                    </a>
                  </>
                ) : (
                  <>
                    <Link className={styles.mobile} href=".">
                      {account.firstName + " " + account.lastName}
                    </Link>
                    <a
                      className={styles.mobile}
                      onClick={notifyM}
                      style={{ visibility: `${loggedIn}` }}
                    >
                      {spinner ? (
                        <>
                          <div
                            style={{
                              overflow: "hidden",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <span
                              className={styles.loaderScreenNav}
                              style={{}}
                            ></span>
                          </div>
                        </>
                      ) : (
                        t("Нотификации")
                      )}
                    </a>

                    <a className={styles.mobile} onClick={LogOut}>
                      {spinner ? (
                        <>
                          <div
                            style={{
                              overflow: "hidden",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <span
                              className={styles.loaderScreenNav}
                              style={{}}
                            ></span>
                          </div>
                        </>
                      ) : (
                        t("Одјави се")
                      )}
                    </a>
                  </>
                )}
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
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
}

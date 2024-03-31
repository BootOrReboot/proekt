import style from "../styles/mainPage.module.css";
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

export default function Nav() {
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
      <section className={style.section}>
        <div className={style.account}>
          <button className={style.notifications} type="button">
            <Image src={notif} alt="Notifications" />
          </button>
          <button type="button" className={style.profile}>
            <Image src={profile} alt="Profile" />
          </button>
        </div>
      </section>
      <header className={style.header}>
        <div>
          <a href="/">
            <Image src={logo} />
          </a>
          <p>Ѓорче Петров</p>
        </div>
        <nav>
          <button
            type="button"
            className={style.menu}
            id="menu-button"
            onClick={openNav}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <ul id="navigation">
            <a onClick={closeNav} className={`${style.close} ${style.mobile}`}>
              <FontAwesomeIcon icon={faWindowClose} />
            </a>
            <li>
              <a href="">За Гимназијата</a>
            </li>
            <li>
              <a href="">Струки</a>
            </li>
            <li>
              <a href="">Уписи</a>
            </li>
            <li>
              <a href="links/news">Вести и Настани</a>
            </li>
            <li>
              <a href="">Проекти</a>
            </li>
            <li>
              <a href="">Часови</a>
            </li>
            <li className={style.mobile}>
              <a href="">Логин</a>
            </li>
            <li className={style.mobile}>
              <a href="">Регистрација</a>
            </li>
            <div
              className={`${style.socialLinks}${style.mobile}`}
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
          </ul>
        </nav>
      </header>
    </>
  );
}

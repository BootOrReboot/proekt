import style from "../styles/mainPage.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import profile from "../images/icons/profile.svg";
import notif from "../images/icons/notification.svg";
import logo from "../images/logo-gjorce-petrov.svg";
import vraboteni from "../images/vraboteni.png";
import bezbednost from "../images/bezbednost.png";
import test from "../images/test-slika.png";
import mladite from "../images/mladite.png";
import hemija from "../images/hemija.jpg";

export default function Home() {
  return (
    <div>
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
          <a href="index.html">
            <Image src={logo} />
          </a>
          <p>Ѓорче Петров</p>
        </div>
        <nav>
          <button type="button" className={style.menu}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <ul>
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
              <a href="vesti-nastani.html">Вести и Настани</a>
            </li>
            <li>
              <a href="">Проекти</a>
            </li>
            <li>
              <a href="">Часови</a>
            </li>
          </ul>
        </nav>
      </header>
      <div className={style.content}>
        <div className={style.text}>
          <div className={`${style.center} ${style.split}`}>
            <span>Ѓорче Петров</span>
            <span>Крива Паланка</span>
          </div>
        </div>
        <div className={style.img}>
          <Image src={vraboteni} alt="Gjorce Petrov Vraboteni" />
        </div>
      </div>
      <div className={`${style.content} ${style.reverse}`}>
        <div className={style.img}>
          <Image src={bezbednost} alt="Bezbednost" />
        </div>
        <div className={style.text}>
          <div className={style.split}>
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
      <div className={style.socialLinks}>
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

      <div className={style.vestiNovosti}>
        <h1>Вести и Настани</h1>
        <div>
          <div className={style.vestiNovosti}>
            <div className={style.slika}>
              <Image src={test} alt="test slika" />
            </div>
            <div className={style.naslov}>
              <p>Светски ден на бубрегот</p>
            </div>
            <div className={style.objaveno}>
              <FontAwesomeIcon icon={faCalendar} />
              14 Март 2024 by Елена Ѓорѓиевска
            </div>
          </div>
          <div className={style.vestiNovosti}>
            <div className={style.slika}>
              <Image src={mladite} alt="test slika" />
            </div>
            <div className={style.naslov}>
              <p>Новинарски спринт во СОУ „Ѓорче Петров“</p>
            </div>
            <div className={style.objaveno}>
              <FontAwesomeIcon icon={faCalendar} />
              08 Март 2024 by Елена Ѓорѓиевска
            </div>
          </div>
          <div className={style.vestiNovosti}>
            <div className={style.slika}>
              <Image src={hemija} alt="test slika" />
            </div>
            <div className={style.naslov}>
              <p>Општински натпревар по хемија</p>
            </div>
            <div className={style.objaveno}>
              <FontAwesomeIcon icon={faCalendar} />
              18 Фебруари 2024 by Елена Ѓорѓиевска
            </div>
          </div>
        </div>
        <div className={style.povekje}>
          <button type="button" onclick="location.href='vesti-nastani.html'">
            Повеќе &#8594;
          </button>
        </div>
      </div>

      <footer className={style.footer}>
        <div className={style.adresa}>
          <p>
            ул.8-ми Октомври бр. 91
            <br />
            1330 Крива Паланка
            <br />
            Република Северна Македонија
            <br />
            031/375-025
            <br />
            <a href="mailto:sougorcepetrov@yahoo.com">
              sougorcepetrov@yahoo.com
            </a>
          </p>
        </div>
        <div className={style.contact}>
          <form action="">
            <div className={style.info}>
              <p>Ime</p>
              <input type="text" />
              <p>Prezime</p>
              <input type="text" />
            </div>
            <div className={style.email}>
              <p>Email *</p>
              <input type="email" />
              <p>Naslov</p>
              <input type="text" />

              <p>Napisete poraka...</p>
              <textarea name="poraka" id="poraka" cols="23" rows="5"></textarea>
              <br />
              <button type="submit">Испрати</button>
            </div>
          </form>
        </div>
      </footer>
      <p className={style.copyright}>© 2019. Сите права се задржани</p>
    </div>
  );
}

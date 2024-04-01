import style from "../../styles/mainPage.module.css";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faYoutube,
  faFacebook,
  faInstagram,
  faCalendar,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import profile from "../../images/icons/profile.svg";
import notif from "../../images/icons/notification.svg";
import logo from "../../images/logo-gjorce-petrov.svg";
import test from "../../images/test-slika.png";
import mladite from "../../images/mladite.png";
import hemija from "../../images/hemija.jpg";

export default function vesti() {
  return (
    <div>
      <div className={style.vestiNovosti}>
        <h1>Вести и Настани</h1>
        <div>
          <div className={style.vestNovost}>
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
          <div className={style.vestNovost}>
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
          <div className={style.vestNovost}>
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
          <div className={style.vestNovost}>
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

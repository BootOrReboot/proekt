import style from "../styles/mainPage.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import profile from "../images/icons/profile.svg";
import notif from "../images/icons/notification.svg";
import logo from "../images/logo-gjorce-petrov.svg";
import vraboteni from "../images/vraboteni.png";
import bezbednost from "../images/bezbednost.png";
import test from "../images/test-slika.png";
import mladite from "../images/mladite.png";
import hemija from "../images/hemija.jpg";
import Xicon from "../images/x-symbol.png";
import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState({
    original: "",
    subject: "",
    info: "",
  });
  const addInfo = (e) => {
    const { name, value } = e.target;
    setEmail({
      ...email,
      [name]: value,
    });
  };
  const sendMail = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/mailSending", {
      method: "POST",
      body: JSON.stringify({
        transportEmail: email.original,
        title: email.subject,
        text: email.info,
      }),
    })
      .then((res1) => {
        return res1.json();
      })
      .then((res2) => {
        console.log(res2.message);
      });
  };

  return (
    <div>
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
        <div className={style.povekje}>
          <button type="button" onclick="location.href='vesti-nastani.html'">
            Повеќе &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}

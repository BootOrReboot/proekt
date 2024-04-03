import { useState, useEffect } from "react";
import style from "../styles/mainPage.module.css";
import styleMax from "../styles/screenSizes/max.module.css";
import styleLap from "../styles/screenSizes/laptop.module.css";
import styleMob from "../styles/screenSizes/mobile.module.css";

export default function Footer() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);
  const [email, setEmail] = useState({
    original: "",
    subject: "",
    info: "",
    fullName: "",
    surname: "",
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
        fullName: email.fullName + " " + email.surname,
      }),
    })
      .then((res1) => {
        return res1.json();
      })
      .then((res2) => {
        console.log(res2.message);
      });
  };
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
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.adresa}>
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
        <div className={styles.contact}>
          <form>
            <div className={styles.info}>
              <p>Ime</p>
              <input type="text" onChange={addInfo} name="fullName" />
              <p>Prezime</p>
              <input type="text" onChange={addInfo} name="surname" />
            </div>
            <div className={styles.email}>
              <p>Email *</p>
              <input type="email" onChange={addInfo} name="original" />
              <p>Naslov</p>
              <input type="text" onChange={addInfo} name="subject" />

              <p>Napisete poraka...</p>
              <textarea
                name="info"
                id="poraka"
                cols="23"
                rows="5"
                style={{ resize: "none" }}
                onChange={addInfo}
              ></textarea>
              <br />
              <button onClick={sendMail}>Испрати</button>
            </div>
          </form>
        </div>
      </footer>
      <p className={styles.copyright}>© 2019. Сите права се задржани</p>
    </>
  );
}

import { useState } from "react";
import style from "../styles/mainPage.module.css";
import styleMax from "../styles/screenSizes/max.module.css";
import styleLap from "../styles/screenSizes/laptop.module.css";
import styleMob from "../styles/screenSizes/mobile.module.css";

export default function Footer() {
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
    <>
      <footer
        className={`${style.footer} ${styleMob.footer} ${styleMax.footer} ${styleLap.footer}`}
      >
        <div
          className={`${style.adresa} ${styleMob.adresa} ${styleMax.adresa} ${styleLap.adresa}`}
        >
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
        <div
          className={`${style.contact} ${styleMob.contact} ${styleMax.contact} ${styleLap.contact}`}
        >
          <form>
            <div
              className={`${style.info} ${styleMob.info} ${styleMax.info} ${styleLap.info}`}
            >
              <p>Ime</p>
              <input type="text" />
              <p>Prezime</p>
              <input type="text" />
            </div>
            <div
              className={`${style.email} ${styleMob.email} ${styleMax.email} ${styleLap.email}`}
            >
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
      <p
        className={`${style.copyright} ${styleMob.copyright} ${styleMax.copyright} ${styleLap.copyright}`}
      >
        © 2019. Сите права се задржани
      </p>
    </>
  );
}

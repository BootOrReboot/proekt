import { useState } from "react";
import style from "../styles/mainPage.module.css";

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
          <form>
            <div className={style.info}>
              <p>Ime</p>
              <input type="text" />
              <p>Prezime</p>
              <input type="text" />
            </div>
            <div className={style.email}>
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
                onChange={addInfo}
              ></textarea>
              <br />
              <button onClick={sendMail}>Испрати</button>
            </div>
          </form>
        </div>
      </footer>
      <p className={style.copyright}>© 2019. Сите права се задржани</p>
    </>
  );
}

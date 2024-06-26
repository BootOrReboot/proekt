import { useState, useEffect } from "react";
import style from "../styles/mainPage.module.css";
import styleMax from "../styles/screenSizes/max.module.css";
import styleLap from "../styles/screenSizes/laptop.module.css";
import styleMob from "../styles/screenSizes/mobile.module.css";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";

export default function Footer() {
  const [year, setYear] = useState("");
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);
  const [form, setForm] = useState({
    email: "",
    title: "",
    letter: "",
    fullName: "",
    surname: "",
  });
  const [mistakes, setMistakes] = useState({
    email: false,
    title: false,
    letter: false,
    fullName: false,
    surname: false,
  });
  const t = useTranslations("Footer");
  const addInfo = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const validateFields = (e) => {
    e.preventDefault();

    const newMistakes = {};

    if (form.fullName === "") {
      newMistakes.fullName = true;
    } else {
      newMistakes.fullName = false;
    }

    if (form.surname === "") {
      newMistakes.surname = true;
    } else {
      newMistakes.surname = false;
    }

    if (
      form.email === "" ||
      !/^[\w-\.]+@[\w-]+\.[\w-]{2,4}$/.test(form.email)
    ) {
      newMistakes.email = true;
    } else {
      newMistakes.email = false;
    }

    if (form.title === "") {
      newMistakes.title = true;
    } else {
      newMistakes.title = false;
    }

    if (form.letter === "") {
      newMistakes.letter = true;
    } else {
      newMistakes.letter = false;
    }

    setMistakes(newMistakes);
    if (
      newMistakes.fullName == false &&
      newMistakes.surname == false &&
      newMistakes.email == false &&
      newMistakes.letter == false &&
      newMistakes.title == false
    ) {
      sendMail();
    }
    console.log(mistakes);
  };
  const sendMail = (e) => {
    e.preventDefault();
    fetch("https://master--sougjorchepetrov.netlify.app/api/mailSending", {
      method: "POST",
      body: JSON.stringify({
        transportEmail: form.email,
        title: form.title,
        text: form.letter,
        fullName: form.fullName + " " + form.surname,
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
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
    };

    const today = new Date();
    setYear(today.getFullYear().toString());

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
            <br />
            <b>{t("Изработиле:")}</b>
            <br />
            Филип Стојановски
            <br />
            Сергеј Крстевски
          </p>
        </div>
        <div className={styles.contact}>
          <form>
            <div className={styles.info}>
              {mistakes.fullName ? (
                <>
                  <p style={{ color: "red" }}>{t("Име")} *Field is empty*</p>
                  <input
                    type="text"
                    onChange={addInfo}
                    name="fullName"
                    style={{ borderColor: "red" }}
                  />
                </>
              ) : (
                <>
                  <p>{t("Име")}</p>
                  <input type="text" onChange={addInfo} name="fullName" />
                </>
              )}
              {mistakes.surname ? (
                <>
                  <p style={{ color: "red" }}>
                    {t("Презиме")} *Field is empty*
                  </p>
                  <input
                    type="text"
                    onChange={addInfo}
                    name="surname"
                    style={{ borderColor: "red" }}
                  />
                </>
              ) : (
                <>
                  <p>{t("Презиме")}</p>
                  <input type="text" onChange={addInfo} name="surname" />
                </>
              )}
            </div>
            <div className={styles.email}>
              <div className={styles.emailPad}>
                {mistakes.email ? (
                form.email === "" ? (
                  <>
                    <p style={{ color: "red" }}>Email *Field is empty*</p>
                    <input
                      type="email"
                      onChange={addInfo}
                      name="email"
                      style={{ borderColor: "red" }}
                    />
                  </>
                ) : (
                  <>
                    <p style={{ color: "red" }}>Email *Incorrect email*</p>
                    <input
                      type="email"
                      onChange={addInfo}
                      name="email"
                      style={{ borderColor: "red" }}
                    />
                  </>
                )
              ) : (
                <>
                  <p>Email *</p>
                  <input type="email" onChange={addInfo} name="email" />
                </>
              )}
              {mistakes.title ? (
                <>
                  <p style={{ color: "red" }}>{t("Наслов")} *Field is empty</p>
                  <input
                    type="text"
                    onChange={addInfo}
                    name="title"
                    style={{ borderColor: "red" }}
                  />
                </>
              ) : (
                <>
                  <p>{t("Наслов")}</p>
                  <input type="text" onChange={addInfo} name="title" />
                </>
              )}
            </div>
              
              {mistakes.letter ? (
                <>
                  <p style={{ color: "red" }}>
                    {t("Напишете порака")}... *Field is empty*
                  </p>
                  <textarea
                    name="letter"
                    id="poraka"
                    cols="23"
                    rows="5"
                    style={{ resize: "none", borderColor: "red" }}
                    onChange={addInfo}
                  ></textarea>
                </>
              ) : (
                <>
                  <p>{t("Напишете порака")}... </p>
                  <textarea
                    name="letter"
                    id="poraka"
                    cols="23"
                    rows="5"
                    style={{ resize: "none" }}
                    onChange={addInfo}
                  ></textarea>
                </>
              )}

              <br />
              <Button onClick={validateFields}>{t("Испрати")}</Button>
            </div>
          </form>
        </div>
      </footer>
      <p className={styles.copyright}>
        © {year}. {t("Сите права се задржани")}
      </p>
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

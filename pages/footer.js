import { useState, useEffect } from "react";
import style from "../styles/mainPage.module.css";
import styleMax from "../styles/screenSizes/max.module.css";
import styleLap from "../styles/screenSizes/laptop.module.css";
import styleMob from "../styles/screenSizes/mobile.module.css";
import { Button } from "@mui/material";

export default function Footer() {
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

    console.log(newMistakes);
  };
  const sendMail = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/mailSending", {
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
            <b>Изработиле:</b>
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
                  <p style={{ color: "red" }}>Име *Field is empty*</p>
                  <input
                    type="text"
                    onChange={addInfo}
                    name="fullName"
                    style={{ borderColor: "red" }}
                  />
                </>
              ) : (
                <>
                  <p>Име</p>
                  <input type="text" onChange={addInfo} name="fullName" />
                </>
              )}
              {mistakes.surname ? (
                <>
                  <p style={{ color: "red" }}>Презиме *Field is empty*</p>
                  <input
                    type="text"
                    onChange={addInfo}
                    name="surname"
                    style={{ borderColor: "red" }}
                  />
                </>
              ) : (
                <>
                  <p>Презиме</p>
                  <input type="text" onChange={addInfo} name="surname" />
                </>
              )}
            </div>
            <div className={styles.email}>
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
                  <p style={{ color: "red" }}>Наслов *Field is empty</p>
                  <input
                    type="text"
                    onChange={addInfo}
                    name="title"
                    style={{ borderColor: "red" }}
                  />
                </>
              ) : (
                <>
                  <p>Наслов</p>
                  <input type="text" onChange={addInfo} name="title" />
                </>
              )}
              {mistakes.letter ? (
                <>
                  <p style={{ color: "red" }}>
                    Напишете порака... *Field is empty*
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
                  <p>Напишете порака... </p>
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
              <Button onClick={validateFields}>Испрати</Button>
            </div>
          </form>
        </div>
      </footer>
      <p className={styles.copyright}>© 2019. Сите права се задржани</p>
    </>
  );
}

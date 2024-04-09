import style from "../styles/mainPage.module.css";
import styleMax from "../styles/screenSizes/max.module.css";
import styleLap from "../styles/screenSizes/laptop.module.css";
import styleMob from "../styles/screenSizes/mobile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";

export default function login() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);
  const [information, setInformation] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    classNumber: "I-1",
  });
  const [mistakes, setMistakes] = useState({
    email: false,
    classNumber: false,
    password: false,
    name: false,
    lastName: false,
  });
  const [logOrReg, setLogOrReg] = useState(true);
  const [log, setLog] = useState({
    email: "",
    password: "",
  });
  const [logMistakes, setLogMistakes] = useState({
    email: false,
    password: false,
  });

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
  function loginChoice() {
    const naslov = document.getElementById("registerloginNaslov");
    const text = document.getElementById("registerloginText");
    const kopce = document.getElementById("registerloginButton");
    const registerContent = document.getElementById(`${styles.register}`);

    naslov.textContent = "Логирање";
    text.textContent = "Логирајте се да добиете пристап до вашиот акаунт.";
    registerContent.style.display = "none";
    kopce.textContent = "Логирај се";
    setLogOrReg(false);
  }
  function registerChoice() {
    const naslov = document.getElementById("registerloginNaslov");
    const text = document.getElementById("registerloginText");
    const kopce = document.getElementById("registerloginButton");
    const registerContent = document.getElementById(styles.register);
    const resetPasswordText = document.getElementById(
      `${styles.resetPassword}`
    );

    naslov.textContent = "Регистрација";
    text.textContent =
      "Регистрирајте се за да добивате известувања и да ги следите најновите вести кое училиштето ги нуди.";
    registerContent.style.display = "flex";
    resetPasswordText.style.display = "none";
    kopce.textContent = "Регистрирај се";
    setLogOrReg(true);
  }
  const change = (e) => {
    const { name, value } = e.target;
    setInformation({
      ...information,
      [name]: value,
    });
  };
  const signUp = () => {
    fetch("http://localhost:3000/api/loginRegAPI/register", {
      method: "POST",
      body: JSON.stringify({
        name: information.name,
        surname: information.lastName,
        email: information.email,
        password: information.password,
        classNumber: information.classNumber,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        window.location.href = `/?id=${res.message}`;
      });
  };
  const validateFields = (e) => {
    e.preventDefault();

    const newMistakes = {};

    if (information.name === "") {
      newMistakes.name = true;
    } else {
      newMistakes.name = false;
    }

    if (information.lastName === "") {
      newMistakes.lastName = true;
    } else {
      newMistakes.lastName = false;
    }

    if (
      information.email === "" ||
      !/^[\w-\.]+@[\w-]+\.[\w-]{2,4}$/.test(information.email)
    ) {
      newMistakes.email = true;
    } else {
      newMistakes.email = false;
    }

    if (information.password === "" || information.password.length < 8) {
      newMistakes.password = true;
    } else {
      newMistakes.password = false;
    }

    if (information.classNumber === "") {
      newMistakes.classNumber = false;
    } else {
      newMistakes.classNumber = false;
    }

    setMistakes(newMistakes);

    if (
      newMistakes.name == false &&
      newMistakes.lastName == false &&
      newMistakes.email == false &&
      newMistakes.password == false
    ) {
      signUp();
    }
    console.log(newMistakes);
  };
  const changeLog = (e) => {
    const { name, value } = e.target;
    setLog({
      ...log,
      [name]: value,
    });
  };
  const validateFieldsLog = (e) => {
    e.preventDefault();
    const newMistakes = {};
    if (log.email === "" || !/^[\w-\.]+@[\w-]+\.[\w-]{2,4}$/.test(log.email)) {
      newMistakes.email = true;
    } else {
      newMistakes.email = false;
    }

    if (log.password === "") {
      newMistakes.password = true;
    } else {
      newMistakes.password = false;
    }
    setLogMistakes(newMistakes);

    if (newMistakes.email == false && newMistakes.password == false) {
      signIn();
    }
  };
  const signIn = () => {
    fetch("http://localhost:3000/api/loginRegAPI/register", {
      method: "POST",
      body: JSON.stringify({
        email: log.email,
        password: log.password,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        window.location.href = `/?id=${res.message}`;
      });
  };
  return (
    <>
      <div className={styles.bgColor}></div>
      <div className={styles.RegisterLogin}>
        <div className={styles.choice}>
          <button type="button" onClick={loginChoice}>
            Login
          </button>
          <button type="button" onClick={registerChoice}>
            Register
          </button>
          <div className={styles.right}>
            <a href="/" className={`${styles.close} ${styles.mobile}`}>
              <FontAwesomeIcon icon={faWindowClose} />
            </a>
          </div>
        </div>
        <div className={styles.neznam}>
          <div className={styles.text}>
            <h1 id="registerloginNaslov">Register</h1>
            <p id="registerloginText">
              Регистрирајте се за да добивате известувања и да ги следите
              најновите вести кое училиштето ги нуди.
            </p>
          </div>
          <div className={styles.main}>
            <form action="">
              <div id={styles.register}>
                {logOrReg ? (
                  <>
                    <input
                      type="text"
                      placeholder="Ime"
                      onChange={change}
                      name="name"
                    />
                    <input
                      type="text"
                      placeholder="Prezime"
                      onChange={change}
                      name="lastName"
                    />
                    <select name="classNumber" id="" onChange={change}>
                      <option value="I-1">I-1</option>
                      <option value="I-2">I-2</option>
                      <option value="I-3">I-3</option>
                      <option value="I-4">I-4</option>
                      <option value="I-5">I-5</option>
                      <option value="I-6">I-6</option>
                      <option value="I-7">I-7</option>
                      <option value="I-8">I-8</option>
                      <option></option>
                      <option value="II-1">II-1</option>
                      <option value="II-2">II-2</option>
                      <option value="II-3">II-3</option>
                      <option value="II-4">II-4</option>
                      <option value="II-5">II-5</option>
                      <option value="II-6">II-6</option>
                      <option value="II-7">II-7</option>
                      <option value="II-8">II-8</option>
                      <option></option>
                      <option value="III-1">III-1</option>
                      <option value="III-2">III-2</option>
                      <option value="III-3">III-3</option>
                      <option value="III-4">III-4</option>
                      <option value="III-5">III-5</option>
                      <option value="III-6">III-6</option>
                      <option value="III-7">III-7</option>
                      <option value="III-8">III-8</option>
                      <option></option>
                      <option value="IV-1">IV-1</option>
                      <option value="IV-2">IV-2</option>
                      <option value="IV-3">IV-3</option>
                      <option value="IV-4">IV-4</option>
                      <option value="IV-5">IV-5</option>
                      <option value="IV-6">IV-6</option>
                      <option value="IV-7">IV-7</option>
                      <option value="IV-8">IV-8</option>
                    </select>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Ime"
                      onChange={changeLog}
                      name="name"
                    />
                    <input
                      type="text"
                      placeholder="Prezime"
                      onChange={changeLog}
                      name="lastName"
                    />
                    <select name="classNumber" id="" onChange={changeLog}>
                      <option value="I-1">I-1</option>
                      <option value="I-2">I-2</option>
                      <option value="I-3">I-3</option>
                      <option value="I-4">I-4</option>
                      <option value="I-5">I-5</option>
                      <option value="I-6">I-6</option>
                      <option value="I-7">I-7</option>
                      <option value="I-8">I-8</option>
                      <option></option>
                      <option value="II-1">II-1</option>
                      <option value="II-2">II-2</option>
                      <option value="II-3">II-3</option>
                      <option value="II-4">II-4</option>
                      <option value="II-5">II-5</option>
                      <option value="II-6">II-6</option>
                      <option value="II-7">II-7</option>
                      <option value="II-8">II-8</option>
                      <option></option>
                      <option value="III-1">III-1</option>
                      <option value="III-2">III-2</option>
                      <option value="III-3">III-3</option>
                      <option value="III-4">III-4</option>
                      <option value="III-5">III-5</option>
                      <option value="III-6">III-6</option>
                      <option value="III-7">III-7</option>
                      <option value="III-8">III-8</option>
                      <option></option>
                      <option value="IV-1">IV-1</option>
                      <option value="IV-2">IV-2</option>
                      <option value="IV-3">IV-3</option>
                      <option value="IV-4">IV-4</option>
                      <option value="IV-5">IV-5</option>
                      <option value="IV-6">IV-6</option>
                      <option value="IV-7">IV-7</option>
                      <option value="IV-8">IV-8</option>
                    </select>
                  </>
                )}
              </div>
              {logOrReg ? (
                <>
                  <input
                    type="email"
                    placeholder="E-Mail"
                    onChange={change}
                    name="email"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={change}
                    name="password"
                  />
                </>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="E-Mail"
                    onChange={changeLog}
                    name="email"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={changeLog}
                    name="password"
                  />
                </>
              )}
              <div className={styles.neznam2}>
                {logOrReg ? (
                  <button
                    type="submit"
                    id="registerloginButton"
                    onClick={validateFields}
                  >
                    Регистрирај се
                  </button>
                ) : (
                  <button
                    type="submit"
                    id="registerloginButton"
                    onClick={validateFieldsLog}
                  >
                    Регистрирај се
                  </button>
                )}
                <button type="reset">Ресетирај</button>
                <span id={styles.resetPassword}>
                  {"Доколку ја имате заборавено вашата лозинка кликнете "}
                  <a href="">тука</a> за да ја промените.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

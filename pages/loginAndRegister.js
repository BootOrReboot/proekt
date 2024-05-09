import style from "../styles/mainPage.module.css";
import styleMax from "../styles/screenSizes/max.module.css";
import styleLap from "../styles/screenSizes/laptop.module.css";
import styleMob from "../styles/screenSizes/mobile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

export default function Login() {
  const router = useRouter();
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
  const [wrongEmail, setWrongEmail] = useState("");
  const [wrongLogin, setWrongLogin] = useState("");

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
    };
    const search = new URLSearchParams(window.location.search);

    const user = search.get("prob");
    const user2 = search.get("prob1");
    if (user !== null) {
      setWrongLogin(user);
      loginChoice();
    }
    if (user2 !== null) {
      setWrongEmail(user2);
    }

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
    if (logOrReg) {
      router.push(
        `https://master--sougjorchepetrov.netlify.app/loaderScreen?path=Login`
      );
      fetch(
        "https://master--sougjorchepetrov.netlify.app/api/loginRegAPI/register",
        {
          method: "POST",
          body: JSON.stringify({
            name: information.name,
            surname: information.lastName,
            email: information.email,
            password: information.password,
            classNumber: information.classNumber,
            function: "register",
          }),
        }
      )
        .then((r) => {
          if (r.status === 200) {
            return r.json();
          } else {
            return "Email Already Exists";
          }
        })
        .then((res) => {
          if (res !== "Email Already Exists") {
            window.location.href = `/?id=${res.message}`;
            setCookie("id", res.message);
          } else {
            router.push(
              `https://master--sougjorchepetrov.netlify.app/loginAndRegister?prob1=${"Email Already Exists"}`
            );
            setWrongEmail();
          }
          // console.log(res.status);
        });
    } else {
      router.push(
        "https://master--sougjorchepetrov.netlify.app/loaderScreen?path=Login"
      );
      fetch(
        "https://master--sougjorchepetrov.netlify.app/api/loginRegAPI/register",
        {
          method: "POST",
          body: JSON.stringify({
            email: information.email,
            password: information.password,
            function: "login",
          }),
        }
      )
        .then((r) => {
          if (r.status === 200) {
            return r.json();
          } else {
            return "Email Or Password is Incorrect";
          }
        })
        .then((res) => {
          if (res !== "Email Or Password is Incorrect") {
            window.location.href = `/?id=${res.message}`;
            setCookie("id", res.message);
          } else {
            router.push(
              `https://master--sougjorchepetrov.netlify.app/loginAndRegister?prob=${res}`
            );
          }
        });
    }
  };
  const validateFields = (e) => {
    e.preventDefault();
    if (logOrReg) {
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
    } else {
      const newMistakes = {};
      if (
        information.email === "" ||
        !/^[\w-\.]+@[\w-]+\.[\w-]{2,4}$/.test(information.email)
      ) {
        newMistakes.email = true;
      } else {
        newMistakes.email = false;
      }

      if (information.password === "") {
        newMistakes.password = true;
      } else {
        newMistakes.password = false;
      }
      setMistakes(newMistakes);

      if (newMistakes.email == false && newMistakes.password == false) {
        signUp();
      }
    }
  };
  console.log(wrongLogin);
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
            <Link href="/" className={`${styles.close} ${styles.mobile}`}>
              <FontAwesomeIcon icon={faWindowClose} />
            </Link>
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
                <>
                  {mistakes.name ? (
                    <input
                      type="text"
                      placeholder="Ime *Empty Field*"
                      onChange={change}
                      name="name"
                      className={styles.errorName}
                      style={{ borderColor: "red", marginRight: "5px" }}
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Ime"
                      onChange={change}
                      name="name"
                      style={{ marginRight: "5px" }}
                    />
                  )}

                  {mistakes.lastName ? (
                    <input
                      type="text"
                      placeholder="Prezime *Empty Field*"
                      onChange={change}
                      name="lastName"
                      className={styles.errorSurname}
                      style={{ borderColor: "red" }}
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Prezime"
                      onChange={change}
                      name="lastName"
                    />
                  )}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      marginLeft: "5px",
                    }}
                  >
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
                  </div>
                </>
              </div>
              {logOrReg ? (
                mistakes.email ? (
                  wrongEmail === "" ? (
                    <input
                      type="email"
                      placeholder="E-Mail *Invalid Email*"
                      onChange={change}
                      name="email"
                      className={styles.errorEmail}
                      style={{ borderColor: "red" }}
                    />
                  ) : (
                    <input
                      type="email"
                      placeholder={wrongEmail}
                      onChange={change}
                      name="email"
                      className={styles.errorEmail}
                      style={{ borderColor: "red" }}
                    />
                  )
                ) : wrongEmail === "" ? (
                  <input
                    type="email"
                    placeholder="E-Mail"
                    onChange={change}
                    name="email"
                  />
                ) : (
                  <input
                    type="email"
                    placeholder={wrongEmail}
                    onChange={change}
                    name="email"
                    className={styles.errorEmail}
                    style={{ borderColor: "red" }}
                  />
                )
              ) : mistakes.email ? (
                wrongLogin === "" ? (
                  <input
                    type="email"
                    placeholder="Invalid Email"
                    onChange={change}
                    name="email"
                    className={styles.errorEmail}
                    style={{ borderColor: "red" }}
                  />
                ) : (
                  <input
                    type="email"
                    placeholder={wrongLogin}
                    onChange={change}
                    name="email"
                    className={styles.errorEmail}
                    style={{ borderColor: "red" }}
                  />
                )
              ) : wrongLogin === "" ? (
                <input
                  type="email"
                  placeholder="Email"
                  onChange={change}
                  name="email"
                />
              ) : (
                <input
                  type="email"
                  placeholder={wrongLogin}
                  onChange={change}
                  name="email"
                  className={styles.errorEmail}
                  style={{ borderColor: "red" }}
                />
              )}
              {logOrReg ? (
                mistakes.password ? (
                  <input
                    type="password"
                    placeholder="Password *Empty Field*"
                    onChange={change}
                    name="password"
                    className={styles.errorPassword}
                    style={{ borderColor: "red" }}
                  />
                ) : (
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={change}
                    name="password"
                  />
                )
              ) : mistakes.password ? (
                wrongLogin === "" ? (
                  <input
                    type="password"
                    placeholder="Password *Empty Field*"
                    onChange={change}
                    name="password"
                    className={styles.errorPassword}
                    style={{ borderColor: "red" }}
                  />
                ) : (
                  <input
                    type="password"
                    placeholder={wrongLogin}
                    onChange={change}
                    name="password"
                    className={styles.errorPassword}
                    style={{ borderColor: "red" }}
                  />
                )
              ) : wrongLogin === "" ? (
                <input
                  type="password"
                  placeholder="Password"
                  onChange={change}
                  name="password"
                />
              ) : (
                <input
                  type="password"
                  placeholder={wrongLogin}
                  onChange={change}
                  name="password"
                  className={styles.errorPassword}
                  style={{ borderColor: "red" }}
                />
              )}
              <div className={styles.neznam2}>
                <button
                  type="submit"
                  id="registerloginButton"
                  onClick={validateFields}
                >
                  Регистрирај се
                </button>
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

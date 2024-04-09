import style from "../styles/mainPage.module.css";
import styleMax from "../styles/screenSizes/max.module.css";
import styleLap from "../styles/screenSizes/laptop.module.css";
import styleMob from "../styles/screenSizes/mobile.module.css";

import { useState, useEffect } from "react";

export default function login() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);

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
    const registerContent = document.getElementById("register");

    naslov.textContent = "Логирање";
    text.textContent = "Логирајте се да добиете пристап до вашиот акаунт.";
    registerContent.style.display = "none";
    kopce.textContent = "Логирај се";
  }
  function registerChoice() {
    const naslov = document.getElementById("registerloginNaslov");
    const text = document.getElementById("registerloginText");
    const kopce = document.getElementById("registerloginButton");
    const registerContent = document.getElementById("register");
    const resetPasswordText = document.getElementById("resetPassword");

    naslov.textContent = "Регистрација";
    text.textContent =
      "Регистрирајте се за да добивате известувања и да ги следите најновите вести кое училиштето ги нуди.";
    registerContent.style.display = "flex";
    resetPasswordText.style.display = "none";
    kopce.textContent = "Регистрирај се";
  }
  return (
    <>
      <div className={styles.bgColor}></div>
      <div className={styles.RegisterLogin}>
        <div className={styles.choice}>
          <button type="button" onClick={loginChoice}>
            Login
          </button>
          <button type="button" onClick={registerChoice} k>
            Register
          </button>
          <div className={styles.right}>
            <a href="index.html" class={`${styles.close} ${styles.mobile}`}>
              <i class="fas fa-window-close"></i>
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
          <div className={style.main}>
            <form action="">
              <div id="register">
                <input type="text" placeholder="Ime" />
                <input type="text" placeholder="Prezime" />
                <select name="Klas" id="">
                  <option value="">I-1</option>
                  <option value="">I-2</option>
                  <option value="">I-3</option>
                  <option value="">I-4</option>
                  <option value="">I-5</option>
                  <option value="">I-6</option>
                  <option value="">I-7</option>
                  <option value="">I-8</option>
                  <option></option>
                  <option value="">II-1</option>
                  <option value="">II-2</option>
                  <option value="">II-3</option>
                  <option value="">II-4</option>
                  <option value="">II-5</option>
                  <option value="">II-6</option>
                  <option value="">II-7</option>
                  <option value="">II-8</option>
                  <option></option>
                  <option value="">III-1</option>
                  <option value="">III-2</option>
                  <option value="">III-3</option>
                  <option value="">III-4</option>
                  <option value="">III-5</option>
                  <option value="">III-6</option>
                  <option value="">III-7</option>
                  <option value="">III-8</option>
                  <option></option>
                  <option value="">IV-1</option>
                  <option value="">IV-2</option>
                  <option value="">IV-3</option>
                  <option value="">IV-4</option>
                  <option value="">IV-5</option>
                  <option value="">IV-6</option>
                  <option value="">IV-7</option>
                  <option value="">IV-8</option>
                </select>
              </div>
              <input type="email" placeholder="E-Mail" />
              <input type="password" placeholder="Password" />
              <div className={styles.neznam2}>
                <button type="submit" id="registerloginButton">
                  Регистрирај се
                </button>
                <button type="reset">Ресетирај</button>
                <span id="resetPassword">
                  Доколку ја имате заборавено вашата лозинка кликнете
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

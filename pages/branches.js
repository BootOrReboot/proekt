import style from "../styles/mainPage.module.css";
import styleMax from "../styles/screenSizes/max.module.css";
import styleLap from "../styles/screenSizes/laptop.module.css";
import styleMob from "../styles/screenSizes/mobile.module.css";
import Image from "next/image";
import matematicka from "../images/icons/matematicka.png";
import opstestvo from "../images/icons/gimnazija.png";
import avto from "../images/icons/avtomehanicari.png";
import grad from "../images/icons/gradezna.png";
import jazicna from "../images/icons/jazici.png";
import kta from "../images/icons/ktia.png";
import masinska from "../images/icons/masinska.png";
import kuvar from "../images/icons/ugostitelska.png";
import medicina from "../images/icons/zdravstvena.png";
import { useTranslations } from "next-intl";

import { useState, useEffect } from "react";
export default function SchoolBranches() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);
  const t = useTranslations("Struki");

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

  const arrayOfStruki = [
    {
      image: matematicka,
      name: "Природно - Математичко Подрачје",
      disc: {
        points: `60 ${t("поени")}`,
        students: `20 ${t("ученика")}`,
        classroom: `1 ${t("паралелка")}`,
      },
    },
    {
      image: opstestvo,
      name: "Општествено - Хуманистичко Подрачје",
      disc: {
        points: `60 ${t("поени")}`,
        students: `20 ${t("ученика")}`,
        classroom: `1 ${t("паралелка")}`,
      },
    },
    {
      image: jazicna,
      name: "Јазично - Уметничко Подрачје",
      disc: {
        points: `60 ${t("поени")}`,
        students: `20 ${t("ученика")}`,
        classroom: `1 ${t("паралелка")}`,
      },
    },
  ];
  const arrayOfCetiri = [
    {
      image: kta,
      name: "Електротехничар за КТА",
      disc: {
        points: `55 ${t("поени")}`,
        students: `25 ${t("ученика")}`,
        classroom: `1 ${t("паралелка")}`,
        internship: "Соработка со Дема Стил ДОО Крива Паланка",
      },
    },
    {
      image: medicina,
      name: "Медицинска Сестра",
      disc: {
        points: `70 ${t("поени")}`,
        students: `25 ${t("ученика")}`,
        classroom: `1 ${t("паралелка")}`,
        internship: "Соработка со Медицински Центар Крива Паланка",
      },
    },
    {
      image: masinska,
      name: "Машински Техничар",
      disc: {
        points: `45 ${t("поени")}`,
        students: `25 ${t("ученика")}`,
        classroom: `1 ${t("паралелка")}`,
        internship: "Соработка со Дема Стил ДОО Крива Паланка",
      },
    },
    {
      image: grad,
      name: "Градежен Техничар",
      disc: {
        points: `45 ${t("поени")}`,
        students: `25 ${t("ученика")}`,
        classroom: `1 ${t("паралелка")}`,
        internship:
          "Соработка со ЈП Комуналец Крива Паланка и „Хантерс“ ДООЕЛ Скопје",
      },
    },
    {
      image: kuvar,
      name: "Келнер / Готвач",
      disc: {
        points: `30 ${t("поени")}`,
        students: `25 ${t("ученика")}`,
        classroom: `1 ${t("паралелка")}`,
        internship: "Соработка со Парк Гиновци ДООЕЛ Ранковце",
      },
    },
  ];

  return (
    <>
      <h1 className={styles.strukiHeader}>{t("Гимназиско Образование:")}</h1>
      <div className={styles.struki}>
        {arrayOfStruki.map((el) => {
          return (
            <>
              <div className={styles.struka}>
                <div className={styles.ikona}>
                  <Image src={el.image} alt={el.name} />
                </div>
                <div className={styles.podatoci}>
                  <div className={styles.ime}>{t(el.name)}</div>
                  <div className={styles.deskripcija}>
                    {el.disc.points}
                    <br />
                    {el.disc.students}
                    <br />
                    {el.disc.classroom}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <h1 className={styles.strukiHeader}>{t("Четиригодишно Траење:")}</h1>
      <div className={styles.struki}>
        {arrayOfCetiri.map((el) => {
          return (
            <>
              <div className={styles.struka}>
                <div className={styles.ikona}>
                  <Image src={el.image} alt={el.name} />
                </div>
                <div className={styles.podatoci}>
                  <div className={styles.ime}>{t(el.name)}</div>
                  <div className={styles.deskripcija}>
                    {el.disc.points}
                    <br />
                    {el.disc.students}
                    <br />
                    {el.disc.classroom}
                    <br />
                    {t(el.disc.internship)}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className={styles.upisi}>
        <h1>{t("Потребни Документи:")}</h1>
        <ul>
          <li>{t("Пријава за запишување")}</li>
          <li>{t("Оригинални свидетелства од VI до IX одделение")}</li>
          <li>
            {t(
              "Дипломи од освоени I, II и III места од меѓународни и државни натпревари, доколку имаат"
            )}
          </li>
          <li>{t("Извод од матична книга на родените")}</li>
        </ul>
      </div>
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

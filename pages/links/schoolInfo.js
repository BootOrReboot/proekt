import style from "../../styles/mainPage.module.css";
import styleMax from "../../styles/screenSizes/max.module.css";
import styleLap from "../../styles/screenSizes/laptop.module.css";
import styleMob from "../../styles/screenSizes/mobile.module.css";
import { useState, useEffect } from "react";
import frontImageSchool from "../../images/gjorche-petrov-palanka.jpg";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ForCollage() {
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
  const t = useTranslations("ZaGimnazija");
  return (
    <>
      <div className={styles.gimnazijaInfo}>
        <Image src={frontImageSchool} alt="СОУ Ѓорче Петров" priority={true} />
        <p>
          <b>{t("МИСИЈА НА УЧИЛИШТЕТО")}</b> <br />
          <br />
          <i>
            {t(
              "Едукацијата не е подготовка за живот – едукацијата е самиот живот"
            )}
          </i>
          <br />
          <br />
          {t("Ние сме училиште со традиција")}
          <br />
          <br />
          {t(
            "Наша мисија е да ја препознаеме индивидуалноста која мора да биде во корелација со тимската работа која поттикнува креативност и создава квалитет"
          )}
          <br />
          <br />
          <b>{t("ВИЗИЈА НА УЧИЛИШТЕТО")} </b>
          <br />
          <br />
          <i>
            {t(
              "Развиј ја страста за учење, Доколку успееш во тоа, никогаш нема да престанеш да растеш!"
            )}
          </i>
          <br />
          <br />
          {t(
            "Средното општинско училиште Ѓорче Петров преставува силен импулс во развојот на образовната дејност"
          )}
          <br />
          <br />
          {t(
            "Наша цел е да помогнеме во градење на образована личност која научила како да учи и како да се менува"
          )}
          <br />
          <br />
          {t(
            "Да ги искористиме зборовите на Еразмо Ротердамски: “Најголемата надеж на секоја земја лежи во примерно школување на младите”"
          )}
          <br />
          <br />
          {t("Инвестирањето во знаење исплаќа најдобра и најголема камата")}
          <br />
          <br />
          {t(
            "Затоа ние како институција ќе продолжиме да работиме во полза на идните генерации, а времето е онаа мудра категорија која ги потврдува вистинските творци"
          )}
          <br />
          <br />
          <b>{t("Животот мора да биде постојано воспитување!")}</b> <br />
          <br />
          <b>{t("Мото на училиштето:")}</b>
          <br />
          <br />
          <i>
            {t("Да бидеме цртачи на денот за да бидеме дизајнери на животот")}
          </i>
        </p>
      </div>
    </>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}

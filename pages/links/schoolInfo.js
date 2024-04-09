import style from "../../styles/mainPage.module.css";
import styleMax from "../../styles/screenSizes/max.module.css";
import styleLap from "../../styles/screenSizes/laptop.module.css";
import styleMob from "../../styles/screenSizes/mobile.module.css";
import { useState, useEffect } from "react";
import frontImageSchool from "../../images/gjorche-petrov-palanka.jpg";
import Image from "next/image";

export default function forCollage() {
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
  return (
    <>
      <div className={styles.gimnazijaInfo}>
        <Image src={frontImageSchool} alt="СОУ Ѓорче Петров" priority={true} />
        <p>
          <b>МИСИЈА НА УЧИЛИШТЕТО</b> <br />
          <br />
          <i>
            Едукацијата не е подготовка за живот – едукацијата е самиот живот.
          </i>
          <br />
          <br />
          Ние сме училиште со традиција, отворено за нови идеи кои поттикнуваат
          индивидуалност и креативност, дисциплина и култура, повисоки
          интелектуални способности и образование кое ќе одговори на животните
          предизвици. Корените на образованието се горки, но плодовите се
          слатки. Затоа секојдневно инвестираме во градење на нашата иднина.
          Човековото воспитание е огледало во кое се прикажува личниот портрет.
          <br />
          <br />
          Наша мисија е да ја препознаеме индивидуалноста која мора да биде во
          корелација со тимската работа која поттикнува креативност и создава
          квалитет.
          <br />
          <br />
          <b>ВИЗИЈА НА УЧИЛИШТЕТО </b>
          <br />
          <br />
          <i>
            Развиј ја страста за учење. Доколку успееш во тоа, никогаш нема да
            престанеш да растеш!
          </i>
          <br />
          <br />
          Средното општинско училиште Ѓорче Петров преставува силен импулс во
          развојот на образовната дејност, а со тоа и практично се потврдува
          определбата за интелектуалното инвестирање во образованието и за
          создавање на високо професионален кадар кој е императив и основен
          предуслов за развој и напредок на секое општество. Образованието е
          златен клуч на слободата. <br />
          <br />
          Наша цел е да помогнеме во градење на образована личност која научила
          како да учи и како да се менува. Затоа што животот мора да биде
          постојано воспитување.
          <br />
          <br />
          Да ги искористиме зборовите на Еразмо Ротердамски: “Најголемата надеж
          на секоја земја лежи во примерно школување на младите”.
          <br />
          <br />
          Инвестирањето во знаење исплаќа најдобра и најголема камата.
          <br />
          <br />
          Затоа ние како институција ќе продолжиме да работиме во полза на
          идните генерации, а времето е онаа мудра категорија која ги потврдува
          вистинските творци.
          <br />
          <br />
          <b>Животот мора да биде постојано воспитување!</b> <br />
          <br />
          <b>Мото на училиштето:</b>
          <br />
          <br />
          <i>Да бидеме цртачи на денот за да бидеме дизајнери на животот.</i>
        </p>
      </div>
    </>
  );
}

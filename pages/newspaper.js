import { useEffect, useState } from "react";
import style from "../styles/mainPage.module.css";
import styleMax from "../styles/screenSizes/max.module.css";
import styleLap from "../styles/screenSizes/laptop.module.css";
import styleMob from "../styles/screenSizes/mobile.module.css";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
export default function newspaper() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);
  const search = useSearchParams();
  const [page, setPage] = useState({});
  const t = useTranslations("News");
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
    };
    const search = new URLSearchParams(window.location.search);

    const pageNumber = search.get("page");
    fetch("https://master--sougjorchepetrov.netlify.app/api/pageRenderer", {
      method: "POST",
      body: pageNumber,
    })
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        console.log(res.message);
        setPage(res.message);
      });
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
      <div className={styles.headPage}>
        <div className={styles.page}>
          <Image
            src={page.image}
            alt="pageImage"
            width={50}
            height={50}
            className={styles.pageImage}
          />
          <h1 className={styles.title}>{t(page.name)}</h1>
          <p className={styles.info}>{t(page.disc)}</p>
          <div>
            {page.day}
            {" " + t(page.month) + " "}
            {page.year}
          </div>
        </div>
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

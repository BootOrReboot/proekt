import { useEffect, useState } from "react";
import style from "../styles/mainPage.module.css";
import styleMax from "../styles/screenSizes/max.module.css";
import styleLap from "../styles/screenSizes/laptop.module.css";
import styleMob from "../styles/screenSizes/mobile.module.css";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { eslint } from "@/next.config";
import noImage from "../images/noImage.png";
export default function Newspaper() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);
  const search = useSearchParams();
  const [page, setPage] = useState({});
  const router = useRouter();
  const [locale, setLocale] = useState("mk");
  const t = useTranslations("News");
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
    };
    setSpinner(true);
    const search = new URLSearchParams(window.location.search);
    const lang = router.locale;
    setLocale(lang);
    const pageNumber = search.get("page");
    fetch("https://master--sougjorchepetrov.netlify.app/api/pageRenderer", {
      method: "POST",
      body: JSON.stringify({ num: pageNumber, lang: lang }),
    })
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        console.log(res.message);
        setPage(res.message);
        setSpinner(false);
      });
    handleResize(); // Call once to set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [router.locale]);

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
        {spinner ? (
          <div className={styles.loaderChanger}>
            <div
              style={{
                width: "15vw",
                height: "12vw",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <span className={styles.loader}></span>
            </div>
          </div>
        ) : (
          <div className={styles.page}>
            {page === null ? (
              <>
                <div
                  className={styles.pageImage}
                  style={{
                    height: "23vw",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image src={noImage} alt="pageImage" width={50} height={50} />
                </div>

                <h1 className={styles.title}>There is no translation</h1>
              </>
            ) : (
              <>
                <Image
                  src={page.image}
                  alt="pageImage"
                  width={50}
                  height={50}
                  className={styles.pageImage}
                />
                <h1 className={styles.title}>{page.name}</h1>
                <p
                  className={styles.info}
                  style={{ display: "flex", alignItems: `${page.position}` }}
                  dangerouslySetInnerHTML={{ __html: page.disc }}
                ></p>
                <div>
                  {page.day}
                  {" " + t(page.month) + " "}
                  {page.year}
                </div>
              </>
            )}
          </div>
        )}
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

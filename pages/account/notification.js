import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/mainPage.module.css";
import styleMax from "../../styles/screenSizes/max.module.css";
import styleLap from "../../styles/screenSizes/laptop.module.css";
import styleMob from "../../styles/screenSizes/mobile.module.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Notify() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);
  const [info, setInfo] = useState({});
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
    };

    handleResize(); // Call once to set initial state
    window.addEventListener("resize", handleResize);
    const search = new URLSearchParams(window.location.search);

    const user = search.get("id");
    fetch(
      "https://master--sougjorchepetrov.netlify.app/api/notificationAPI/getNotifications",
      {
        method: "POST",
        body: user,
      }
    )
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        setInfo(res.message);
        setSpinner(false);
      });
    console.log(user);
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

  const deleteNotification = (event) => {
    const id = event.currentTarget.id;

    const search = new URLSearchParams(window.location.search);

    const user = search.get("id");
    fetch(
      "https://master--sougjorchepetrov.netlify.app/api/notificationAPI/deleteNotification",
      {
        method: "POST",
        body: JSON.stringify({ name: user, id: id }),
      }
    )
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        console.log(res.message);
        window.location.reload();
      });
  };

  return (
    <>
      <div className={styles.notifikacii}>
        {spinner ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "15vw",
                height: "12vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <span className={styles.loader}></span>
            </div>
          </div>
        ) : (
          <>
            {Object.values(info).map((el, index) => {
              return (
                <div className={styles.notifikacija} key={index}>
                  <div className={styles.left}>
                    <div className={styles.tekst}>{el}</div>
                    <div className={styles.pratena}>
                      <p>20 Maj 2024, 10:20</p>
                    </div>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.delete}>
                      <div onClick={deleteNotification} id={`N${index + 1}`}>
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
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

import style from "../styles/mainPage.module.css";
import styleMax from "../styles/screenSizes/max.module.css";
import styleLap from "../styles/screenSizes/laptop.module.css";
import styleMob from "../styles/screenSizes/mobile.module.css";
import Image from "next/image";
import middle from "../images/middle.png";
import left from "../images/left.png";
import right from "../images/right.png";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useRouter } from "next/router";

export default function Admin() {
  const [text, setText] = useState({
    disc: "",
    title: "",
    day: "",
    month: "јануари",
    year: "",
  });
  const [realText, setRealText] = useState({ disc: "", title: "" });
  const [newRows, setNewRows] = useState([]);
  const inputRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(0);
  const [styles, setStyles] = useState(style);
  const [image, setImage] = useState(null);
  const [positionText, setPositionText] = useState("center");
  const [previewImage, setPreviewImage] = useState("");
  const [form, setForm] = useState({
    title: "",
    disc: "",
    day: "",
    month: "јануари",
    year: "",
  });
  const [wrongs, setWrongs] = useState({
    title: false,
    disc: false,
    day: false,
    month: false,
    year: false,
    image: false,
  });
  const router = useRouter();
  const [lang, setLang] = useState("mk");
  const [options, setOptions] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
    };
    const search = new URLSearchParams(window.location.search);
    const email = search.get("id");

    fetch(
      "https://master--sougjorchepetrov.netlify.app/api/notificationAPI/getNumber",
      {
        method: "POST",
        body: email,
      }
    )
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        console.log(res.message);
        setNumber(res.message);
      });

    const lang = router.locale;
    setLang(lang);
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
  const kreiraj = (e) => {
    const id = e.target.id;
    const kreacija = document.getElementById(`typeField`);
    const create = document.getElementById(`${styles.kreacija}`);
    const slikaText = document.getElementById(`${styles.slikaText}`);
    const naslovText = document.getElementById(`${styles.naslovText}`);
    const sodrzinaText = document.getElementById(`${styles.sodrzinaText}`);
    const date = document.getElementById("date");

    kreacija.style.display = "flex";
    create.style.display = "block";
    if (id == 1) {
      slikaText.parentNode.style.display = "none";
      naslovText.parentNode.style.display = "none";
      sodrzinaText.textContent = "Напишете ја пораката.";
      date.parentNode.style.display = "none";
      setOptions("Notification");
    } else {
      slikaText.parentNode.style.display = "block";
      naslovText.parentNode.style.display = "block";
      date.parentNode.style.display = "block";
      naslovText.textContent = "Напишете го насловот на оваа Вест или Настан.";
      sodrzinaText.textContent =
        "Напишете ја содржината на оваа Вест или Настан.";
      setOptions("News");
    }
  };
  const validationFields = () => {
    if (options === "News") {
      const newMistakes = {};
      if (form.title === "") {
        newMistakes.title = true;
      } else {
        newMistakes.title = false;
      }
      if (form.disc === "") {
        newMistakes.disc = true;
      } else {
        newMistakes.disc = false;
      }
      if (form.day === "") {
        newMistakes.day = true;
      } else {
        newMistakes.day = false;
      }
      if (form.year === "") {
        newMistakes.year = true;
      } else {
        newMistakes.year = false;
      }
      if (image === null) {
        newMistakes.image = true;
      } else {
        newMistakes.image = false;
      }
      setWrongs(newMistakes);
      const truth = Object.values(newMistakes).every((item) => item);

      if (
        newMistakes.image === false &&
        newMistakes.day === false &&
        newMistakes.year === false &&
        newMistakes.title === false &&
        newMistakes.disc === false
      ) {
        submitData();
      }
    } else if (options === "Notification") {
      const newMistakes = {};

      if (form.disc === "") {
        newMistakes.disc = true;
      } else {
        newMistakes.disc = false;
      }
      setWrongs(newMistakes);
      if (newMistakes.disc === false) {
        submitNotif();
      }
    }
  };
  const imageDrag = (e) => {
    console.log("drop activated");
    e.preventDefault();
  };
  const imageAdd = (e) => {
    e.preventDefault();
    const data = e.target.files[0];
    setImage(data);
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
  };
  const imageDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.files[0];
    setImage(data);
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    console.log("drop activated");
  };
  const submitData = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const chunkSize = 999 * 1024;
      const totalChunks = Math.ceil(reader.result.length / chunkSize);

      console.log(totalChunks);
      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, reader.result.length);
        const chunk = reader.result.substring(start, end);
        console.log(chunk);

        if (i === 0) {
          fetch("https://master--sougjorchepetrov.netlify.app/api/addingNews", {
            method: "POST",
            body: JSON.stringify({
              chunk,
              totalChunks,
              currentChunk: i + 1,
              name: form.title,
              disc: newRows.join("") + text.disc,
              lang: lang,
              date: { day: form.day, month: form.month, year: form.year },
              position: positionText,
            }),
          })
            .then((r) => {
              return r.json();
            })
            .then((res) => {
              console.log(res);
            });
        } else {
          setTimeout(() => {
            fetch(
              "https://master--sougjorchepetrov.netlify.app/api/addingSecondNews",
              {
                method: "POST",
                body: JSON.stringify({
                  chunk,
                  totalChunks,
                  currentChunk: i + 1,
                  name: form.title,
                  disc: newRows.join("") + text.disc,
                  lang: lang,
                  position: positionText,
                }),
              }
            )
              .then((r) => {
                return r.json();
              })
              .then((res) => {
                console.log(res);
              });
          }, 5000);
        }
      }
    };
  };

  const change = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    if (name !== "day" && name !== "year" && name !== "month") {
      setText({ ...text, [name]: `<div>${value}</div>` });
    } else {
      setText({
        ...text,
        [name]: value,
      });
    }
  };

  const row = (e) => {
    e.preventDefault();
    if (text === "") {
      setNewRows([...newRows, "</br>"]);
    } else {
      setNewRows([...newRows, text.disc]);
    }

    setText({ ...text, disc: "" });
    setForm({ ...form, disc: "" });
    setRealText("");
    inputRef.current.focus();
  };

  const test = () => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      console.log(reader.result);
    };
  };
  const submitNotif = () => {
    fetch(
      "https://master--sougjorchepetrov.netlify.app/api/notificationAPI/addNotif",
      {
        method: "POST",
        body: JSON.stringify({ classNum: number, disc: form.disc }),
      }
    )
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        console.log(res.message);
      });
  };
  const arrayOfMonth = [
    "јануари",
    "февруари",
    "март",
    "април",
    "мај",
    "јуни",
    "јули",
    "август",
    "септември",
    "октомври",
    "ноември",
    "декември",
  ];
  const addDate = () => {
    const date = new Date();
    setForm({
      ...form,
      ["day"]: date.getDate(),
      ["month"]: arrayOfMonth[date.getMonth()],
      ["year"]: date.getFullYear(),
    });
    document.getElementById("month").value = arrayOfMonth[date.getMonth()];

    setForm({
      ...form,
      month: arrayOfMonth[date.getMonth()],
      year: `${date.getFullYear()}`,
      day: `${date.getDate()}`,
    });
    setText({
      ...text,
      month: arrayOfMonth[date.getMonth()],
      year: `${date.getFullYear()}`,
      day: `${date.getDate()}`,
    });
  };

  const date = new Date();
  if (form.day > 31) {
    setForm({ ...form, day: "31" });
    setText({ ...text, day: "31" });
  } else if (form.day < 0) {
    setForm({ ...form, day: "" });
    setText({ ...text, day: "" });
  }
  if (form.year > date.getFullYear()) {
    setForm({ ...form, year: `${date.getFullYear()}` });
    setText({ ...text, year: `${date.getFullYear()}` });
  } else if (form.year < 2000) {
    setForm({ ...form, year: "2000" });
    setText({ ...text, year: "2000" });
  }
  const enterRow = (e) => {
    if (e.key === "Enter") {
      row();
    }
  };
  const buttonSetter = (e) => {
    e.preventDefault();
    const { name } = e.target;
    setPositionText(name);
  };
  console.log(text.disc);
  console.log(newRows.join("") + text.disc);
  return (
    <>
      <div className={styles.functions}>
        <div className={styles.funkcija}>
          <div>
            *Tip:За да направите нотификација или новост во друг јазик кликнете
            горе десно
          </div>
          <p className={styles.deskripcija}>
            Испратете нотификација до сите ученици кои иммат успешно креиран
            профил на веб страната.
          </p>
          <button type="button" onClick={kreiraj} id="1">
            Испрати Нотификација
          </button>
        </div>
        <div className={styles.funkcija}>
          <p className={styles.deskripcija}>
            Додајте нова вест или настан кој е поврзана со училиштето.
          </p>
          <button type="button" onClick={kreiraj} id="2">
            Додај Вест или Настан
          </button>
        </div>
      </div>
      <form id={styles.kreacija}>
        <div
          id="typeField"
          style={{ width: "100%", justifyContent: "space-around" }}
        >
          <div className={style.slika}>
            {wrongs.image ? (
              <>
                <p id={styles.slikaText} style={{ color: "red" }}>
                  Изберете слика која ја користите за оваа Вест или Настан.
                </p>
                <label
                  htmlFor="imageLoader"
                  id={styles.dropArea}
                  onDrop={imageDrop}
                  onDragOver={imageDrag}
                  onChange={imageAdd}
                  style={{ borderColor: "red" }}
                >
                  <input type="file" id="imageLoader" accept="image/*" hidden />
                  <div className={styles.dragText} style={{ color: "red" }}>
                    *Image not selected
                  </div>
                </label>
              </>
            ) : (
              <>
                <p id={styles.slikaText}>
                  Изберете слика која ја користите за оваа Вест или Настан.
                </p>
                <label
                  htmlFor="imageLoader"
                  id={styles.dropArea}
                  onDrop={imageDrop}
                  onDragOver={imageDrag}
                  onChange={imageAdd}
                >
                  <input type="file" id="imageLoader" accept="image/*" hidden />
                  <div className={styles.dragText}>
                    Drag and Drop or Insert Image
                  </div>
                </label>
              </>
            )}
          </div>
          <div className={styles.naslov}>
            {wrongs.title ? (
              <>
                <p id={styles.naslovText} style={{ color: "red" }}>
                  Напишете го насловот за оваа Вест или Настан.
                </p>

                <input
                  type="text"
                  onChange={change}
                  name="title"
                  className={styles.placeholderError}
                  style={{ borderColor: "red" }}
                  placeholder="*Field is empty"
                />
              </>
            ) : (
              <>
                <p id={styles.naslovText}>
                  Напишете го насловот за оваа Вест или Настан.
                </p>
                <input type="text" onChange={change} name="title" />
              </>
            )}
          </div>
          <div className={styles.sodrzina}>
            {wrongs.disc ? (
              <>
                <p id={styles.sodrzinaText} style={{ color: "red" }}>
                  Напишете ја содржината на оваа Вест или Настан.
                </p>
                <input
                  type="text"
                  onChange={change}
                  name="disc"
                  className={styles.placeholderError}
                  style={{ borderColor: "red" }}
                  placeholder="*Field is empty"
                  ref={inputRef}
                  value={form.disc}
                  onKeyDown={enterRow}
                />
              </>
            ) : (
              <>
                <p id={styles.sodrzinaText}>
                  Напишете ја содржината на оваа Вест или Настан.
                </p>

                <input
                  type="text"
                  onChange={change}
                  name="disc"
                  ref={inputRef}
                  value={form.disc}
                  onKeyDown={enterRow}
                />
              </>
            )}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={row} className={styles.editButtons}>
                Add New Row
              </button>
              <div className={styles.editButtons}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Image
                    onClick={buttonSetter}
                    name="flex-start"
                    src={left}
                    height={50}
                    width={50}
                    className={styles.alignmentIcons}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Image
                    onClick={buttonSetter}
                    name="center"
                    src={middle}
                    height={50}
                    width={50}
                    className={styles.alignmentIcons}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Image
                    onClick={buttonSetter}
                    name="flex-end"
                    src={right}
                    height={50}
                    width={50}
                    className={styles.alignmentIcons}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.sodrzina} style={{ width: "15%" }}>
            {wrongs.day || wrongs.month || wrongs.year ? (
              <p id="date" style={{ color: "red" }}>
                Внесете датум.
              </p>
            ) : (
              <p id="date">Внесете датум.</p>
            )}
            {wrongs.day ? (
              <input
                type="number"
                onChange={change}
                name="day"
                placeholder="Ден"
                style={{ borderColor: "red" }}
                className={styles.placeholderError}
                id="day"
                value={form.day}
              />
            ) : (
              <input
                type="number"
                onChange={change}
                name="day"
                placeholder="Ден"
                id="day"
                value={form.day}
              />
            )}
            <FormControl
              variant="standard"
              sx={{ width: "90%", outline: "0", padding: "0", fontSize: "1vw" }}
              style={{ width: "90%", margin: "2% 0%" }}
            >
              <Select
                sx={{
                  width: "100%",
                  "&::before": { borderColor: "black" },
                  "& > div": {
                    width: "100% !important",
                    fontSize: "1vw",
                    height: "",
                    minHeight: "",
                    paddingLeft: "1%",
                  },
                }}
                style={{ width: "100%" }}
                onChange={change}
                name="month"
                value={form.month}
                id="month"
              >
                {arrayOfMonth.map((el, index) => {
                  return (
                    <MenuItem
                      key={`month${index}`}
                      style={{ width: "100%", fontSize: "1vw" }}
                      value={`${el}`}
                    >
                      {el}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {wrongs.year ? (
              <input
                type="number"
                onChange={change}
                name="year"
                placeholder="Година"
                style={{ borderColor: "red" }}
                className={styles.placeholderError}
                id="year"
                value={form.year}
              />
            ) : (
              <input
                type="number"
                onChange={change}
                name="year"
                placeholder="Година"
                id="year"
                value={form.year}
              />
            )}
            <Button onClick={addDate}>Add current date?</Button>
          </div>
        </div>
        <div className={styles.previewPage}>
          <h1 className={styles.preview}>Preview:</h1>
          <div className={styles.prevContent}>
            {image === null ? (
              ""
            ) : (
              <Image
                width={50}
                height={50}
                src={previewImage}
                className={styles.prevImage}
              />
            )}
            <div
              dangerouslySetInnerHTML={{ __html: text.title }}
              className={styles.prevTitle}
            ></div>
            {newRows[0] === undefined ? (
              <div
                dangerouslySetInnerHTML={{ __html: text.disc }}
                className={styles.prevDisc}
                style={{ alignItems: `${positionText}` }}
              ></div>
            ) : (
              <>
                <div
                  dangerouslySetInnerHTML={{ __html: newRows.join("") }}
                  className={styles.prevDisc}
                  style={{ alignItems: `${positionText}` }}
                ></div>
                <div
                  dangerouslySetInnerHTML={{ __html: text.disc }}
                  className={styles.prevDisc}
                  style={{ alignItems: `${positionText}` }}
                ></div>
              </>
            )}

            <div style={{ width: "60%" }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: `<div>${
                    text.day + " " + text.month + " " + text.year
                  }</div>`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </form>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          style={{
            width: "28vw",
            height: "8vh",
            fontSize: "1vw",
            overflow: "hidden",
          }}
          onClick={validationFields}
        >
          Submit
        </Button>
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

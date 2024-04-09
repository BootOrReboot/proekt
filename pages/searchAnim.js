import style from "../styles/searchStyle.module.css";
import Image from "next/image";
import image from "../images/search.png";

export default function Home() {
  function test() {
    fetch("http://localhost:3000/api/testInsert")
      .then((res) => {
        return res.json();
      })
      .then((rez) => {
        console.log(rez.message);
      });
    const menu = () => {
      const links = document.getElementById("options");
      links.style.animationPlayState = "running";
      const close = document.getElementById("Xmenu");
      close.style.animationPlayState = "running";
    };
    const closing = () => {
      const links = document.getElementById("options");
      links.style.animation = "none";

      const close = document.getElementById("Xmenu");
      close.style.animation = "none";
      setTimeout(() => {
        links.style.animation = "";
        close.style.animation = "";
      }, 1000);
      console.log("works");
    };
  }
  const click = () => {
    const image = document.getElementById("icon");
    const text = document.getElementById("word");
    const moveRight = document.getElementById("toRight");
    const moveLeft = document.getElementById("toLeft");
    const blinking = document.getElementById("blinker");
    image.style.animationPlayState = `running`;
    text.style.animationPlayState = `running`;
    moveLeft.style.animationPlayState = `running`;
    moveRight.style.animationPlayState = `running`;
    setTimeout(() => {
      blinking.style.animationPlayState = `running`;
      console.log("works");
    }, 2000);
  };
  return (
    <div>
      <button onClick={test}>CLick to test</button>
      <div className={style.searchBar}>
        <div className={style.theBar}>
          <div className={style.toRight} id="toRight"></div>
          <div className={style.blinker} id="blinker"></div>
          <div className={style.searchIcon} onClick={click}>
            <Image src={image} id="icon" alt="icon" />
          </div>

          <div className={style.searchText} onClick={click}>
            <p id="word">Search</p>
          </div>
          <div className={style.toLeft} id="toLeft"></div>
        </div>
      </div>
    </div>
  );
}

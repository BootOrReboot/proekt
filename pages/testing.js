import { useState, useTransition, useRef } from "react";
import Image from "next/image";

export default function Test() {
  const [text, setText] = useState("");
  const [realText, setRealText] = useState("");
  const [newRows, setNewRows] = useState([]);
  const inputRef = useRef(null);
  const change = (e) => {
    const text = e.target.value;
    setText(`<div>${text}</div>`);
    setRealText(text);
  };
  const row = () => {
    if (text === "") {
      setNewRows([...newRows, "</br>"]);
    } else {
      setNewRows([...newRows, text]);
    }

    setText("");
    setRealText("");
    inputRef.current.focus();
  };
  console.log(newRows);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: text }}></div>
      <div dangerouslySetInnerHTML={{ __html: newRows.join("") }}></div>
      <div>
        <div>
          <input onChange={change} value={realText} ref={inputRef} />
          <button onClick={row}>Add New Row</button>
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

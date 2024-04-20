import { useState } from "react";
import Image from "next/image";

export default function test() {
  const [image, setImage] = useState("");
  const sentMes = () => {
    fetch("http://localhost:3000/api/testInsert")
      .then((res) => {
        return res.json();
      })
      .then((rez) => {
        setImage(rez.message);
      });
  };
  return (
    <>
      <button onClick={sentMes}>Submit</button>
      <Image
        src={image}
        alt="image"
        width={100}
        height={100}
        style={{ width: "100%" }}
      />
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

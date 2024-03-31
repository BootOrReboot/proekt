import "@/styles/globals.css";
import Nav from "./navBar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  );
}

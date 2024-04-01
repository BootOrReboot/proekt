import "@/styles/globals.css";
import Nav from "./navBar";
import Footer from "./footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

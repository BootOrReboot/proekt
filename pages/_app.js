import "@/styles/globals.css";
import Nav from "./navBar";
import Footer from "./footer";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const showNav = router.pathname === "/loginAndRegister" ? true : false;
  return (
    <>
      {showNav ? (
        <Component {...pageProps} />
      ) : (
        <>
          <Nav />
          <Component {...pageProps} />
          <Footer />
        </>
      )}
    </>
  );
}

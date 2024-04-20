import "@/styles/globals.css";
import Nav from "./navBar";
import Footer from "./footer";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const showNav = router.pathname === "/loginAndRegister" ? true : false;
  const admin =
    router.pathname === "/adminPanel" || router.pathname === "/loaderScreen"
      ? true
      : false;
  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
      timeZone="Germany/Berlin"
    >
      <>
        {showNav ? (
          <Component {...pageProps} />
        ) : admin ? (
          <>
            <Nav />
            <Component {...pageProps} />
          </>
        ) : (
          <>
            <Nav />
            <Component {...pageProps} />
            <Footer />
          </>
        )}
      </>
    </NextIntlClientProvider>
  );
}

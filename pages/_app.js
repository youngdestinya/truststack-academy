import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,400;0,700;0,900;1,900&family=Great+Vibes&display=swap" rel="stylesheet" />
        <title>Truststack Academy</title>
        <style>{`* { font-family: 'Alegreya Sans', sans-serif !important; } .cert-italic { font-family: 'Alegreya Sans', sans-serif !important; font-weight: 900 !important; font-style: italic !important; }`}</style>
      </Head>
      <Component {...pageProps} />
      <Script src="/site-navigation.js" strategy="afterInteractive" />
    </>
  );
}

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Kodchasan } from "next/font/google";
import { ThemeProvider } from "@mui/material";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";


const clientSideEmotionCache = createEmotionCache();

const kodchasan = Kodchasan({
  weight: ["400", "700"],
  subsets: ["thai"],
});

const theme = createTheme({
  typography: {
    fontFamily: kodchasan.style.fontFamily,
  },
 palette: {
   primary: {
     main: "#282828",
   },
   secondary:{
    main:"#D4745A"
   }
 },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

export default function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {getLayout(
          <main>
            <style jsx global>{`
              html {
                font-family: ${kodchasan.style.fontFamily};
              }
            `}</style>
            <Component {...pageProps} />
          </main>
        )}
      </ThemeProvider>
    </CacheProvider>
  );
}

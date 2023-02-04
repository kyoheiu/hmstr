import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createContext, useContext, useState } from "react";
import { PaletteMode } from "@mui/material";
import React from "react";
import { ColorMode } from "../context/ColorMode";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [isLight, setIsLight] = useState<boolean>(true);

  const light = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#444",
      },
    },
  });

  const dark = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#bbb",
      },
    },
  });

  return (
    <ColorMode.Provider value={{ isLight, setIsLight }}>
      <ThemeProvider theme={isLight ? light : dark}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ColorMode.Provider>
  );
}

export default MyApp;
import "@/styles/globals.css";
import { TaskProvider } from "@/context/tasks";
import { SnackbarProvider } from "notistack";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "../themes";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TaskProvider>
      <SnackbarProvider />
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </TaskProvider>
  );
}

import Header from "@/src/components/Header";
import "@mantine/core/styles.css";
import "../styles/preflight.css";
import "@/src/styles/globals.css";
import theme from "@/src/styles/mantineTheme";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <Header />
      <Component {...pageProps} />
    </MantineProvider>
  );
}

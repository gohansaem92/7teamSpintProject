import "@mantine/core/styles.css";
import "@/src/styles/preflight.css";
import "@/src/styles/globals.css";
import "@mantine/notifications/styles.css";

import theme from "@/src/styles/mantineTheme";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/layout";
import { AuthProvider } from "../contexts/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnWindowFocus: false, // 창 전환 시 자동 리패치 비활성화
      retry: 1, // 요청 실패 시 1회 재시도
      staleTime: 1000 * 60 * 5, // 데이터가 5분 동안 신선함 상태 유지
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MantineProvider>
  );
}

import type { ReactNode } from "react";
import Header from "@/src/components/Layout/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

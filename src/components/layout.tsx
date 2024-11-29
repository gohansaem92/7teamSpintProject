import type { ReactNode } from "react";
import Header from "@/src/components/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

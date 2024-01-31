import { useRouter } from "next/router";
import React, { ReactNode } from "react";

type NavarLayoutProps = {
  children: ReactNode;
};
export function NavbarLayout({ children }: NavarLayoutProps) {
  const { pathname } = useRouter();

  if (pathname !== "/auth") {
    return <>{children}</>;
  }
}

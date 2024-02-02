import * as React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/layout/navbar";
import { NavbarLayout } from "@/components/layout/navbar-layout";
import { PlaceOrder } from "@/components/form/place-order";
import { Separator } from "@/components/ui/separator";
import { RootLayout } from "@/components/layout/root-layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NavbarLayout>
          <Navbar />
        </NavbarLayout>
        <Separator />
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
        <PlaceOrder />
      </ThemeProvider>
    </SessionProvider>
  );
}

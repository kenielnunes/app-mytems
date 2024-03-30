import * as React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Navbar } from "@/components/layout/navbar";
import { NavbarLayout } from "@/components/layout/navbar-layout";
import { PlaceOrder } from "@/components/form/place-order";
import { Separator } from "@/components/ui/separator";
import { RootLayout } from "@/components/layout/root-layout";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "@/contexts/user-context";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
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
            <Toaster />
          </RootLayout>
          <PlaceOrder />
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

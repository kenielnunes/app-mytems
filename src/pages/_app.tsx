import * as React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Separator } from "@/components/ui/separator";
import { RootLayout } from "@/components/layout/root-layout";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "@/contexts/use-session";
import { Navbar } from "@/components/layout/main-nav";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <TooltipProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <Separator />
            <RootLayout>
              <Component {...pageProps} />
              <Toaster />
            </RootLayout>
          </ThemeProvider>
        </TooltipProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

import * as React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Separator } from "@/components/ui/separator";
import { RootLayout } from "@/components/layout/root-layout";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "@/contexts/use-session";
import { Navbar } from "@/components/layout/main-nav";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useRouter } from "next/router";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { pathname } = useRouter();

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
            {pathname !== "/register" && <Navbar />}
            <Separator />
            <RootLayout>
              <Component {...pageProps} />
              <Toaster />
              <Sonner />
            </RootLayout>
          </ThemeProvider>
        </TooltipProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

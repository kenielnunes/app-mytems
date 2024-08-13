import { ReactNode } from "react";
import { SubNav } from "./navbar";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";

type RootLayoutProps = {
  children: ReactNode;
};

const PoppinsFont = Poppins({ subsets: ["latin"], weight: "500" });

export const RootLayout = ({ children }: RootLayoutProps) => {
  const { pathname } = useRouter();
  return (
    <div
      className={`flex min-h-screen w-full flex-col bg-muted/40 ${PoppinsFont.className}`}
    >
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {pathname !== "/register" && <SubNav />}
        {children}
      </div>
    </div>
  );
};

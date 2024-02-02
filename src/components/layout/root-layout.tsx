import { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

export const RootLayout = ({ children }: RootLayoutProps) => {
  return <div className="max-w-screen">{children}</div>;
};

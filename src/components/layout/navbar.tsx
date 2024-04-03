import { User } from "next-auth";
import { Button } from "@/components/ui/button";

import { MainNav, MainNavItem } from "./main-nav";
import { UserAccountNav } from "./user-account-nav";
import { useScroll } from "../hooks/use-scroll";
import { ArrowRight } from "lucide-react";
import { useSigninModal } from "../hooks/use-signin-modal";
import { useSession } from "@/contexts/use-session";
import { SignInModal } from "../shared/signin-modal";
import { parseCookies } from "nookies";

interface NavBarProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
  rightElements?: React.ReactNode;
  scroll?: boolean;
}

export function NavBar({
  items,
  children,
  rightElements,
  scroll = false,
}: NavBarProps) {
  const scrolled = useScroll(50);
  const signInModal = useSigninModal();

  const { user } = useSession();

  const { auth: isAuth } = parseCookies();

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll ? (scrolled ? "border-b" : "bg-background/0") : "border-b"
      }`}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <MainNav items={items}>{children}</MainNav>

        <div className="flex items-center space-x-3">
          {rightElements}

          {!!isAuth && user ? (
            <UserAccountNav user={user} />
          ) : (
            <>
              <SignInModal />
              <Button
                className="gap-2 px-4"
                variant="default"
                rounded="full"
                onClick={signInModal.onOpen}
              >
                <span>Sign In</span>
                <ArrowRight className="size-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

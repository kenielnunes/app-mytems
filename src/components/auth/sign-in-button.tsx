import React, { useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { useSession } from "@/contexts/use-session";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { useSigninModal } from "../hooks/use-signin-modal";
import { SignInModal } from "../shared/signin-modal";

export function SignInButton() {
  const { user } = useSession();
  const { onOpen } = useSigninModal();

  const { push } = useRouter();

  if (user) {
    return (
      <div>
        <Button
          onClick={() => {
            destroyCookie(undefined, "auth");
            push("/auth");
          }}
        >
          Sair
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button onClick={onOpen}>Sign in</Button>
      <SignInModal />
    </>
  );
}

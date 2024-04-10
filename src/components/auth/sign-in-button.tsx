import React, { useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { useSession } from "@/contexts/use-session";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";

export function SignInButton() {
  const { user } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    <></>
    // <Button
    //   onClick={() => {
    //     setIsLoading(true);
    //     signIn("steam", {
    //       callbackUrl: "/market",
    //     });
    //   }}
    // >
    //   {isLoading ? (
    //     <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
    //   ) : (
    //     <Icons.steam className="mr-2 h-4 w-4" />
    //   )}
    //   Steam
    // </Button>
  );
}

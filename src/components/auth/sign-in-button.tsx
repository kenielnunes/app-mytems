import React, { useState } from "react";
import { Button } from "../ui/button";
import { useSession, signOut, signIn } from "next-auth/react";
import { Icons } from "../icons";

export function SignInButton() {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (data && data.user) {
    return (
      <div>
        <Button onClick={() => signOut()}>Sair</Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => {
        setIsLoading(true);
        signIn("steam", {
          callbackUrl: "/market",
        });
      }}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.google className="mr-2 h-4 w-4" />
      )}
      Google
    </Button>
  );
}

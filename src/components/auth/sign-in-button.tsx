import React from "react";
import { Button } from "../ui/button";
import { useSession, signOut, signIn } from "next-auth/react";
import { Icons } from "../icons";

export function SignInButton() {
  const { data } = useSession();
  console.log(data);

  if (data && data.user) {
    return (
      <div>
        <Button onClick={() => signOut()}>Sair</Button>
      </div>
    );
  }

  return (
    <Button onClick={() => signIn("google")}>
      <Icons.google className="mr-2 h-4 w-4" />
      Google
    </Button>
  );
}

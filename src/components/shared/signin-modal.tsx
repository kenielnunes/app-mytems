import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Modal } from "./modal";
import { Icons } from "../icons";
import { useSigninModal } from "../hooks/use-signin-modal";
import { UserMagicLinkAuthForm } from "../auth/user-magic-link-auth-form";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const SignInModal = () => {
  const signInModal = useSigninModal();
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <Modal showModal={signInModal.isOpen} setShowModal={signInModal.onClose}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16">
          <a href={"#"}>
            <Icons.logo className="size-10" />
          </a>
          <h3 className="font-urban text-2xl font-bold">Sign In</h3>
          <p className="text-sm text-gray-500">
            This is strictly for demo purposes - only your email and profile
            picture will be stored.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
          <UserMagicLinkAuthForm />

          <Link
            href={"/price"}
            onClick={signInModal.onClose}
            className={cn(
              buttonVariants({
                variant: "link",
              })
            )}
          >
            Register
          </Link>
        </div>
      </div>
    </Modal>
  );
};

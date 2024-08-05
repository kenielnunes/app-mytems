"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { SignInButton } from "./sign-in-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { Wand2 } from "lucide-react";
import { userAuth } from "@/services/api/modules/auth/send-auth-magic-link";
import { useTimer } from "../hooks/use-timer";

interface UserMagicLinkAuthFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function UserMagicLinkAuthForm({
  className,
  ...props
}: UserMagicLinkAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { formatedValue, isActive, startTimer, stopTimer, resetTimer } =
    useTimer(10);

  const schema = z.object({
    email: z.string().email(),
  });

  type UserAuth = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuth>({
    resolver: zodResolver(schema),
  });

  const { toast } = useToast();

  const onSubmit = async (data: UserAuth) => {
    setIsLoading(true);

    console.log("data.email", data.email);
    // Aqui você pode fazer o que quiser com os dados, como enviar para o servidor.
    try {
      const auth = await userAuth(data.email);
      toast({
        variant: "default",
        title: auth.message,
        description:
          "Verifique a caixa de entrada do email informado e entre com  seu magic link ✨",
        action: <ToastAction altText="Try again">Ok</ToastAction>,
      });

      startTimer();

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: error.response.data.message,
        description: "Make sure you entered your email correctly",
        action: <ToastAction altText="Try again">Undo</ToastAction>,
      });
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading || isActive}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isActive ? (
              `Wait ${formatedValue} to send again`
            ) : (
              <>
                Sign In with Magic Link <Wand2 className="w-4 h-4 ml-3" />
              </>
            )}
          </Button>
        </div>
      </form>

      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-2">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
      <SignInButton /> */}
    </div>
  );
}

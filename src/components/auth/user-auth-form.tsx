import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { useSession } from "next-auth/react";
import { SignInButton } from "./sign-in-button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/services/api/modules/user/create-user";
import { FormMessage } from "../ui/form";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const userAuthSchema = z.object({
    name: z.string().nonempty("Campo obrigatório"),
    email: z.string().nonempty("Campo obrigatório"),
  });

  type UserAuth = z.infer<typeof userAuthSchema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserAuth>({
    resolver: zodResolver(userAuthSchema),
  });

  async function onSubmit(data: UserAuth) {
    setIsLoading(true);

    try {
      // const created = await createUser({
      //   ...data,
      //   origin: "PERSONAL_MAIL",
      // });

      // console.log(created);

      setIsLoading(false);

      return;
    } catch (error: any) {
      alert(error.response.data.message);
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Email
            </Label>
            <Input
              {...register("name")}
              id="name"
              placeholder="Name"
              autoComplete="name"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="email@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
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
      <SignInButton />
    </div>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { biographySchema } from "./schemas";
import { useSession } from "@/contexts/use-session";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateUser } from "@/services/api/modules/user/update-user";

type BiographyFormData = z.infer<typeof biographySchema>;

export function BiographyForm() {
  const { user, revalidateUser } = useSession();

  const MAX_BIO_CHARS = 255;

  const revertChanges = () => {
    form.reset({
      biography: user?.biography,
    });
  };

  const [isExceededChars, setIsExceededChars] = useState<boolean>(false);

  const form = useForm<BiographyFormData>({
    resolver: zodResolver(biographySchema),
    defaultValues: {
      biography: user?.biography,
    },
  });

  const onSubmit = (data: BiographyFormData) => {
    toast.promise(
      updateUser({
        biography: data.biography,
      }),
      {
        loading: `Atualizando biografia`,
        success: () => {
          revalidateUser();
          return "Biografia atualizada com sucesso!";
        },
        error: `Falha na atualização da biografia`,
      }
    );
  };

  const bioLength = form.watch("biography")?.length;

  useEffect(() => {
    if (bioLength && bioLength >= MAX_BIO_CHARS) {
      setIsExceededChars(true);
    }
  }, [bioLength]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="biography"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography</FormLabel>
              <FormControl>
                <Textarea placeholder="Biography" {...field} />
              </FormControl>
              <div className="flex justify-between">
                <FormDescription>
                  A brief description about you.
                </FormDescription>
                <FormDescription
                  className={isExceededChars ? `!text-red-700` : ""}
                >
                  Tamanho do texto: ({bioLength} caracteres)
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button variant={"secondary"} type="button" onClick={revertChanges}>
            Descartar alterações
          </Button>
          <Button type="submit">Salvar alterações</Button>
        </div>
      </form>
    </Form>
  );
}

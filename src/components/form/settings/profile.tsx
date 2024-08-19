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
import { profileSchema } from "./schemas";
import { useSession } from "@/contexts/use-session";
import { updateUser } from "@/services/api/modules/user/update-user";
import { toast } from "sonner";

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { user } = useSession();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      birthday: user?.birthday,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    const { birthday } = data;

    // Divida a string de data
    const [day, month, year] = birthday!.split("/");

    // Crie a string no formato YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;

    // Crie a data usando o construtor nativo
    const date = new Date(formattedDate).toISOString();

    console.log(data);

    toast.promise(
      updateUser({
        ...data,
        birthday: date,
      }),
      {
        loading: `Uploading data...`,
        success: () => {
          return "updated user";
        },
        error: `Failed to update`,
      }
    );
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>Your full name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>Your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birthday</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Birthday" {...field} />
              </FormControl>
              <FormDescription>Your date of birth.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

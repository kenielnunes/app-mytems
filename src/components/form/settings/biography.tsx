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

type BiographyFormData = z.infer<typeof biographySchema>;

export function BiographyForm() {
  const { user } = useSession();
  const form = useForm<BiographyFormData>({
    resolver: zodResolver(biographySchema),
    defaultValues: {
      biography: user?.biography,
    },
  });

  const onSubmit = (data: BiographyFormData) => {
    console.log(data);
    // Handle form submission
  };

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
                <Input placeholder="Biography" {...field} />
              </FormControl>
              <FormDescription>A brief description about you.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

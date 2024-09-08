"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { accountSchema } from "./schemas";
import { useSession } from "@/contexts/use-session";

type AccountFormData = z.infer<typeof accountSchema>;

export function AccountForm() {
  const { user } = useSession();

  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      id: user?.id,
      stripeCustomerId: user?.stripeCustomerId,
      stripeSubscriptionId: user?.stripeSubscriptionId,
    },
  });

  const onSubmit = (data: AccountFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormDescription>{field.value}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stripeCustomerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stripe Customer ID</FormLabel>
              <FormDescription>{field.value}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stripeSubscriptionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stripe Subscription ID</FormLabel>
              <FormDescription>{field.value}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="destructive" type="submit">
          Delete Account
        </Button>
      </form>
    </Form>
  );
}

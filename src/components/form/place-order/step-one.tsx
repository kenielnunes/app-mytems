// /src/components/CreateItemForm/StepOne.tsx

"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function StepOne({ onNext }: { onNext: () => void }) {
  const { control } = useFormContext();

  return (
    <div>
      <FormField
        control={control}
        name="itemName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do Item</FormLabel>
            <FormControl>
              <Input placeholder="Exemplo: Necro Sword" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Input placeholder="Lorem ipsum dolor" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="basePrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Valor Base</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Valor Base" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="gameId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Jogo que o item pertence</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Exemplo: Valorant" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="button" onClick={onNext}>
        Próximo
      </Button>
    </div>
  );
}

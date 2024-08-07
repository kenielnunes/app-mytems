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
import { Combobox } from "@/components/ui/combobox";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api/api";
import { useDebounce } from "@/components/hooks/use-debounce";
import { useEffect, useState } from "react";

export function StepOne({ onNext }: { onNext: () => void }) {
  const { control } = useFormContext();

  const [searchText, setSearchText] = useState<string>("");

  const [debouncedSearchText, isDebouncing] = useDebounce(searchText, 1000);

  useEffect(() => {}, [debouncedSearchText]);

  const { data, isFetching, error } = useQuery<Game[]>({
    queryKey: ["games", debouncedSearchText],
    queryFn: async () => {
      const response = await api.get("/games/with-external-integration", {
        params: { name: debouncedSearchText },
      });

      return response.data.content;
    },
    // enabled: searchText.length > 0, // Só busca quando houver texto
    staleTime: 0,
  });

  return (
    <>
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
          <FormItem className="grid gap-2 pt-3">
            <FormLabel>Jogo que o item pertence</FormLabel>
            <FormControl>
              {/* <Input type="text" placeholder="Exemplo: Valorant" {...field} /> */}
              <Combobox
                isFetching={isFetching}
                emptyResultMessage="Nenhum jogo encontrado"
                options={data?.map((value) => {
                  return {
                    label: value.name,
                    value: value.slug,
                  };
                })}
                onChangeInput={(value) => setSearchText(value)}
                onChange={(value) => {
                  field.onChange(value);
                }}
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="button" onClick={onNext}>
        Próximo
      </Button>
    </>
  );
}

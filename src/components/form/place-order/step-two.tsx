// /src/components/CreateItemForm/StepTwo.tsx

"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function StepTwo({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) {
  const { control } = useFormContext();
  const {
    fields: optionFields,
    remove: removeOption,
    append: appendOption,
  } = useFieldArray({
    control,
    name: "availableOptions",
  });

  return (
    <div>
      <div className="space-y-4">
        <FormLabel>Opções Disponíveis</FormLabel>
        {optionFields.map((field, index) => (
          <div key={field.id} className="flex space-x-2 items-center">
            <FormField
              control={control}
              name={`availableOptions.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nome da opção" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`availableOptions.${index}.additionalPrice`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Preço adicional"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" onClick={() => removeOption(index)}>
              Remover
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => appendOption({ name: "", additionalPrice: 0 })}
        >
          Adicionar Opção
        </Button>
      </div>
      <Button type="button" onClick={onPrevious}>
        Anterior
      </Button>
      <Button type="button" onClick={onNext}>
        Próximo
      </Button>
    </div>
  );
}

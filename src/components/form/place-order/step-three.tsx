// /src/components/CreateItemForm/StepThree.tsx

"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export function StepThree({ onPrevious }: { onPrevious: () => void }) {
  const { control, setValue } = useFormContext();
  const {
    fields: fileFields,
    remove: removeFile,
    append: appendFile,
  } = useFieldArray({
    control,
    name: "files",
  });

  function handleFileChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const files = e.target.files;

    if (files && files.length > 0) {
      // Atualiza o arquivo específico no array de arquivos
      setValue(`files.${index}`, { file: files[0] });
    }
  }

  return (
    <div>
      <div className="space-y-4">
        <FormLabel>Arquivos de Imagem</FormLabel>
        {fileFields.map((field, index) => (
          <div key={field.id} className="flex space-x-2 items-center">
            <FormField
              control={control}
              name={`files.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, index)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" onClick={() => removeFile(index)}>
              Remover
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => appendFile(null)}>
          Adicionar Arquivo
        </Button>
      </div>
      <Button type="button" onClick={onPrevious}>
        Anterior
      </Button>
      <Button type="submit">Enviar</Button>
    </div>
  );
}

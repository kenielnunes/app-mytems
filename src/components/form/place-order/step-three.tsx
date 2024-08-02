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
import { FileUploader } from "@/components/ui/file-uploader";

export function StepThree({ onPrevious }: { onPrevious: () => void }) {
  const { control, setValue } = useFormContext();

  console.log(control._fields);

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
        <FormField
          control={control}
          name="files"
          render={({ field }) => (
            <div className="space-y-6">
              <FormItem className="w-full">
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <FileUploader
                    value={field.value}
                    onValueChange={(files) => {
                      console.log("values files", files);

                      setValue("files", files);
                    }}
                    maxFileCount={4}
                    maxSize={4 * 1024 * 1024}
                    multiple
                    // pass the onUpload function here for direct upload
                    // onUpload={uploadFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <Button type="button">Adicionar Arquivo</Button>
      </div>
      <Button type="button" onClick={onPrevious}>
        Anterior
      </Button>
      <Button type="submit">Enviar</Button>
    </div>
  );
}

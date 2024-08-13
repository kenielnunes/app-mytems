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
import React from "react";
import { FileWithPreview, ImageCropper } from "@/components/ui/image-cropper";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SvgProfileImageText from "@/components/svg/svg-profile-image-text";

export function StepTwo({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) {
  const { control } = useFormContext();

  const [selectedFile, setSelectedFile] =
    React.useState<FileWithPreview | null>(null);

  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const accept = {
    "image/*": [],
  };

  const onDrop = React.useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const file = acceptedFiles[0];
      if (!file) {
        alert("Selected image is too large!");
        return;
      }

      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      setSelectedFile(fileWithPreview);
      setDialogOpen(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <div className="flex mx-auto flex-col justify-center">
      <div className="space-y-4 pb-10 flex justify-center flex-col items-center">
        <FormLabel className="text-xl">Imagem de perfil</FormLabel>

        <div className=" absolute -bottom-12 left-28 ">
          <SvgProfileImageText />
        </div>
        <div className="flex space-x-2 items-center">
          <FormField
            control={control}
            name={`profileImg`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    {selectedFile ? (
                      <ImageCropper
                        dialogOpen={isDialogOpen}
                        setDialogOpen={setDialogOpen}
                        selectedFile={selectedFile}
                        setSelectedFile={(file) => {
                          setSelectedFile(file);
                          field.onChange(selectedFile);
                        }}
                      />
                    ) : (
                      <Avatar
                        {...getRootProps()}
                        className="size-36 cursor-pointer ring-offset-2 ring-2 ring-slate-200"
                      >
                        <input {...getInputProps()} />
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    )}
                    <div className=" absolute -bottom-12 left-28 ">
                      <SvgProfileImageText />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Button type="button" onClick={onPrevious}>
          Anterior
        </Button>
        <Button type="submit">Cadastrar</Button>
      </div>
    </div>
  );
}

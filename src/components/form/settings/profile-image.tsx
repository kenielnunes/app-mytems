"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { FileWithPreview, ImageCropper } from "@/components/ui/image-cropper";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SvgProfileImageText from "@/components/svg/svg-profile-image-text";
import { profileImgSchema } from "./schemas";
import { useSession } from "@/contexts/use-session";
import { toast } from "sonner";
import { updateUser } from "@/services/api/modules/user/update-user";
import { updateUserProfileImage } from "@/services/api/modules/user/update-user-profile-image";

type FormValues = z.infer<typeof profileImgSchema>;

export function ProfileImageForm() {
  const { user } = useSession();

  const form = useForm<FormValues>({
    resolver: zodResolver(profileImgSchema),
  });

  const [selectedFile, setSelectedFile] =
    React.useState<FileWithPreview | null>(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const accept = {
    "image/*": [],
  };

  const onDrop = React.useCallback((acceptedFiles: FileWithPath[]) => {
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
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted with data:", data);

    const formData = new FormData();

    formData.append("profileImg", data.profileImg);

    toast.promise(updateUserProfileImage(formData));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex mx-auto flex-col justify-center"
      >
        <div className="space-y-4 pb-10 flex justify-center flex-col items-center">
          <FormLabel className="text-xl">Imagem de perfil</FormLabel>

          <div className="flex space-x-2 items-center">
            <FormField
              name="profileImg"
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
                            src={user?.profileImageUrl}
                            alt="Profile Image"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      )}
                      <div className="absolute -bottom-12 left-28">
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
          <Button type="submit">Atualizar</Button>
        </div>
      </form>
    </Form>
  );
}

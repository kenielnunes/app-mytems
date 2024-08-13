import React from "react";
import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FileWithPreview, ImageCropper } from "@/components/ui/image-cropper";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SvgProfileImageText from "@/components/svg/svg-profile-image-text";
import { Form, FormLabel } from "@/components/ui/form";
import { RegisterForm } from "@/components/form/register/register-form";

export default function index() {
  return (
    <div className="flex min-h-screen w-full flex-col justify-center items-center">
      <div className="relative ">
        {/* {selectedFile ? (
          <ImageCropper
            dialogOpen={isDialogOpen}
            setDialogOpen={setDialogOpen}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        ) : (
          <Avatar
            {...getRootProps()}
            className="size-36 cursor-pointer ring-offset-2 ring-2 ring-slate-200"
          >
            <input {...getInputProps()} />
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}

        <div className=" absolute -bottom-12 left-28 ">
          <SvgProfileImageText />
        </div> */}
      </div>
      <div className="mx-auto w-full max-w-2xl items-start gap-6 grid ">
        <div className="grid gap-6">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Register</h1>
          </div>
          <Card x-chunk="dashboard-04-chunk-1">
            <CardContent className="p-10">
              <RegisterForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

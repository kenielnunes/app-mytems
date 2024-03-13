import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Dropzone } from "../shared/dropzone";

export function SetOrderName() {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <>
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Name" />
        </div>
      </div>
      <div className="grid flex-1 gap-2">
        <Label htmlFor="picture">Banner Picture</Label>
        <Dropzone onChange={setFiles} className="w-full" fileExtension="png" />
      </div>
      <div className="grid flex-1 gap-2">
        <Label htmlFor="picture">More Pictures</Label>
        <Dropzone onChange={setFiles} className="w-full" fileExtension="png" />
      </div>
    </>
  );
}

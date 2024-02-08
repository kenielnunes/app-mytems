import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { CopyIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dropzone } from "./shared/dropzone";

export function PlaceOrder() {
  const { data } = useSession();
  const [files, setFiles] = useState<string[]>([]);

  if (data?.user) {
    return (
      <>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="absolute bottom-4 right-4">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Place Order</DialogTitle>
              <DialogDescription>
                Place your order to sell any item
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name" />
              </div>
            </div>
            <div className="grid flex-1 gap-2">
              <Label htmlFor="picture">Banner Picture</Label>
              <Dropzone
                onChange={setFiles}
                className="w-full"
                fileExtension="png"
              />
            </div>
            <div className="grid flex-1 gap-2">
              <Label htmlFor="picture">More Pictures</Label>
              <Dropzone
                onChange={setFiles}
                className="w-full"
                fileExtension="png"
              />
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

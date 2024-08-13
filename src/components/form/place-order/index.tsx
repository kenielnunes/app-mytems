import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Plus, PlusCircle } from "lucide-react";
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
import { useSession } from "@/contexts/use-session";
import { CreateAdForm } from "./create-ad-form";

export function AddProduct() {
  const { user } = useSession();

  if (user) {
    return (
      <>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="h-7 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Place Item to Sell</DialogTitle>
              <DialogDescription>
                Place your order to sell any item
              </DialogDescription>
            </DialogHeader>
            <CreateAdForm />
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

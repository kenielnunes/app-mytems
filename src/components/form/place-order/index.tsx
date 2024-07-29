import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
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
import { CreateItemForm } from "./create-item-form";

type PlaceOrderSteps =
  | "set-game"
  | "set-order-name"
  | "set-order-images"
  | "set-order-date"
  | "set-order-price";

export function PlaceOrder() {
  const { user } = useSession();

  const [step, setStep] = useState<PlaceOrderSteps>("set-game");

  const stepComponents: Record<PlaceOrderSteps, JSX.Element> = {
    "set-game": <CreateItemForm />,
    "set-order-date": <></>,
    "set-order-images": <></>,
    "set-order-name": <></>,
    "set-order-price": <></>,
  };

  if (user) {
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
              <DialogTitle>Place Item to Sell</DialogTitle>
              <DialogDescription>
                Place your order to sell any item
              </DialogDescription>
            </DialogHeader>
            <CreateItemForm />
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

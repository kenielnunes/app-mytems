import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export function PlaceOrder() {
  const { data } = useSession();

  if (data?.user) {
    return (
      <Button className="absolute bottom-4 right-4">
        <Plus className="h-4 w-4" />
      </Button>
    );
  }
}

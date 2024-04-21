import React from "react";
import { UserInfoCard } from "../user-info-card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

type OrderCardProps = {
  order: {
    seller: string;
  };
};

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <img
        alt="Product 1"
        className="object-cover w-full aspect-video"
        height={400}
        src="/placeholder.svg"
        width={600}
      />
      <div className="bg-white p-4 dark:bg-gray-950">
        <h3 className="font-semibold text-lg md:text-xl">Stylish Sunglasses</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          UV protection
        </p>
        <h4 className="font-semibold text-base md:text-lg">$29.99</h4>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Seller:
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="cursor-pointer"> {order.seller}</span>
              </HoverCardTrigger>
              <HoverCardContent className="border-none bg-transparent">
                <UserInfoCard />
              </HoverCardContent>
            </HoverCard>
          </p>
          <Button className="text-sm" variant="outline">
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
}

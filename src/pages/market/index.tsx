import { CommandMenu } from "@/components/command";
import { Dropzone } from "@/components/form/shared/dropzone";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { HeartIcon, TextIcon, Twitter } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Market() {
  return (
    <>
      <div className="grid gap-4 lg:gap-8 xl:gap-12 lg:grid-cols-2 xl:grid-cols-4 p-4 md:p-6">
        <div className="relative overflow-hidden rounded-lg">
          <img
            alt="Product 1"
            className="object-cover w-full aspect-video"
            height={400}
            src="/placeholder.svg"
            width={600}
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="font-semibold text-lg md:text-xl">
              Stylish Sunglasses
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              UV protection
            </p>
            <h4 className="font-semibold text-base md:text-lg">$29.99</h4>
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Seller:
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="cursor-pointer">@John Doe</span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage
                          alt="@johndoe"
                          src="/placeholder-avatar.jpg"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">@John Doe</h4>
                        <p className="text-sm">
                          Top-rated seller with great products.
                        </p>
                        <div className="flex items-center pt-2">
                          <Twitter className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            @johndoe
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <HeartIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Likes: 256
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TextIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Comments: 128
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Seller Biography: Lorem ipsum dolor sit amet,
                          consectetur adipiscing elit.
                        </p>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </p>
              <Button className="text-sm" variant="outline">
                Buy
              </Button>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg">
          <img
            alt="Product 2"
            className="object-cover w-full aspect-video"
            height={400}
            src="/placeholder.svg"
            width={600}
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="font-semibold text-lg md:text-xl">
              Leather Crossbody Bag
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Stylish and practical
            </p>
            <h4 className="font-semibold text-base md:text-lg">$49.99</h4>
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Seller:
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="cursor-pointer">@Jane Smith</span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage
                          alt="@janesmith"
                          src="/placeholder-avatar.jpg"
                        />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">@Jane Smith</h4>
                        <p className="text-sm">
                          Fashion enthusiast with a unique collection.
                        </p>
                        <div className="flex items-center pt-2">
                          <Twitter className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            @janesmith
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <HeartIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Likes: 312
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TextIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Comments: 98
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Seller Biography: Lorem ipsum dolor sit amet,
                          consectetur adipiscing elit.
                        </p>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </p>
              <Button className="text-sm" variant="outline">
                Buy
              </Button>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg">
          <img
            alt="Product 3"
            className="object-cover w-full aspect-video"
            height={400}
            src="/placeholder.svg"
            width={600}
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="font-semibold text-lg md:text-xl">
              Wireless Headphones
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              High-quality sound
            </p>
            <h4 className="font-semibold text-base md:text-lg">$79.99</h4>
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Seller:
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="cursor-pointer">@Michael Johnson</span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage
                          alt="@michaeljohnson"
                          src="/placeholder-avatar.jpg"
                        />
                        <AvatarFallback>MJ</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          @Michael Johnson
                        </h4>
                        <p className="text-sm">
                          Audiophile offering premium audio products.
                        </p>
                        <div className="flex items-center pt-2">
                          <Twitter className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            @michaeljohnson
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <HeartIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Likes: 198
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TextIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Comments: 76
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Seller Biography: Lorem ipsum dolor sit amet,
                          consectetur adipiscing elit.
                        </p>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </p>
              <Button className="text-sm" variant="outline">
                Buy
              </Button>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg">
          <img
            alt="Product 4"
            className="object-cover w-full aspect-video"
            height={400}
            src="/placeholder.svg"
            width={600}
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="font-semibold text-lg md:text-xl">
              Classic Wristwatch
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Timeless design
            </p>
            <h4 className="font-semibold text-base md:text-lg">$59.99</h4>
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Seller:
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="cursor-pointer">@Emily Brown</span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage
                          alt="@emilybrown"
                          src="/placeholder-avatar.jpg"
                        />
                        <AvatarFallback>EB</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">@Emily Brown</h4>
                        <p className="text-sm">
                          Vintage watch collector with a passion for horology.
                        </p>
                        <div className="flex items-center pt-2">
                          <Twitter className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            @emilybrown
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <HeartIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Likes: 412
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TextIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Comments: 178
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Seller Biography: Lorem ipsum dolor sit amet,
                          consectetur adipiscing elit.
                        </p>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </p>
              <Button className="text-sm" variant="outline">
                Buy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

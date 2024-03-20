import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { LogIn, LogOut } from "lucide-react";
import { useRouter } from "next/router";

export function Navbar() {
  const { data } = useSession();

  console.log(data?.user);

  const { push } = useRouter();

  return (
    <div className="max-w-screen flex justify-between p-3 items-center px-6">
      <NavigationMenu>
        <div>
          <h1>Logo</h1>
        </div>
        {/* <NavigationMenuList>
         
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Documentation
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Documentation
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Documentation
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList> */}
      </NavigationMenu>
      {/* <Dialog>
        <DialogHeader>Teste</DialogHeader>
        <DialogContent>Conteudo</DialogContent>
        <DialogFooter>
          <DialogClose>
            <Button>Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </Dialog> */}

      {data?.user?.image ? (
        <Menubar className="border-none">
          <MenubarMenu>
            <MenubarTrigger>
              <Avatar>
                <AvatarImage src={data.user.image} alt="avatar" />
                <AvatarFallback>
                  {data?.user?.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <ChevronDownIcon className="ml-2" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => signOut()} className="cursor-pointer">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      ) : (
        <Button onClick={() => push("/auth")}>
          <LogIn className="h-4 w-4 mr-2" />
          Sign In
        </Button>
      )}
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

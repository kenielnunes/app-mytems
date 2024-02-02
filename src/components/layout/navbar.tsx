import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { LogIn, LogOut } from "lucide-react";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function Navbar() {
  const { data } = useSession();

  const { push } = useRouter();

  console.log(data);
  return (
    <div className="w-screen flex justify-between p-3 items-center px-6">
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

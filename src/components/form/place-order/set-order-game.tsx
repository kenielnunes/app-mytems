import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { findGames } from "@/services/api/modules/game/find-games";
import { CommandLoading } from "cmdk";

export function SetOrderGame() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const filteredGames = await findGames({ name: search });

      return filteredGames;
    },
    gcTime: 50000,
  });

  const setOrderGameSchema = z.object({
    slug: z.string({
      required_error: "Please select a language.",
    }),
  });

  type SetOrderGameType = z.infer<typeof setOrderGameSchema>;

  const form = useForm<SetOrderGameType>({
    resolver: zodResolver(setOrderGameSchema),
    mode: "all",
  });

  async function onSubmit(data: SetOrderGameType) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      aria-expanded={open}
                      role="combobox"
                      className={cn(
                        "w-[320px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? data?.find((game) => game.slug === field.value)?.name
                        : "Select Game"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[320px] p-0">
                  <Command>
                    <CommandInput
                      onSelect={(e: any) => setSearch(e.target.value)}
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    {isLoading && <CommandLoading>Buscando...</CommandLoading>}

                    <CommandGroup>
                      {data?.map((game) => (
                        <CommandItem
                          value={game.name}
                          key={game.id}
                          onSelect={() => {
                            form.setValue("slug", game.slug);
                            setOpen(false);
                          }}
                        >
                          {game.name}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              game.slug === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the game that contains the item for sale
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

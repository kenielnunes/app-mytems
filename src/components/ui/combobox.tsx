import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ComboboxProps = {
  options?: { value: string; label: string }[];
  value?: string;
  onChangeInput: (currentValue: string) => void;
  onChange: (currentValue: string) => void;
  emptyResultMessage?: string;
  isFetching: boolean;
};

export function Combobox({
  options,
  onChange,
  onChangeInput,
  value,
  emptyResultMessage = "Nada encontrado", // Valor padrão para mensagem de resultado vazio
  isFetching,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options?.find((option) => option.value === value)?.label
            : "Selecione um jogo..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command onChange={(e: any) => onChangeInput(e.target.value)}>
          <CommandInput placeholder="Buscar jogo..." />
          <CommandList>
            {isFetching ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                <span>Buscando...</span>
              </div>
            ) : options?.length === 0 ? (
              <CommandEmpty>{emptyResultMessage}</CommandEmpty>
            ) : (
              <CommandGroup>
                {options?.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

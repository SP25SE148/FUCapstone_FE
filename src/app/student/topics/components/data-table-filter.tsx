"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DataTableFilterProps {
  title: string
  options: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
}

export function DataTableFilter({ title, options, value, onChange }: DataTableFilterProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between min-w-[150px]">
          {value ? options.find((option) => option.value === value)?.label || title : title}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${title.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No {title.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  onChange("")
                  setOpen(false)
                }}
                className="justify-between"
              >
                All
                {value === "" && <Check className="h-4 w-4" />}
              </CommandItem>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                  className="justify-between"
                >
                  {option.label}
                  {value === option.value && <Check className="h-4 w-4" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}


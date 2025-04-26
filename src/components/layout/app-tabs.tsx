"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Tabs({
  items,
}: {
  items: {
    label: string
    href: string
  }[]
}) {
  const pathname = usePathname()
  const activeTab = items.find((item) => pathname === item.href)

  return (
    <>
      <nav className="sticky top-2 z-40 hidden md:flex items-center h-9 rounded-lg shadow-lg bg-primary">
        {items.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "p-1 mx-2 rounded-md text-white text-sm font-bold",
                pathname === item.href ? "bg-white text-primary shadow-md" : "hover:bg-white/20",
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="md:hidden sticky top-14 z-40 flex justify-center mt-12 w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex justify-between items-center bg-primary text-white border-primary hover:bg-primary/90 hover:text-white"
            >
              <span>{activeTab?.label || "Select Tab"}</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[calc(100vw-16px)]" align="start">
            {items.map((item, index) => (
              <DropdownMenuItem key={index} asChild className="justify-start">
                <Link
                  href={item.href}
                  className={cn("w-full text-left px-4 py-2", pathname === item.href && "bg-muted")}
                >
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}

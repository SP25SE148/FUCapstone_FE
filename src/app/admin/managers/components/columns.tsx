"use client"

import { MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { Manager } from "@/types/types"

import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<Manager>[] = [
    {
        accessorKey: "userCode",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="User code" />
        ),
    },
    {
        accessorKey: "fullName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Full name" />
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: "majorId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Major" />
        ),
    },
    {
        accessorKey: "capstoneId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Capstone" />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const manager = row.original

            return (
                <div className="flex items-center justify-center">
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(manager.userId)}
                            >
                                Copy manager ID
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
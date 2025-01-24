"use client"

import { useRouter } from "next/navigation"
import { MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Topic = {
    id: string
    capstone: string
    code: string
    englishName: string
    vietnameseName: string
    abbreviation: string
    supervisor: string
    supervisor2: string
    status: "Pending" | "Available"
}

export const columns: ColumnDef<Topic>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "capstone",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Capstone" />
        ),
    },
    {
        accessorKey: "code",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Code" />
        ),
    },
    {
        accessorKey: "englishName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="English Name" />
        ),
    },
    {
        accessorKey: "vietnameseName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Vietnamese Name" />
        ),
    },
    {
        accessorKey: "abbreviation",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Abbreviation" />
        ),
    },
    {
        accessorKey: "supervisor",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Supervisor" />
        ),
    },
    {
        accessorKey: "supervisor2",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Supervisor 2" />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const router = useRouter();
            const topic = row.original;

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
                            <DropdownMenuItem
                                onClick={() => router.push(`topics/${topic.id}`)}
                            >
                                View details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
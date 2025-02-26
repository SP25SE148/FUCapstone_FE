"use client"

import { Check, MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Student = {
    id: string,
    fullName: string,
    majorId: string,
    majorName: string,
    capstoneId: string,
    capstoneName: string,
    campusId: string,
    campusName: string,
    email: string,
    isEligible: boolean,
    status: string
}

export const columns: ColumnDef<Student>[] = [
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
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Student code" />
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
        accessorKey: "isEligible",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Eligible" />
        ),
        cell: ({ row }) => {
            const student = row.original
            return student.isEligible && <Check className="ml-2" />
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const student = row.original
            switch (student?.status) {
                case "InProgress":
                    return (
                        <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                            In Progress
                        </Badge>
                    );
                case "Passed":
                    return (
                        <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
                            Passed
                        </Badge>
                    );
                case "NotPassed":
                    return (
                        <Badge variant="secondary" className="select-none bg-red-200 text-red-800 hover:bg-red-200">
                            Not Passed
                        </Badge>
                    );
                default:
                    return null;
            }
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const student = row.original

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
                                onClick={() => navigator.clipboard.writeText(student.id)}
                            >
                                Copy student ID
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
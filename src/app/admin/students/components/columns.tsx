"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Check, MoreHorizontal } from "lucide-react"

import { Student } from "@/types/types"
import { getStudentStatus } from "@/utils/statusUtils"

import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<Student>[] = [
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
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const student = row.original
            return getStudentStatus(student?.status)
        }
    },
    {
        accessorKey: "isHaveBeenJoinGroup",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="In Group" />
        ),
        cell: ({ row }) => {
            const student = row.original
            return student.isHaveBeenJoinGroup && <Check className="ml-2" />
        },
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
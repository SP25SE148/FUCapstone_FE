"use client"

import { useRouter } from "next/navigation"
import { MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { TimeConfig } from "@/types/types"
import { getTimeConfigStatus } from "@/utils/statusUtils"

import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<TimeConfig>[] = [
    {
        accessorKey: "semesterId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Semester Id" />
        ),
    },
    {
        accessorKey: "semesterName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Semester Name" />
        ),
    },
    {
        accessorKey: "isActived",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => getTimeConfigStatus(row?.original?.isActived)
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const router = useRouter();
            const timeConfig = row.original

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
                                onClick={() => navigator.clipboard.writeText(timeConfig.id)}
                            >
                                Copy time config ID
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => router.push(`/admin/configurations/${timeConfig?.semesterId}`)}
                            >
                                View details
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
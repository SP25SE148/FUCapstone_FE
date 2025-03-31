"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { Topic } from "@/types/types"
import { getTopicStatus } from "@/utils/statusUtils"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

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
        accessorKey: "capstoneId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Capstone" />
        ),
    },
    {
        accessorKey: "semesterId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Semester" />
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
        cell: ({ row }) => {
            return (
                <Link className="text-primary underline underline-offset-2 font-bold hover:text-blue-400" href={`/supervisor/topics/${row?.original?.id}`}>{row.original.englishName}</Link>
            )
        }
    },
    {
        accessorKey: "abbreviation",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Abbreviation" />
        ),
    },
    {
        accessorKey: "createdDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created Date" />
        ),
        cell: ({ row }) => {
            const topic = row.original;
            const date = new Date(topic?.createdDate);
            // Chuyển sang giờ Việt Nam (GMT+7)
            const vnDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));

            const day = vnDate.getDate().toString().padStart(2, '0');
            const month = (vnDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
            const year = vnDate.getFullYear();

            const hours = vnDate.getHours().toString().padStart(2, '0');
            const minutes = vnDate.getMinutes().toString().padStart(2, '0');
            const seconds = vnDate.getSeconds().toString().padStart(2, '0');

            return (
                <div className="flex items-center gap-2">
                    <span>{`${day}/${month}/${year}`}</span>
                    <span className="text-muted-foreground">{`${hours}:${minutes}:${seconds}`}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const topic = row.original;
            return getTopicStatus(topic?.status)
        }
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => router.push(`topics/${topic.id}`)}
                            >
                                View details
                            </DropdownMenuItem>
                            {topic?.status == "Considered" && <DropdownMenuItem
                                onClick={() => router.push(`topics/${topic.id}/update`)}
                            >
                                Update topic
                            </DropdownMenuItem>}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
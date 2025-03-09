"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Topic = {
    id: string;
    code: string;
    campusId: string;
    semesterId: string
    capstoneId: string;
    businessAreaName: string;
    difficultyLevel: string;
    englishName: string;
    vietnameseName: string
    abbreviation: string;
    description: string;
    mainSupervisorEmail: string
    mainSupervisorName: string
    coSupervisors: [];
    fileName: string;
    fileUrl: string
    createdDate: string;
    status: string
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
            switch (topic?.status) {
                case "Pending":
                    return (
                        <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                            {topic?.status}
                        </Badge>
                    );
                case "Approved":
                    return (
                        <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
                            {topic?.status}
                        </Badge>
                    );
                case "Considered":
                    return (
                        <Badge variant="secondary" className="select-none bg-rose-200 text-rose-800 hover:bg-rose-200">
                            {topic?.status}
                        </Badge>
                    );
                case "Rejected":
                    return (
                        <Badge variant="secondary" className="select-none bg-red-200 text-red-800 hover:bg-red-200">
                            {topic?.status}
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
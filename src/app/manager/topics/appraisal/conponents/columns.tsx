"use client"

import { useRouter } from "next/navigation"
import { MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export type Topic = {
    id: string
    capstone: string
    code: string
    englishName: string
    vietnameseName: string
    abbreviation: string
    supervisor: string
    supervisor2: string
    status: "C-R" | "C-C"
}

const ActionsCell = ({ topic }: { topic: Topic }) => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(topic.id)}
                    >
                        Copy Topic ID
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => router.push(`/manager/topics/appraisal/${topic.id}`)}
                    >
                        View details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

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
        cell: ({ row }) => {
            return (
                <Link className="text-primary font-bold underline" href={`/manager/topics/appraisal/${row?.original?.id}`}>{row.original.englishName}</Link>
            )
        }
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
            const topic = row.original;
            return <ActionsCell topic={topic} />;
        },
    },
];
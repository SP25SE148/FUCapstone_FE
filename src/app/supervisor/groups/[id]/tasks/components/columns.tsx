"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { User, Flag, Calendar, Hash, BarChart, ClipboardList } from "lucide-react";

import { getDate } from "@/lib/utils";
import { Task } from "@/contexts/supervisor/supervisor-group-context";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

const getStatus = (status: number | undefined) => {
    switch (status) {
        case 0:
            return (
                <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
                    Done
                </Badge>
            );
        case 1:
            return (
                <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                    In Progress
                </Badge>
            );
        case 2:
            return (
                <Badge variant="secondary" className="select-none bg-rose-200 text-rose-800 hover:bg-rose-200">
                    To Do
                </Badge>
            );
        default:
            return null;
    }
}

const getPriority = (status: number | undefined) => {
    switch (status) {
        case 0:
            return (
                <Badge variant="secondary" className="select-none bg-rose-200 text-rose-800 hover:bg-rose-200">
                    High
                </Badge>
            );
        case 1:
            return (
                <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
                    Medium
                </Badge>
            );
        case 2:
            return (
                <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                    Low
                </Badge>
            );
        default:
            return null;
    }
}

export const columns: ColumnDef<Task>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
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
        accessorKey: "keyTask",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Key" icon={<Hash />} />
        ),
        cell: ({ row }) => {
            const { id } = useParams();
            return <Link className="text-primary underline underline-offset-2 font-bold hover:text-blue-400" href={`/supervisor/groups/${id}/tasks/${row?.original?.id}`}>{row.original?.keyTask}</Link>
        }
    },
    {
        accessorKey: "summary",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Summary" icon={<ClipboardList />} />
        ),
    },
    {
        accessorKey: "assigneeName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Assignee" icon={<User />} />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" icon={<BarChart />} />
        ),
        cell: ({ row }) => getStatus(row.original?.status),
    },
    {
        accessorKey: "priority",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Priority" icon={<Flag />} />
        ),
        cell: ({ row }) => getPriority(row.original?.priority),
    },
    {
        accessorKey: "dueDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Due Date" icon={<Calendar />} />
        ),
        cell: ({ row }) => getDate(row.original?.dueDate),
    },
];


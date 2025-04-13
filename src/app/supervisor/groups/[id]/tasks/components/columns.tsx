"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { User, Flag, Calendar, Hash, BarChart, ClipboardList, CalendarCheck, UserCog } from "lucide-react";

import { Task } from "@/types/types";
import { getDate } from "@/lib/utils";
import { getPriorityStatus, getTaskStatus } from "@/utils/statusUtils";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const columns: ColumnDef<Task>[] = [
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
        accessorKey: "reporterName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Reporter" icon={<UserCog />} />
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
        cell: ({ row }) => getTaskStatus(row.original?.status),
    },
    {
        accessorKey: "priority",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Priority" icon={<Flag />} />
        ),
        cell: ({ row }) => getPriorityStatus(row.original?.priority),
    },
    {
        accessorKey: "dueDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Due Date" icon={<Calendar />} />
        ),
        cell: ({ row }) => getDate(row.original?.dueDate),
    },
    {
        accessorKey: "completionDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Completion Date" icon={<CalendarCheck />} />
        ),
        cell: ({ row }) => getDate(row.original?.completionDate || ""),
    },
];


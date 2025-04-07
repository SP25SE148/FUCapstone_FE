"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Decision } from "@/types/types";
import { getDecisionStatus } from "@/utils/statusUtils";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const columns: ColumnDef<Decision>[] = [
    {
        accessorKey: "groupCode",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Group Code" />
        ),
    },
    {
        accessorKey: "topicCode",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Topic Code" />
        )
    },
    {
        accessorKey: "supervisorName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Supervisor" />
        )
    },
    {
        accessorKey: "decision",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Decision" />
        ),
        cell: ({ row }) => getDecisionStatus(row?.original?.decision),
    },
];

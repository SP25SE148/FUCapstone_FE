"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"

import { getDate } from "@/lib/utils"
import { TopicAppraisal } from "@/types/types"
import { getTopicAppraisalStatus } from "@/utils/statusUtils"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<TopicAppraisal>[] = [
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
        accessorKey: "topicEnglishName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="English name" />
        ),
    },
    {
        accessorKey: "attemptTime",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Attempt Time" />
        ),
        cell: ({ row }) => {
            const topicAppraisal = row.original;
            return topicAppraisal?.attemptTime &&
                <Badge variant="secondary" className="text-xs font-medium w-1/2 justify-center">
                    {topicAppraisal?.attemptTime}
                </Badge>
            
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Appraisal status" />
        ),
        cell: ({ row }) => {
            const topicAppraisal = row.original;
            return getTopicAppraisalStatus(topicAppraisal?.status);
        },
    },
    {
        accessorKey: "appraisalDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Appraisal date" />
        ),
        cell: ({ row }) => {
            const topicAppraisal = row.original;
            return topicAppraisal?.appraisalDate && <span className="text-muted-foreground">{getDate(topicAppraisal?.appraisalDate)}</span>
        }
    },
    {
        id: "appraisal",
        cell: ({ row }) => {
            const topicAppraisal = row.original;
            return topicAppraisal?.status == "Pending" && <Button size={"sm"} asChild>
                <Link
                    href={{
                        pathname: `/supervisor/topics/appraisal/${topicAppraisal?.topicId}`,
                        query: { topicAppraisalId: `${topicAppraisal?.topicAppraisalId}` }
                    }}
                >
                    Appraisal
                </Link>
            </Button>;
        },
    },
];
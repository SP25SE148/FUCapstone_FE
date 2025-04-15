"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"

import { getDate } from "@/lib/utils"
import { TopicAppraisal } from "@/types/types"
import { getTopicAppraisalStatus } from "@/utils/statusUtils"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"

export const columns: ColumnDef<TopicAppraisal>[] = [
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
            return getTopicAppraisalStatus(String(topicAppraisal?.status));
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
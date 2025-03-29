"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"

import { getDate } from "@/lib/utils"
import { TopicAppraisal } from "@/types/types"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"

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
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Appraisal status" />
        ),
        cell: ({ row }) => {
            const topicAppraisal = row.original;
            switch (topicAppraisal?.status) {
                case "Pending":
                    return (
                        <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                            Pending
                        </Badge>
                    );
                case "Accepted":
                    return (
                        <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
                            Accepted
                        </Badge>
                    );
                case "Considered":
                    return (
                        <Badge variant="secondary" className="select-none bg-rose-200 text-rose-800 hover:bg-rose-200">
                            Considered
                        </Badge>
                    );
                case "Rejected":
                    return (
                        <Badge variant="secondary" className="select-none bg-red-200 text-red-800 hover:bg-red-200">
                            Rejected
                        </Badge>
                    );
                default:
                    return null;
            }
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
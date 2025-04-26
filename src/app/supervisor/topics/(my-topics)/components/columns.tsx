"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { Topic } from "@/types/types"
import { useAuth } from "@/contexts/auth-context"

import { getDate } from "@/lib/utils"
import { getTopicStatus } from "@/utils/statusUtils"

import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { useSupervisorTopic } from "@/contexts/supervisor/supervisor-topic-context"

export const columns: ColumnDef<Topic>[] = [
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
        cell: ({ row }) => (
            <span className="font-medium text-sm">
                {row?.original?.code === "undefined" || row?.original?.code === "" ? "_ _ _" : row?.original?.code}
            </span>
        )
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
            return <span className="text-muted-foreground">{getDate(topic?.createdDate)}</span>
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
            const { user } = useAuth();
            const router = useRouter();
            const topic = row.original;
            const { reAppraisalTopicForMainSupervisor } = useSupervisorTopic();
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
                            {topic?.status !== "Approved" && topic?.mainSupervisorName == user?.name && <DropdownMenuItem
                                onClick={() => router.push(`topics/${topic.id}/update`)}
                            >
                                Update topic
                            </DropdownMenuItem>}
                            {topic?.status === "Considered" && topic?.mainSupervisorName == user?.name && <DropdownMenuItem
                                onClick={() => reAppraisalTopicForMainSupervisor(topic?.id)}
                            >
                                Reappraisal topic
                            </DropdownMenuItem>}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
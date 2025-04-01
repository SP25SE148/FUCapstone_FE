"use client"

import { useState } from "react"
import { Eye } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { GroupFullInfo } from "@/types/types"
import { getGroupStatus } from "@/utils/statusUtils"

import GroupInfoSheet from "./group-info-sheet"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"

export const columns: ColumnDef<GroupFullInfo>[] = [
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
        accessorKey: "campusName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Campus" />
        ),
    },
    {
        accessorKey: "semesterName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Semester" />
        ),
    },
    {
        accessorKey: "majorName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Major" />
        ),
    },
    {
        accessorKey: "capstoneName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Capstone" />
        ),
    },
    {
        accessorKey: "averageGPA",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Average GPA" />
        ),
        cell: ({ row }) => {
            const group = row.original;
            return <span>{group?.averageGPA?.toFixed(2)}</span>
        }
    },
    {
        id: "leaderName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Leader" />
        ),
        cell: ({ row }) => {
            const group = row.original;
            const groupLeader = group?.groupMemberList?.find((x) => x.isLeader === true)

            return (
                <span>{groupLeader?.studentFullName}</span>
            )
        }
    },
    {
        accessorKey: "currentNumberOfGroupPerMax",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Member" />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const group = row.original;
            return getGroupStatus(group?.status)
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const group = row.original;
            const [open, setOpen] = useState<boolean>(false);

            return (
                <div className="flex items-center justify-center">
                    <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setOpen(true)}>
                        <Eye className="h-4 w-4" />
                    </Button>

                    <GroupInfoSheet open={open} onClose={() => setOpen(false)} group={group} />
                </div>
            )
        },
    },
]
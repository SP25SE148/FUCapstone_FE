"use client"

import { useState } from "react"
import { Eye } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import GroupInfoSheet from "./group-info-sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Member {
    id: string;
    groupId: string;
    studentId: string;
    studentFullName: string;
    studentEmail: string;
    gpa: number;
    isLeader: boolean;
    createdBy: string,
    createdDate: string,
    status: string;
}

export interface Topic {
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
    status: string;
    topicAppraisals: [];
}

export interface GroupTopicInfo {
    id: string,
    semesterName: string,
    majorName: string,
    capstoneName: string,
    campusName: string,
    topicCode: string,
    groupCode: string,
    averageGPA: number
    status: string,
    groupMemberList: Member[];
    topicResponse: Topic
}

export const columns: ColumnDef<GroupTopicInfo>[] = [
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
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const group = row.original;
            switch (group?.status) {
                case "Pending":
                    return (
                        <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                            {group?.status}
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
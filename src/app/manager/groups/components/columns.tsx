"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef, Row } from "@tanstack/react-table";

import { GroupFullInfo } from "@/types/types";
import { getGroupStatus } from "@/utils/statusUtils";

import AssignTopic from "./assign-topic";
import StudentSelection from "./student-selection";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteGroup from "@/app/manager/groups/components/delete-group";

function ActionsCell(row: Row<GroupFullInfo>) {
  const group = row.original;
  const [current, max] = group.currentNumberOfGroupPerMax
    .split("/")
    .map(Number);
  const isFull = current >= max;
  const noRegisterTopic =
    group.topicCode === "undefined" && group.groupCode !== "";
  const noDelete = group.topicCode === "undefined"
  const [open, setOpen] = useState(false);
  const [openTopic, setOpenTopic] = useState(false);
  const [openDeleteGroup, setOpenDeleteGroup] = useState(false);

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
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(group.id)}
          >
            Copy group ID
          </DropdownMenuItem>
          {!isFull && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              Add Member
            </DropdownMenuItem>
          )}
          {noRegisterTopic && (
            <DropdownMenuItem onClick={() => setOpenTopic(true)}>
              Assign Topic
            </DropdownMenuItem>
          )}
          {noDelete && (
          <DropdownMenuItem onClick={() => setOpenDeleteGroup(true)}>
            Delete Group
          </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <StudentSelection
        groupId={group.id}
        open={open}
        setOpen={() => setOpen(false)}
      />

      <AssignTopic
        GroupId={group.id}
        open={openTopic}
        setOpen={() => setOpenTopic(false)}
      />

      <DeleteGroup
        groupId={group.id}
        open={openDeleteGroup}
        setOpen={() => setOpenDeleteGroup(false)}
      />
    </div>
  );
}

export const columns: ColumnDef<GroupFullInfo>[] = [
  {
    accessorKey: "semesterName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Semester" />
    ),
  },
  {
    accessorKey: "groupCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group Code" />
    ),
    cell: ({ row }) => (
      <span className="font-medium text-sm">
        {row?.original?.groupCode === "" ? "_ _ _" : row?.original?.groupCode}
      </span>
    ),
  },
  {
    accessorKey: "topicCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Topic Code" />
    ),
    cell: ({ row }) => (
      <span className="font-medium text-sm">
        {row?.original?.topicCode === "undefined" ||
        row?.original?.topicCode === "" ||
        row?.original?.topicCode === null
          ? "_ _ _"
          : row?.original?.topicCode}
      </span>
    ),
  },
  {
    accessorKey: "averageGPA",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Average GPA" />
    ),
  },
  {
    id: "leaderName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Leader" />
    ),
    cell: ({ row }) => {
      const group = row.original;
      const groupLeader = group?.groupMemberList?.find(
        (x) => x.isLeader === true
      );
      return <span>{groupLeader?.studentFullName}</span>;
    },
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
      return getGroupStatus(group?.status);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => ActionsCell(row),
  },
];

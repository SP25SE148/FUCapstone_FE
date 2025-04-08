"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef, Row } from "@tanstack/react-table";

import { GroupFullInfo } from "@/types/types";
import { getGroupStatus } from "@/utils/statusUtils";

import StudentSelection from "./student-selection";
import AssignTopic from "./assign-topic";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ActionsCell(row: Row<GroupFullInfo>) {
  const group = row.original;
  const [current, max] = group.currentNumberOfGroupPerMax
    .split("/")
    .map(Number);
  const isFull = current >= max;
  const noRegisterTopic =
    group.topicCode === "undefined" && group.groupCode !== "";
  const [open, setOpen] = useState(false);

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
            // <DropdownMenuItem onClick={() => setOpenAddTopic(true)}>
              <div className="flex items-center gap-2">
                <AssignTopic GroupId={group.id} />
              </div>
            // </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <StudentSelection
        groupId={group.id}
        open={open}
        setOpen={() => setOpen(false)}
      />
    </div>
  );
}

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
  },
  {
    accessorKey: "topicCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Topic Code" />
    ),
    cell: ({ row }) => {
      const topicCode = row.original.topicCode;
      return (
        <span
          className={`${
            topicCode === "undefined"
              ? "text-red-500 font-semibold capitalize"
              : ""
          }`}
        >
          {topicCode}
        </span>
      );
    },
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

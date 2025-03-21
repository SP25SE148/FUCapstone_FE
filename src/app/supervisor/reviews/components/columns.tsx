"use client";

import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface DefendCapstoneProjectCouncilMember {
  id: string;
  name: string;
  isPresident: boolean;
  isSecretary: boolean;
}

interface DefendCapstoneProjectInformation {
  id: string;
  topic: {
    id: string;
    code: string;
    englishName: string;
    vietnameseName: string;
    mainSupervisorName: string;
    mainSupervisorEmail: string;
  };
  defendAttempt: boolean;
  semesterName: string;
  roomNo: string;
  date: string;
  isActive: boolean;
  councilMembers: DefendCapstoneProjectCouncilMember[];
}

const ActionsCell = ({ defendInfo }: { defendInfo: DefendCapstoneProjectInformation }) => {
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
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(defendInfo.id)}
          >
            Copy Defend Info ID
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/supervisor/defenses/${defendInfo.id}`}>
              View More
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const columns: ColumnDef<DefendCapstoneProjectInformation>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
    accessorKey: "topic.englishName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Topic Name" />
    ),
    cell: ({ row }) => row.original.topic.englishName,
  },
  {
    accessorKey: "topic.code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Topic Code" />
    ),
    cell: ({ row }) => row.original.topic.code,
  },
  {
    accessorKey: "topic.mainSupervisorName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Supervisor" />
    ),
    cell: ({ row }) => row.original.topic.mainSupervisorName,
  },
  {
    accessorKey: "semesterName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Semester" />
    ),
  },
  {
    accessorKey: "roomNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Room No" />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.isActive ? "Active" : "Inactive";
      return (
        <Badge
          className={`${
            status === "Active"
              ? "bg-green-100 text-green-600 hover:bg-green-100"
              : "bg-red-100 text-red-600 hover:bg-red-100"
          }`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <ActionsCell defendInfo={row.original} />
        <Link href={`/supervisor/reviews/${row.original.id}`}>
          <Button variant="outline" size="sm">
            View More
          </Button>
        </Link>
      </div>
    ),
  },
];
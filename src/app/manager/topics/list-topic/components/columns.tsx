"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Topic } from "@/contexts/manager/manager-topic-context";

const ActionsCell = ({ topic }: { topic: Topic }) => {
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
            onClick={() => navigator.clipboard.writeText(topic.id)}
          >
            Copy Topic ID
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/manager/topics/list-topic/${topic.id}`}>View Details</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const getStatusBadge = (status: number) => {
  switch (status) {
    case 0:
      return <Badge className="bg-yellow-100 text-yellow-600 hover:bg-yellow-100">Pending</Badge>;
    case 1:
      return <Badge className="bg-green-100 text-green-600 hover:bg-green-100">Passed</Badge>;
    case 2:
      return <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100">Considered</Badge>;
    case 3:
      return <Badge className="bg-red-100 text-red-600 hover:bg-red-100">Failed</Badge>;
    default:
      return null;
  }
};

export const columns: ColumnDef<Topic>[] = [
  {
    accessorKey: "englishName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="English Name" />
    ),
  },
  {
    accessorKey: "abbreviation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Abbreviation" />
    ),
  },
  {
    accessorKey: "mainSupervisorName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Main Supervisor" />
    ),
  },
  {
    accessorKey: "businessAreaName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Business Area" />
    ),
  },
  {
    accessorKey: "difficultyLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Difficulty Level" />
    ),
    cell: ({ row }) => {
      const difficulty = row.original.difficultyLevel;
      const difficultyText = difficulty === 0 ? "Easy" : difficulty === 1 ? "Medium" : "Hard";
      return <span>{difficultyText}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return getStatusBadge(status);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const topic = row.original;
      return <ActionsCell topic={topic} />;
    },
  },
];
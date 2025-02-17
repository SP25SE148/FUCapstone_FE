"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Topic } from "@/app/student/topics/type";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import TopicSheet from "@/app/student/topics/components/topic-sheet";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

const ActionsCell = ({ topic }: { topic: Topic }) => {
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
          <DropdownMenuItem onClick={() => setOpen(true)}>
            View More
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TopicSheet topic={topic} open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

const StatusCell = ({ status }: { status: string }) => {
  const color =
    status === "Assigned"
      ? "bg-red-100 text-red-600 hover:bg-red-100"
      : "bg-green-100 text-green-600 hover:bg-green-100";
  return <Badge className={color}>{status}</Badge>;
};

export const columns: ColumnDef<Topic>[] = [
  {
    accessorKey: "enName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="English Name" />
    ),
  },
  {
    accessorKey: "vnName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vietnamese Name" />
    ),
  },
  {
    accessorKey: "createBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <StatusCell status={row.original.status} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell topic={row.original} />,
  },
];

"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
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
import { Topic } from "@/contexts/student/student-topic-context";

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

const DifficultyLevelCell = ({ level }: { level: number }) => {
  const levelText = level === 0 ? "Easy" : level === 1 ? "Medium" : "Hard";
  const color =
    level === 0
      ? "bg-green-100 text-green-600 hover:bg-green-100"
      : level === 1
      ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-100"
      : "bg-red-100 text-red-600 hover:bg-red-100";
  return <Badge className={color}>{levelText}</Badge>;
};

export const columns: ColumnDef<Topic>[] = [
  {
    accessorKey: "englishName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="English Name" />
    ),
  },
  {
    accessorKey: "vietnameseName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vietnamese Name" />
    ),
  },
  {
    accessorKey: "mainSupervisorName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Supervisor" />
    ),
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
  },
  {
    accessorKey: "difficultyLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Difficulty Level" />
    ),
    cell: ({ row }) => <DifficultyLevelCell level={row.original.difficultyLevel} />,
  },
  {
    accessorKey: "businessAreaName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Business Area" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell topic={row.original} />,
  },
];
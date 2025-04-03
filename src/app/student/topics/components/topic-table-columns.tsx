"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Topic } from "@/types/types";
import { getTopicDifficulty } from "@/utils/statusUtils";

import { Button } from "@/components/ui/button";
import TopicSheet from "@/app/student/topics/components/topic-sheet";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

const InfoCell = ({ topic }: { topic: Topic }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setOpen(true)}>
        <Info className="h-4 w-4" />
      </Button>
      <TopicSheet topic={topic} open={open} onClose={() => setOpen(false)} />
    </div>
  );
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
    cell: ({ row }) => getTopicDifficulty(row.original.difficultyLevel || ""),
  },
  {
    accessorKey: "businessAreaName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Business Area" />
    ),
  },
  {
    accessorKey: "numberOfTopicRequest",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group(s)'ve Sent Request" />
    ),
  },
  {
    id: "info",
    cell: ({ row }) => <InfoCell topic={row.original} />,
  },
];
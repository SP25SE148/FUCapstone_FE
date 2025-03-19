"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import TopicSheet from "@/app/student/topics/components/topic-sheet";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Topic } from "@/contexts/student/student-topic-context";
import { Info } from "lucide-react";

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

const DifficultyLevelCell = ({ level }: { level: string }) => {
  const color =
    level === "Easy"
      ? "bg-green-100 text-green-500 hover:bg-green-100"
      : level === "Medium"
      ? "bg-yellow-100 text-yellow-500 hover:bg-yellow-100"
      : "bg-red-100 text-red-500 hover:bg-red-100";
  return <Badge className={color}>{level}</Badge>;
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
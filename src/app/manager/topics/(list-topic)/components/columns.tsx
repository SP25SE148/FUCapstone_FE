"use client";

import Link from "next/link";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, UserCheck } from "lucide-react";

import { Topic } from "@/contexts/manager/manager-topic-context";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import AssignSupervisor from "@/app/manager/topics/(list-topic)/components/add-assign-appraisal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";

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
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(topic.id)}
          >
            Copy Topic ID
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/manager/topics/${topic.id}`}>
              View Details
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const AssignAppraisalCell = ({ topic }: { topic: Topic }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size={"sm"}
        onClick={() => setOpen(true)}
        className="bg-primary hover:bg-primary/90 text-white font-medium px-4 py-2 rounded-md transition-all flex items-center gap-2"
      >
        <UserCheck />
        Assign
      </Button>
      {open && (
        <AssignSupervisor topicId={topic.id} onClose={() => setOpen(false)} />
      )}
    </>
  );
};

const getTopicStatusBadge = (status: string) => {
  switch (status) {
    case "Pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-600 hover:bg-yellow-100">
          Pending
        </Badge>
      );
    case "Approved":
      return (
        <Badge className="bg-green-100 text-green-600 hover:bg-green-100">
          Approved
        </Badge>
      );
    case "Considered":
      return (
        <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100">
          Considered
        </Badge>
      );
    case "Rejected":
      return (
        <Badge className="bg-red-100 text-red-600 hover:bg-red-100">
          Rejected
        </Badge>
      );
    default:
      return null;
  }
};

const getAppraisalStatusBadge = (status: number) => {
  switch (status) {
    case 0:
      return (
        <Badge className="bg-yellow-100 text-yellow-600 hover:bg-yellow-100">
          Pending
        </Badge>
      );
    case 1:
      return (
        <Badge className="bg-green-100 text-green-600 hover:bg-green-100">
          Accepted
        </Badge>
      );
    case 2:
      return (
        <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100">
          Considered
        </Badge>
      );
    case 3:
      return (
        <Badge className="bg-red-100 text-red-600 hover:bg-red-100">
          Rejected
        </Badge>
      );
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
    cell: ({ row }) => {
      const topic = row.original;
      return (
        <Link
          href={`/manager/topics/${topic.id}`}
          className="text-primary underline underline-offset-2 font-bold hover:text-blue-400"
        >
          {topic.englishName}
        </Link>
      );
    },
  },
  {
    accessorKey: "topicAppraisals[0]",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Appraisal 1" />
    ),
    cell: ({ row }) => {
      const appraisal = row.original.topicAppraisals[0];
      if (!appraisal) return <span>N/A</span>;
      return <div>{appraisal.supervisorId} - {getAppraisalStatusBadge(appraisal.status)}</div>;
    },
  },
  {
    accessorKey: "topicAppraisals[1]",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Appraisal 2" />
    ),
    cell: ({ row }) => {
      const appraisal = row.original.topicAppraisals[1];
      if (!appraisal) return <span>N/A</span>;
      return <div>{appraisal.supervisorId} - {getAppraisalStatusBadge(appraisal.status)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Final Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return getTopicStatusBadge(status);
    },
  },
  {
    id: "assign",
    header: () => <span className="text-xs">Assign Appraisal</span>,
    cell: ({ row }) => {
      const topic = row.original;
      const missingAssign =
        topic.status === "Pending" &&
        topic.topicAppraisals.length === 1;
      return missingAssign && <AssignAppraisalCell topic={row.original} />;
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

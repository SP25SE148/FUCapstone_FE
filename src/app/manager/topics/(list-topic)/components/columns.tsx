"use client";

import Link from "next/link";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { UserCheck } from "lucide-react";

import { Topic } from "@/types/types";
import { getTopicAppraisalStatus, getTopicStatus } from "@/utils/statusUtils";

import AssignSupervisor from "@/app/manager/topics/(list-topic)/components/add-assign-appraisal";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

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

export const columns: ColumnDef<Topic>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Topic Code" />
    ),
    cell: ({ row }) => {
      const topic = row.original;
      return (
        <span className="font-medium text-sm">{topic.code}</span>
      );
    },
  },
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
    accessorKey: "mainSupervisorName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registrant" />
    ),
    cell: ({ row }) => {
      const topic = row.original;
      return (
        <span className="font-medium text-sm">{topic.mainSupervisorName}</span>
      );
    },
  },
  {
    accessorKey: "appraisals",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Appraisals" />
    ),
    cell: ({ row }) => {
      const topic = row.original;

      const maxAttemptTime = Math.max(
        ...topic.topicAppraisals.map((appraisal) => appraisal.attemptTime)
      );

      const latestAppraisals = topic.topicAppraisals.filter(
        (appraisal) => appraisal.attemptTime === maxAttemptTime
      );

      return (
        <div className="space-y-2">
          {latestAppraisals.map((appraisal) => (
            <div
              key={appraisal.topicAppraisalId}
              className="flex items-center justify-start gap-2"
            >
              <span className="font-medium text-sm">
                {appraisal.supervisorId}
              </span>
              <span className="text-sm text-muted-foreground">
                {getTopicAppraisalStatus(appraisal.status)}
              </span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Final Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return getTopicStatus(status);
    },
  },
  {
    id: "assign",
    header: () => <span className="text-xs">Assign Appraisal</span>,
    cell: ({ row }) => {
      const topic = row.original;
      const missingAssign =
        topic.status === "Pending" && topic.topicAppraisals.length <= 1;
      return missingAssign && <AssignAppraisalCell topic={row.original} />;
    },
  },
];

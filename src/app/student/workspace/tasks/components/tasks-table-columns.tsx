"use client";

import { useRouter } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import {
  User,
  Flag,
  Calendar,
  Hash,
  BarChart,
  ClipboardList,
  UserCog2,
  CalendarCheck,
} from "lucide-react";

import { Task } from "@/types/types";

import AssignTask from "@/app/student/workspace/tasks/components/assign-task";
import UpdateStatus from "@/app/student/workspace/tasks/components/update-status";
import UpdatePriority from "@/app/student/workspace/tasks/components/update-priority";
import UpdateDueDate from "@/app/student/workspace/tasks/components/update-duedate";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { getDate } from "@/lib/utils";

const UpdateStatusCell = ({ task }: { task: Task }) => {
  return <UpdateStatus task={task} onClose={() => {}} />;
};

const UpdatePriorityCell = ({ task }: { task: Task }) => {
  return <UpdatePriority task={task} onClose={() => {}} />;
};

const UpdateDueDateCell = ({ task }: { task: Task }) => {
  return <UpdateDueDate task={task} onClose={() => {}} />;
};

const CompletionDateCell = ({ task }: { task: Task }) => {
  return (
    <>{task?.completionDate ? getDate(task.completionDate) : <p className="text-red-400">Not Done</p>}</>
  );
};

const KeyTaskCell = ({ task }: { task: Task }) => {
  const router = useRouter();

  return (
    <div>
      <button
        className="text-primary underline font-semibold"
        onClick={() => router.push(`/student/workspace/tasks/${task.id}`)}
      >
        {task.keyTask}
      </button>
    </div>
  );
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "keyTask",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Key"
        icon={<Hash className="mr-2 h-4 w-4" />}
      />
    ),
    cell: ({ row }) => <KeyTaskCell task={row.original} />,
  },
  {
    accessorKey: "summary",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Summary"
        icon={<ClipboardList className="mr-2 h-4 w-4" />}
      />
    ),
  },
  {
    accessorKey: "reporterName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Reporter"
        icon={<UserCog2 className="mr-2 h-4 w-4" />}
      />
    ),
  },
  {
    accessorKey: "assigneeId",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Assignee"
        icon={<User className="mr-2 h-4 w-4" />}
      />
    ),
    cell: ({ row }) => (
      <AssignTask
        task={row.original}
        onAssign={(assignedTo) => {
          row.original.assigneeId = assignedTo;
        }}
      />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        icon={<BarChart className="mr-2 h-4 w-4" />}
      />
    ),
    cell: ({ row }) => <UpdateStatusCell task={row.original} />,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Priority"
        icon={<Flag className="mr-2 h-4 w-4" />}
      />
    ),
    cell: ({ row }) => <UpdatePriorityCell task={row.original} />,
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Due Date"
        icon={<Calendar className="mr-2 h-4 w-4" />}
      />
    ),
    cell: ({ row }) => <UpdateDueDateCell task={row.original} />,
  },
  {
    accessorKey: "completionDate",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Completed Date"
        icon={<CalendarCheck className="mr-2 h-4 w-4" />}
      />
    ),
    cell: ({ row }) => <CompletionDateCell task={row.original} />,
  },
];

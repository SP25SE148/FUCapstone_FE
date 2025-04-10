"use client";

import { useRouter } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { User, Flag, Calendar, Hash, BarChart, ClipboardList, UserCog2 } from "lucide-react";

import { Task } from "@/types/types";

import AssignTask from "@/app/student/workspace/tasks/components/assign-task";
import UpdateStatus from "@/app/student/workspace/tasks/components/update-status";
import UpdatePriority from "@/app/student/workspace/tasks/components/update-priority";
import UpdateDueDate from "@/app/student/workspace/tasks/components/update-duedate";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

const UpdateStatusCell = ({ task }: { task: Task }) => {
  return <UpdateStatus task={task} onClose={() => { }} />;
};

const UpdatePriorityCell = ({ task }: { task: Task }) => {
  return <UpdatePriority task={task} onClose={() => { }} />;
};

const UpdateDueDateCell = ({ task }: { task: Task }) => {
  return <UpdateDueDate task={task} onClose={() => { }} />;
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
    accessorKey: "keyTask",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Key" icon={<Hash className="mr-2 h-4 w-4" />} />
    ),
    cell: ({ row }) => <KeyTaskCell task={row.original} />,
  },
  {
    accessorKey: "summary",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Summary" icon={<ClipboardList className="mr-2 h-4 w-4" />} />
    ),
  },
  {
    accessorKey: "reporterName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reporter" icon={<UserCog2 className="mr-2 h-4 w-4" />} />
    ),
  },
  {
    accessorKey: "assigneeId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assignee" icon={<User className="mr-2 h-4 w-4" />} />
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
      <DataTableColumnHeader column={column} title="Status" icon={<BarChart className="mr-2 h-4 w-4" />} />
    ),
    cell: ({ row }) => <UpdateStatusCell task={row.original} />,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" icon={<Flag className="mr-2 h-4 w-4" />} />
    ),
    cell: ({ row }) => <UpdatePriorityCell task={row.original} />,
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" icon={<Calendar className="mr-2 h-4 w-4" />} />
    ),
    cell: ({ row }) => <UpdateDueDateCell task={row.original} />,
  },
];


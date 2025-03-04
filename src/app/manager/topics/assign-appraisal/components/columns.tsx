"use client";

import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAssignAppraisal } from "@/contexts/manager/manager-assign-appraisal-context";

export type Topic = {
  id: string;
  fullName: string;
  majorName: string;
  campusName: string;
  email: string;
};

const ActionsCell = ({ topic }: { topic: Topic }) => {
  const router = useRouter();

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
            Copy Supervisor ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/manager/topics/appraisal/${topic.id}`)}
          >
            View details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const columns: ColumnDef<Topic>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      const { toggleSupervisorSelection } = useAssignAppraisal();
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            toggleSupervisorSelection(row.original.email);
          }}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
  },
  {
    accessorKey: "majorName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Major" />
    ),
  },
  {
    accessorKey: "campusName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Campus" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const topic = row.original;
      return <ActionsCell topic={topic} />;
    },
  },
];

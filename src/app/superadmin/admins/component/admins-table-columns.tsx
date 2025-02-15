"use client";

import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export type Admin = {
  userId: string;
  userCode: string;
  fullName: string;
  email: string;
  majorId: string;
  campusId: string;
  capstoneId: string;
  userName: string;
};

export const columns: ColumnDef<Admin>[] = [
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
    accessorKey: "userCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Code" />
    ),
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "majorId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Major ID" />
    ),
  },
  {
    accessorKey: "campusId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Campus ID" />
    ),
  },
  {
    accessorKey: "capstoneId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capstone ID" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const admin = row.original;

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
                onClick={() => navigator.clipboard.writeText(admin.userId)}
              >
                Copy Admin ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Admin</DropdownMenuItem>
              <DropdownMenuItem>Edit Admin</DropdownMenuItem>
              <DropdownMenuItem>Delete Admin</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

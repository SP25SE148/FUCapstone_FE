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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Badge } from "@/components/ui/badge";
<<<<<<< HEAD
import { useCapstone } from "@/contexts/superadmin/superadmin-capstone-context";
=======
import { useCapstone } from "@/contexts/superadmin/superadmin-capstone-management";
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UpdateCapstone from "@/app/superadmin/capstones/component/update-capstone";

export type Capstone = {
  id: string;
  majorId: string;
  name: string;
  minMember: number;
  maxMember: number;
  reviewCount: number;
  isDeleted: boolean;
  deletedAt: string | null;
};

const ActionsCell = ({ capstone }: { capstone: Capstone }) => {
  const { removeCapstone } = useCapstone();
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

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
            onClick={() => navigator.clipboard.writeText(capstone.id)}
          >
            Copy Capstone ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setUpdateOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove the capstone {capstone.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                try {
                  await removeCapstone(capstone.id);
                  setOpen(false);
                } catch (error) {
                  console.error("Error removing capstone:", error);
                  alert("Failed to remove capstone");
                }
              }}
            >
              Yes, Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UpdateCapstone capstone={capstone} open={updateOpen} setOpen={setUpdateOpen} />
    </div>
  );
};

export const columns: ColumnDef<Capstone>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capstone Code" />
    ),
  },
  {
    accessorKey: "majorId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Major ID" />
    ),
  },
  {
    accessorKey: "minMember",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Min Members" />
    ),
  },
  {
    accessorKey: "maxMember",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Max Members" />
    ),
  },
  {
    accessorKey: "reviewCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Review Count" />
    ),
  },
  {
    accessorKey: "isDeleted",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const capstone = row.original;
      const status = capstone.isDeleted ? "Inactive" : "Active";

      return (
        <Badge
          className={`${
            status === "Active"
              ? "bg-green-100 text-green-600 hover:bg-green-100"
              : "bg-red-100 text-red-600 hover:bg-red-100"
          }`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const capstone = row.original;
      return <ActionsCell capstone={capstone} />;
    },
  },
];
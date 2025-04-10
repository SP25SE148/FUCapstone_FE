"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Capstone } from "@/types/types";
import { getCapstoneStatus } from "@/utils/statusUtils";
import { useCapstone } from "@/contexts/superadmin/superadmin-capstone-context";

import UpdateCapstone from "@/app/superadmin/capstones/component/update-capstone";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";

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
            Copy capstone ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setUpdateOpen(true)}>
            Edit capstone
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Remove capstone
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
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capstone Code" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
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
    accessorKey: "durationWeeks",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration Weeks" />
    ),
  },
  {
    accessorKey: "isDeleted",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return getCapstoneStatus(row?.original?.isDeleted)
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
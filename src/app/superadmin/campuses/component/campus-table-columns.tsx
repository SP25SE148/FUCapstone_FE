"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Campus } from "@/types/types";
import { getCampusStatus } from "@/utils/statusUtils";
import { useCampus } from "@/contexts/superadmin/superadmin-campus-context";

import UpdateCampus from "./update-campus";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const ActionsCell = ({ campus }: { campus: Campus }) => {
  const { removeCampus } = useCampus();
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
            onClick={() => navigator.clipboard.writeText(campus.id)}
          >
            Copy campus ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setUpdateOpen(true)}>
            Edit campus
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Remove campus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove the campus {campus.name}?
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
                  await removeCampus(campus.id);
                  setOpen(false);
                } catch (error) {
                  console.error("Error removing campus:", error);
                  alert("Failed to remove campus");
                }
              }}
            >
              Yes, Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UpdateCampus campus={campus} open={updateOpen} setOpen={setUpdateOpen} />
    </div>
  );
};

export const columns: ColumnDef<Campus>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const campus = row.original;
      return getCampusStatus(campus?.isDeleted)
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell campus={row.original} />,
  },
];
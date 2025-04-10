"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Major, MajorGroup } from "@/types/types";
import { getMajorGroupStatus, getMajorStatus } from "@/utils/statusUtils";
import { useMajorGroup } from "@/contexts/superadmin/superadmin-majorgroup-context";

import UpdateMajor from "@/app/superadmin/majorgroups/component/update-major";
import UpdateMajorGroup from "@/app/superadmin/majorgroups/component/update-majorgroup";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";

const ActionsCell = ({ majorGroup }: { majorGroup: MajorGroup }) => {
  const router = useRouter();
  const { removeMajorGroup } = useMajorGroup();
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
            onClick={() => navigator.clipboard.writeText(majorGroup.id)}
          >
            Copy major group ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setUpdateOpen(true)}>
            Edit major group
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Remove major group
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/superadmin/majorgroups/${majorGroup.id}`)
            }
          >
            View more
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove the major group {majorGroup.name}?
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
                  await removeMajorGroup(majorGroup.id);
                  setOpen(false);
                } catch (error) {
                  console.error("Error removing major group:", error);
                  alert("Failed to remove major group");
                }
              }}
            >
              Yes, Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UpdateMajorGroup
        majorGroup={majorGroup}
        open={updateOpen}
        setOpen={setUpdateOpen}
      />
    </div>
  );
};

const MajorActionsCell = ({ major }: { major: Major }) => {
  const { removeMajorGroup } = useMajorGroup();
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
            onClick={() => navigator.clipboard.writeText(major.id)}
          >
            Copy major ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setUpdateOpen(true)}
          >
            Edit major
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Remove major
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove the major {major.name}?
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
                  await removeMajorGroup(major.id);
                  setOpen(false);
                } catch (error) {
                  console.error("Error removing major :", error);
                  alert("Failed to remove major ");
                }
              }}
            >
              Yes, Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UpdateMajor major={major} open={updateOpen} setOpen={setUpdateOpen} />
    </div>
  );
};

export const columns: ColumnDef<MajorGroup>[] = [
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
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const majorGroup = row.original;
      const description = majorGroup.description;

      return (
        <p className="text-gray-500 text-sm leading-relaxed max-w-[600px] overflow-hidden text-ellipsis whitespace-nowrap">
          {description}
        </p>
      );
    },
  },
  {
    accessorKey: "isDeleted",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return getMajorGroupStatus(row?.original?.isDeleted);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const majorGroup = row.original;
      return <ActionsCell majorGroup={majorGroup} />;
    },
  },
];

export const majorColumns: ColumnDef<Major>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Major Code" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Major Name" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const major = row.original;
      const description = major.description;

      return (
        <p className="text-gray-500 text-sm leading-relaxed max-w-[600px] overflow-hidden text-ellipsis whitespace-nowrap">
          {description}
        </p>
      );
    },
  },
  {
    accessorKey: "isDeleted",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return getMajorStatus(row?.original?.isDeleted)
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const major = row.original;
      return <MajorActionsCell major={major} />;
    },
  },
];

"use client";

import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

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
import { useMajorGroup } from "@/contexts/superadmin/superadmin-majorgroup-context";
=======
import { useMajorGroup } from "@/contexts/superadmin/superadmin-majorgroup-management";
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateMajorGroup from "@/app/superadmin/majorgroups/component/update-majorgroup";
import UpdateMajor from "@/app/superadmin/majorgroups/component/update-major";

export type MajorGroup = {
  id: string;
  name: string;
  description: string;
  isDeleted: boolean;
  deletedAt: string | null;
};

export type Major = {
  id: string;
  majorGroupId: string;
  name: string;
  description: string;
  isDeleted: boolean;
  deletedAt: string | null;
};

const ActionsCell = ({ majorGroup }: { majorGroup: MajorGroup }) => {
  const { removeMajorGroup } = useMajorGroup();
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
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
            onClick={() => navigator.clipboard.writeText(majorGroup.id)}
          >
            Copy Major Group ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setUpdateOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Remove
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/superadmin/majorgroups/${majorGroup.id}`)
            }
          >
            View More
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
  // const router = useRouter();

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
            Copy Major Group ID
          </DropdownMenuItem>
          <DropdownMenuItem
          onClick={() => setUpdateOpen(true)}
          >
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
      <DataTableColumnHeader column={column} title="Code" />
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
      const majorGroup = row.original;
      const status = majorGroup.isDeleted ? "Inactive" : "Active";

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
      const major = row.original;
      const status = major.isDeleted ? "Inactive" : "Active";

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
      const major = row.original;
      return <MajorActionsCell major={major} />;
    },
  },
];

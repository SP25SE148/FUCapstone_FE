"use client";

import { getDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ReviewCalendar } from "@/contexts/manager/manager-review-context";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const columns: ColumnDef<ReviewCalendar>[] = [
  {
    accessorKey: "groupCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group Code" />
    ),
  },
  {
    accessorKey: "topicCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Topic Code" />
    )
  },
  {
    accessorKey: "topicEnglishName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="English Name" />
    )
  },
  {
    accessorKey: "attempt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Attempt" />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = row.original?.date;
      return getDate(date)?.split(" ")?.[0];
    },
  },
  {
    accessorKey: "slot",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slot" />
    ),
  },
  {
    accessorKey: "room",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Room" />
    ),
  },
  {
    accessorKey: "reviewersCode[0]",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reviewer 1" />
    ),
    cell: ({ row }) => {
      const reviewer1 = row.original?.reviewersCode[0];
      return reviewer1;
    },
  },
  {
    accessorKey: "reviewersCode[1]",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reviewer 2" />
    ),
    cell: ({ row }) => {
      const reviewer2 = row.original?.reviewersCode[1];
      return reviewer2;
    },
  },
];
"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { getDate } from "@/lib/utils";
import { ReviewCalendar } from "@/types/types";
import { getReviewCalendarStatus } from "@/utils/statusUtils";

import { Button } from "@/components/ui/button";
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
    accessorKey: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
  },
  {
    accessorKey: "room",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Room" />
    ),
  },
  {
    id: "reviewers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reviewers" />
    ),
    cell: ({ row }) => {
      const reviewCalendar = row.original
      return (
        <div>
          {reviewCalendar.reviewers?.map((reviewer, index) => (
            <p key={index}>{reviewer}</p>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => getReviewCalendarStatus(row.original?.status),
  },
  {
    id: "action",
    cell: ({ row }) => {
      const reviewCalendar = row.original;
      return reviewCalendar?.status === "InProgress" &&
        <Button
          asChild
          size={"icon"}
        >
          <Link
            href={{
              pathname: `/supervisor/reviews/${reviewCalendar?.id}`,
              query: {
                groupId: `${reviewCalendar?.groupId}`,
                attempt: `${reviewCalendar?.attempt}`
              }
            }}
          >
            <Eye />
          </Link>
        </Button>;
    },
  }
];
"use client";

import { getDate } from "@/lib/utils";
import { ReviewCalendar } from "@/types/types";
import { getReviewCalendarStatus } from "@/utils/statusUtils";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import UpdateStatus from "@/app/manager/reviews/components/update-status";
import { useManagerReview } from "@/contexts/manager/manager-review-context";

const canUpdateStatus = (status: string) => {
  return status !== "";
};

const ActionCell = ({ row }: { row: any }) => {
  const { updateReviewCalendarStatus } = useManagerReview();
  const reviewCalendar = row.original;

  return (
    <UpdateStatus
      onUpdate={(newStatus) =>
        updateReviewCalendarStatus(reviewCalendar.id, newStatus)
      }
    />
  );
};

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
    ),
  },
  {
    accessorKey: "topicEnglishName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="English Name" />
    ),
    cell: ({ row }) => (
      <div className="max-w-80">
        <span>{row.original?.topicEnglishName}</span>
      </div>
    ),
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
      const reviewCalendar = row.original;
      return (
        <div>
          {reviewCalendar.reviewers?.map((reviewer: string, index: number) => (
            <p key={index}>{reviewer}</p>
          ))}
        </div>
      );
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
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="" />
    ),
    cell: ({ row }) => {
      return canUpdateStatus(row.original?.status) ? (
        <ActionCell row={row} />
      ) : (
        <></>
      );
    },
  },
];

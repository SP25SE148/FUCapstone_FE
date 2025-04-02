"use client"

import { ArrowRight } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import type { DefenseCalendarItem } from "@/contexts/supervisor/supervisor-defense-context"
import { useRouter } from "next/navigation"
import { getDate, getDateNoTime } from "@/lib/utils"

const ActionsCell = ({ defendInfo }: { defendInfo: DefenseCalendarItem }) => {
  const router = useRouter()

  const handleNavigateToDetail = () => {
    router.push(`/supervisor/defenses/${defendInfo.id}`)
  }

  return (
    <div className="flex items-center justify-end">
    {defendInfo.status !== "Done" && (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleNavigateToDetail}
        className="h-8 px-2 text-primary hover:text-primary hover:bg-primary/10 flex items-center gap-1"
      >
        View
        <ArrowRight className="h-3.5 w-3.5 ml-1" />
        <span className="sr-only">View details</span>
      </Button>
    )}
  </div>
  )
}

export const columns: ColumnDef<DefenseCalendarItem>[] = [
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
    accessorKey: "defenseDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Defense Date" />,
    cell: ({ row }) => <span>{getDateNoTime(row.original.defenseDate)}</span>,
  },
  {
    accessorKey: "topicCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Topic Code" />,
    cell: ({ row }) => <span>{row.original.topicCode}</span>,
  },
  {
    accessorKey: "groupCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Group Code" />,
    cell: ({ row }) => <span>{row.original.groupCode}</span>,
  },
  {
    accessorKey: "defendAttempt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Defend Attempt" />,
    cell: ({ row }) => <span>{row.original.defendAttempt}</span>,
  },
  {
    accessorKey: "slot",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Slot" />,
    cell: ({ row }) => <span>{row.original.slot}</span>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
    cell: ({ row }) => <span>{row.original.location}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell defendInfo={row.original} />,
  },
]


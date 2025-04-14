"use client"

import { useRouter } from "next/navigation"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowRight, Building2, Calendar, Clock, Hash, TicketMinus, Users2 } from "lucide-react"

import { getDateNoTime } from "@/lib/utils"
import { DefenseCalendarItem } from "@/types/types"

import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"

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
    accessorKey: "defenseDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Defense Date" icon={<Calendar className="h-4 w-4" />} />,
    cell: ({ row }) => <span>{getDateNoTime(row.original.defenseDate)}</span>,
  },
  {
    accessorKey: "topicCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Topic Code" icon={<Hash className="h-4 w-4" />} />,
    cell: ({ row }) => <span>{row.original.topicCode}</span>,
  },
  {
    accessorKey: "groupCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Group Code" icon={<Users2 className="h-4 w-4" />} />,
    cell: ({ row }) => <span>{row.original.groupCode}</span>,
  },
  {
    accessorKey: "defendAttempt",
    header: ({ column }) => (
      <div className="flex justify-center w-full">
        <DataTableColumnHeader column={column} title="Defend Attempt" icon={<TicketMinus className="h-4 w-4" />} />
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.original.defendAttempt}</div>,
  },
  {
    accessorKey: "slot",
    header: ({ column }) => (
      <div className="flex justify-center w-full">
        <DataTableColumnHeader column={column} title="Slot" icon={<Clock className="h-4 w-4" />} />
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.original.slot}</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Location" icon={<Building2 className="h-4 w-4" />} />,
    cell: ({ row }) => <span>{row.original.location}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell defendInfo={row.original} />,
  },
]


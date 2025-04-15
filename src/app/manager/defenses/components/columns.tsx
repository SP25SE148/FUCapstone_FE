"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Building2, Calendar, Clock, Hash, TicketMinus, Users2 } from 'lucide-react'

import { getDateNoTime } from "@/lib/utils"
import { DefenseCalendarItem } from "@/types/types"

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"

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
    accessorKey: "time",
    header: ({ column }) => (
      <div className="flex justify-center w-full">
        <DataTableColumnHeader column={column} title="Slot" icon={<Clock className="h-4 w-4" />} />
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.original.time}</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Location" icon={<Building2 className="h-4 w-4" />} />,
    cell: ({ row }) => <span>{row.original.location}</span>,
  }
]
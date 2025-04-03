"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import type { DefenseCalendarItem } from "@/contexts/supervisor/supervisor-defense-context"
import { getDateNoTime } from "@/lib/utils"
import { Building2, Calendar, Clock, Clock1, Group, Hash, Locate, LocateFixedIcon, LocateIcon, LocateOff, PlayCircle, TicketMinus, Users2 } from 'lucide-react'


export const columns: ColumnDef<DefenseCalendarItem>[] = [
  {
    accessorKey: "defenseDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Defense Date" icon={<Calendar className="h-4 w-4"/>} />,
    cell: ({ row }) => <span>{getDateNoTime(row.original.defenseDate)}</span>,
  },
  {
    accessorKey: "topicCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Topic Code" icon={<Hash className="h-4 w-4"/>}/>,
    cell: ({ row }) => <span>{row.original.topicCode}</span>,
  },
  {
    accessorKey: "groupCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Group Code" icon ={<Users2 className="h-4 w-4" />}/>,
    cell: ({ row }) => <span>{row.original.groupCode}</span>,
  },
  {
    accessorKey: "defendAttempt",
    header: ({ column }) => (
      <div className="flex justify-center w-full">
        <DataTableColumnHeader column={column} title="Defend Attempt" icon = {<TicketMinus className="h-4 w-4" />} />
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.original.defendAttempt}</div>,
  },
  {
    accessorKey: "slot",
    header: ({ column }) => (
      <div className="flex justify-center w-full">
        <DataTableColumnHeader column={column} title="Slot" icon= {<Clock className="h-4 w-4" /> }/>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.original.slot}</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Location" icon = {<Building2 className="h-4 w-4" />}/>,
    cell: ({ row }) => <span>{row.original.location}</span>,
  }
]
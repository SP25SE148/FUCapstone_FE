"use client"

import Link from "next/link"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { getDate } from "@/lib/utils"
import { useSupervisorTopicRequest } from "@/contexts/supervisor/supervisor-topic-request-context"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
interface Request {
    topicRequestId: string;
    groupCode: string,
    groupId: string,
    supervisorId: string,
    supervisorFullName: string,
    topicId: string,
    topicCode: string,
    topicEnglishName: string,
    status: string,
    requestedBy: string,
    leaderFullName: string,
    createdDate: string
}

const getStatus = (status: string | undefined) => {
    switch (status) {
        case "UnderReview":
            return (
                <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                    Under Review
                </Badge>
            );
        case "Accepted":
            return (
                <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
                    {status}
                </Badge>
            );
        case "Rejected":
            return (
                <Badge variant="secondary" className="select-none bg-red-200 text-red-800 hover:bg-red-200">
                    {status}
                </Badge>
            );
        default:
            return null;
    }
}

export const columns: ColumnDef<Request>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
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
        cell: ({ row }) => {
            return (
                <Link className="text-primary underline underline-offset-2 font-bold hover:text-blue-400" href={`/supervisor/topics/${row?.original?.topicId}`}>{row.original.topicEnglishName}</Link>
            )
        }
    },
    {
        accessorKey: "groupCode",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Group Code" />
        ),
        cell: ({ row }) => {
            return (
                <Link className="text-primary underline underline-offset-2 font-bold hover:text-blue-400" href={`/supervisor/topics/my-request/group-info/${row?.original?.groupId}`}>{row.original.groupCode}</Link>
            )
        }
    },
    {
        accessorKey: "leaderFullName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Leader Name" />
        ),
    },
    {
        accessorKey: "createdDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created Date" />
        ),
        cell: ({ row }) => {
            const request = row.original;
            return <span className="text-muted-foreground">{getDate(request?.createdDate)}</span>
        }
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const request = row.original;
            return getStatus(request?.status)
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { updateTopicRequestStatus } = useSupervisorTopicRequest();
            const topic = row.original;
            const [status, setStatus] = useState<number>(0);
            const [isLoading, setIsLoading] = useState<boolean>(false);
            const [openConfirm, setOpenConfirm] = useState<boolean>(false);

            async function handleConfirm() {
                setIsLoading(true);
                try {
                    const res: any = await updateTopicRequestStatus({
                        TopicRequestId: topic?.topicRequestId,
                        Status: status
                    });
                } finally {
                    setStatus(0);
                    setIsLoading(false);
                    setOpenConfirm(false);
                }
            }

            return (
                <>
                    {topic?.status === "UnderReview" && <div className="flex items-center justify-center gap-2 flex-wrap">
                        <Button
                            size={"sm"}
                            onClick={() => {
                                setStatus(2);
                                setOpenConfirm(true);
                            }}
                        >
                            Accepted
                        </Button>
                        <Button
                            size={"sm"}
                            onClick={() => {
                                setStatus(1);
                                setOpenConfirm(true);
                            }}
                            variant={"destructive"}
                        >
                            Rejected
                        </Button>
                    </div>}

                    <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. Please check again before submit.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel
                                    disabled={isLoading}
                                >
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleConfirm}
                                    disabled={isLoading}
                                >
                                    {isLoading && <Loader2 className="animate-spin" />}
                                    {isLoading ? "Please wait" : "Continue"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            )
        },
    },
]
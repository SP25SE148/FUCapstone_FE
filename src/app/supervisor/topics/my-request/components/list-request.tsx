"use client"

import Link from "next/link";
import { useState } from "react";
import { Loader2, Users } from "lucide-react";

import { getDate } from "@/lib/utils";
import { useSupervisorTopicRequest } from "@/contexts/supervisor/supervisor-topic-request-context";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

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

export default function ListRequest() {
    const { requestList, updateTopicRequestStatus } = useSupervisorTopicRequest();
    const [status, setStatus] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);

    async function handleConfirm(topicRequestId: string) {
        setIsLoading(true);
        try {
            const res: any = await updateTopicRequestStatus({
                TopicRequestId: topicRequestId,
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
            {Object.entries(requestList).map(([key, value]) => (
                <Accordion key={key} type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-primary font-bold">{key}</AccordionTrigger>
                        <AccordionContent className="pl-4 space-y-2">
                            {value.map((request) => (
                                <Card key={request?.topicRequestId} className="bg-primary/5">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="size-12 border-2 border-primary">
                                                <AvatarFallback className="bg-primary/10">
                                                    <Users className="size-6 text-primary" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold text-primary"><Link className="text-primary underline underline-offset-2 font-bold hover:text-blue-400" href={`/supervisor/topics/my-request/group-info/${request?.groupId}`}>{request.groupCode}</Link> - Average GPA: {request.gpa}</p>
                                                <p className="text-sm text-muted-foreground">Leader: {request?.leaderFullName} - {request.requestedBy}</p>
                                            </div>
                                        </div>
                                        <div className="text-right space-y-2">
                                            {getStatus(request?.status)}
                                            <p className="text-sm text-muted-foreground">{getDate(request?.createdDate)}</p>
                                        </div>
                                        <>
                                            {request?.status === "UnderReview" && <div className="flex items-center justify-center gap-2 flex-wrap">
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
                                                            onClick={() => handleConfirm(request?.topicRequestId)}
                                                            disabled={isLoading}
                                                        >
                                                            {isLoading && <Loader2 className="animate-spin" />}
                                                            {isLoading ? "Please wait" : "Continue"}
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </>
                                    </CardContent>
                                </Card>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}
        </>
    )
}
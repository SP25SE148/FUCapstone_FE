"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { Inbox, Loader2, Users } from "lucide-react";

import { getDate } from "@/lib/utils";
import { getTopicRequestStatus } from "@/utils/statusUtils";
import { useSupervisorTopicRequest } from "@/contexts/supervisor/supervisor-topic-request-context";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function ListRequest() {
    const { requestList, updateTopicRequestStatus } = useSupervisorTopicRequest();
    const [status, setStatus] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const [openAccordionValues, setOpenAccordionValues] = useState<string[]>([])

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

    useEffect(() => {
        if (requestList) {
            setOpenAccordionValues(Object.keys(requestList))
        }
    }, [requestList])

    return requestList
        ?
        <CardContent>
            <Accordion type="multiple" value={openAccordionValues} onValueChange={setOpenAccordionValues}>
                {Object?.entries(requestList).map(([key, value]) => (
                    <AccordionItem key={key} value={key}>
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
                                            {getTopicRequestStatus(request?.status)}
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
                ))}
            </Accordion>
        </CardContent>
        :
        <CardContent className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)]">
            <div className="h-full flex flex-col items-center justify-center gap-8">
                <Inbox className="size-20 text-primary" />
                <div className="space-y-2">
                    <p className="text-xl font-bold text-center">
                        You did not receive any requests.
                    </p>
                    <p className="text-muted-foreground text-center text-sm">
                        Please check back later.
                    </p>
                </div>
            </div>
        </CardContent>
}
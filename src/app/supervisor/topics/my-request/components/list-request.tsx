"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Inbox, Loader2, MessageCircleQuestion, Users } from "lucide-react";

import { getDate } from "@/lib/utils";
import { getTopicRequestStatus } from "@/utils/statusUtils";
import { useSupervisorTopicRequest } from "@/contexts/supervisor/supervisor-topic-request-context";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ListRequest() {
  const { requestList, updateTopicRequestStatus } = useSupervisorTopicRequest();
  const [status, setStatus] = useState<number>(0);
  const [reason, setReason] = useState<string>("");
  const [topicRequestId, setTopicRequestId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openAccordionValues, setOpenAccordionValues] = useState<string[]>([]);

  async function handleConfirm() {
    setIsLoading(true);
    try {
      const res: any = await updateTopicRequestStatus({
        TopicRequestId: topicRequestId,
        Status: status,
        Reason: reason,
      });
    } finally {
      setStatus(0);
      setIsLoading(false);
      setOpenConfirm(false);
    }
  }

  useEffect(() => {
    if (requestList) {
      setOpenAccordionValues(Object.keys(requestList));
    }
  }, [requestList]);

  return requestList ? (
    <CardContent>
      <Accordion
        type="multiple"
        value={openAccordionValues}
        onValueChange={setOpenAccordionValues}
      >
        {Object?.entries(requestList).map(([key, value]) => (
          <AccordionItem key={key} value={key}>
            <AccordionTrigger className="text-primary font-bold">
              {key}
            </AccordionTrigger>
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
                        <p className="font-semibold text-primary">
                          <Link
                            className="text-primary underline underline-offset-2 font-bold hover:text-blue-400"
                            href={`/supervisor/topics/my-request/group-info/${request?.groupId}`}
                          >
                            {request?.groupCode}
                          </Link>{" "}
                          - Average GPA: {request?.gpa?.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Leader: {request?.leaderFullName} -{" "}
                          {request?.requestedBy}
                        </p>
                      </div>
                    </div>
                    {request?.status === "Rejected" && (
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <MessageCircleQuestion className="size-5 text-primary" />
                        </div>
                        <div className="max-w-3xl">
                          <h3 className="text-sm text-muted-foreground">
                            Reject Reason
                          </h3>
                          {request?.reason !== "" ? (
                            <p className="font-semibold tracking-tight break-words whitespace-pre-line">
                              {request?.reason}
                            </p>
                          ) : (
                            <p className="italic text-muted-foreground">
                              No content
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="text-right space-y-2">
                      {getTopicRequestStatus(request?.status)}
                      <p className="text-sm text-muted-foreground">
                        {getDate(request?.createdDate)}
                      </p>
                    </div>
                    {request?.status === "UnderReview" && (
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        <Button
                          size={"sm"}
                          onClick={() => {
                            setStatus(2);
                            setTopicRequestId(request?.topicRequestId);
                            setOpenConfirm(true);
                          }}
                        >
                          Accepted
                        </Button>
                        <Button
                          size={"sm"}
                          onClick={() => {
                            setStatus(1);
                            setTopicRequestId(request?.topicRequestId);
                            setOpenConfirm(true);
                          }}
                          variant={"destructive"}
                        >
                          Rejected
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Comfirm */}
      <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Please check again before submit.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {status === 1 && (
            <Textarea
              placeholder="Type your reason here."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleConfirm()}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="animate-spin" />}
              {isLoading ? "Please wait" : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CardContent>
  ) : (
    <CardContent className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)]">
      <div className="h-full flex flex-col items-center justify-center gap-8">
        <Inbox className="size-20 text-primary" />
        <div className="space-y-2">
          <p className="text-xl font-bold text-center text-primary">
            You did not receive any requests.
          </p>
          <p className="text-muted-foreground text-center text-sm">
            Please check back later.
          </p>
        </div>
      </div>
    </CardContent>
  );
}

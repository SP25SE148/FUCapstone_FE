import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, Check, X, Inbox, User2 } from "lucide-react";

import { cn, getDate } from "@/lib/utils";
import { useStudentGroupRequest, RequestMember } from "@/contexts/student/student-group-request-context";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog"

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "underreview":
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          Under Review
        </Badge>
      );
    case "accepted":
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Accepted
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800">
          Rejected
        </Badge>
      );
    case "cancelled":
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800">
          Cancelled
        </Badge>
      );
    default:
      return null;
  }
};

export default function InvitationReceived() {
  const router = useRouter();
  const { listRequest, updateGroupMemberStatus } = useStudentGroupRequest();
  const [info, setInfo] = useState<any>({});
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const res: any = await updateGroupMemberStatus(info);
      if (res?.isSuccess) {
        if (info?.status === 1) {
          router.push("/student/groups")
        }
        setInfo(null);
      }
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  }

  return (
    <div className="rounded-md border p-4 space-y-2 bg-muted">
      {listRequest?.groupMemberRequested === null || listRequest?.groupMemberRequested?.length === 0
        ?
        (<div className="flex flex-col items-center justify-center">
          <Inbox className="h-16 w-16 text-muted-foreground" />
          <p className="mt-4 text-lg font-medium text-muted-foreground">
            No Request
          </p>
          <p className="text-muted-foreground">You have no request.</p>
        </div>)
        :
        (listRequest?.groupMemberRequested
          ?.slice()
          ?.reverse()
          ?.map((request: RequestMember, index: number) => (
            <div key={request.id}>
              <Card>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="size-12 border-2 border-primary">
                      <AvatarFallback className="bg-primary/10">
                        <User2 className="size-6 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        <span className="text-primary font-bold">{request.createdBy}</span> invited you to join their group.
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="size-3" />
                        {getDate(request.createdDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(request.status)}
                    {request.status.toLowerCase() === "underreview" && (
                      <>
                        <Button
                          size="sm"
                          className="bg-primary text-white hover:bg-primary/90"
                          onClick={() => {
                            setInfo({
                              "id": request?.id,
                              "groupId": request?.groupId,
                              "memberId": request?.studentId,
                              "status": 1
                            });
                            setOpen(true);
                          }}
                        >
                          <Check />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-background"
                          onClick={() => {
                            setInfo({
                              "id": request?.id,
                              "groupId": request?.groupId,
                              "memberId": request?.studentId,
                              "status": 2
                            });
                            setOpen(true);
                          }}
                        >
                          <X />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* confirm */}
              {request.status.toLowerCase() === "underreview" && <AlertDialog open={open} onOpenChange={() => { setOpen(false) }}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{info?.status === 1 ? "Accept" : "Reject"} Request</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to {info?.status === 1 ? "accept" : "reject"} this request?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>No</AlertDialogCancel>
                    <AlertDialogAction
                      disabled={isLoading}
                      className={cn(
                        info?.status === 2 && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                      )}
                      onClick={handleConfirm}
                    >
                      Yes, {info?.status === 1 ? "Accept" : "Reject"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>}
            </div>
          ))
        )}
    </div>
  );
};
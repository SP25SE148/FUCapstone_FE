"use client";

import { useState, useEffect } from "react";
<<<<<<< HEAD
=======
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import MyRequest from "@/app/student/groups/my-request/components/my-requests";
import GroupRequest from "@/app/student/groups/my-request/components/group-request";
import { useStudentGroup } from "@/contexts/student/student-group-management";
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStudentGroup } from "@/contexts/student/student-group-context";
import MyRequest from "@/app/student/groups/my-request/components/my-requests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GroupRequest from "@/app/student/groups/my-request/components/group-request";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, } from "@/components/ui/dialog";

interface Request {
  id: string;
  groupId: string;
  studentId: string;
  studentEmail: string;
  studentFullName: string;
  isLeader: boolean;
  status: string;
}

export function ListRequest() {
  const router = useRouter();
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openActionDialog, setOpenActionDialog] = useState(false);
  const [sentRequests, setSentRequests] = useState<Request[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<Request[]>([]);
  const [actionType, setActionType] = useState<"accept" | "reject">("accept");
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const { listrequest, getGroupMemberReq, updateStatusInvitation } = useStudentGroup();

  useEffect(() => {
    const fetchRequests = async () => {
      if (listrequest) {
        setSentRequests(listrequest.groupMemberRequestSentByLeader);
        setReceivedRequests(listrequest.groupMemberRequested);
      }
    };
    fetchRequests();
  }, [listrequest, getGroupMemberReq]);

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

  const handleCancelClick = (request: Request) => {
    setSelectedRequest(request);
    setOpenCancelDialog(true);
  };

  const handleActionClick = (request: Request, action: "accept" | "reject") => {
    setSelectedRequest(request);
    setActionType(action);
    setOpenActionDialog(true);
  };

  const handleCancelConfirm = async () => {
    if (selectedRequest) {
      const data = {
        id: selectedRequest.id,
        groupId: selectedRequest.groupId,
        memberId: selectedRequest.studentId,
        status: 4,
      };
      await updateStatusInvitation(data);
    }
    setOpenCancelDialog(false);
  };

  const handleActionConfirm = async () => {
    if (selectedRequest) {
      const data = {
        id: selectedRequest.id,
        groupId: selectedRequest.groupId,
        memberId: selectedRequest.studentId,
        status: actionType === "accept" ? 1 : 2,
      };
      const response: any = await updateStatusInvitation(data);
      if (response?.isSuccess && actionType === "accept") {
        router.push("/student/groups");
      }
      console.log("Request response: ", response);
    }
    setOpenActionDialog(false);
  };

  return (
<<<<<<< HEAD
    <Card className="min-h-[calc(100vh-60px)] bg-gradient-to-tr from-primary/5 to-background">
      <CardHeader>
        <CardTitle className="font-semibold tracking-tight text-xl text-primary">List Request</CardTitle>
        <CardDescription>Information about your request</CardDescription>
=======
    <Card className="w-full shadow-lg">
      <CardHeader className="border-b">
      <CardTitle className="font-semibold tracking-tight text-xl text-primary">List Request</CardTitle>
      <CardDescription>List of requests from students</CardDescription>
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="my-request" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="my-request">My Request</TabsTrigger>
            <TabsTrigger value="group-request">
              Groups I&apos;ve Request
            </TabsTrigger>
          </TabsList>
          <TabsContent value="my-request">
            <MyRequest
              requests={sentRequests}
              getStatusBadge={getStatusBadge}
              handleCancelClick={handleCancelClick}
            />
          </TabsContent>
          <TabsContent value="group-request">
            <GroupRequest
              requests={receivedRequests}
              handleActionClick={handleActionClick}
            />
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={openCancelDialog} onOpenChange={setOpenCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this request?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenCancelDialog(false)}
            >
              No
            </Button>
            <Button variant="destructive" onClick={handleCancelConfirm}>
              Yes, Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Accept/Reject Confirmation Dialog */}
      <Dialog open={openActionDialog} onOpenChange={setOpenActionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "accept" ? "Accept" : "Reject"} Request
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {actionType} this request?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenActionDialog(false)}
            >
              No
            </Button>
            <Button variant="default" onClick={handleActionConfirm}>
              Yes, {actionType === "accept" ? "Accept" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

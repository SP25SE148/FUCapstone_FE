"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Check, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface Request {
  id: string;
  type: "sent" | "received";
  from: string;
  to: string;
  status: "processing" | "accepted" | "rejected";
  date: string;
}

const requests: Request[] = [
  {
    id: "1",
    type: "sent",
    from: "You",
    to: "Mai Tan Phuc",
    status: "processing",
    date: "16/01/2025 - 23:01:20",
  },
  {
    id: "2",
    type: "sent",
    from: "You",
    to: "Le Trung Kien",
    status: "accepted",
    date: "16/01/2025 - 23:01:20",
  },
  {
    id: "3",
    type: "sent",
    from: "You",
    to: "Nguyen Dinh Hoang Huy",
    status: "rejected",
    date: "16/01/2025 - 23:01:20",
  },
  {
    id: "6",
    type: "received",
    from: "Nguyen Duc Thang(SE173512)",
    to: "You",
    status: "processing",
    date: "16/01/2025 - 23:01:20",
  },
];

export function ListRequest() {
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openActionDialog, setOpenActionDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [actionType, setActionType] = useState<"accept" | "reject">("accept");

  const sentRequests = requests.filter((r) => r.type === "sent");
  const receivedRequests = requests.filter((r) => r.type === "received");

  const getStatusBadge = (status: Request["status"]) => {
    switch (status) {
      case "processing":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Processing
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

  const handleCancelConfirm = () => {
    // Handle cancel request logic here
    console.log("Request cancelled:", selectedRequest);
    setOpenCancelDialog(false);
  };

  const handleActionConfirm = () => {
    // Handle accept/reject request logic here
    console.log(`${actionType === "accept" ? "Accepted" : "Rejected"} request:`, selectedRequest);
    setOpenActionDialog(false);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="border-b">
        <h2 className="text-3xl font-bold text-primary">List Request</h2>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="my-request" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="my-request">My Request</TabsTrigger>
            <TabsTrigger value="group-request">
              Groups I&apos;ve Request
            </TabsTrigger>
          </TabsList>
          <TabsContent value="my-request">
            <div className="h-[440px] w-full rounded-md border p-4 overflow-y-auto">
              {sentRequests.map((request) => (
                <div key={request.id} className="mb-4 last:mb-0">
                  <Card>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{request.to[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            Request to join {request.to}'s group
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <Clock className="mr-1 h-3 w-3" /> {request.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(request.status)}
                        {request.status === "processing" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-100"
                            onClick={() => handleCancelClick(request)}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="group-request">
            <div className="h-[440px] w-full rounded-md border p-4 overflow-y-auto">
              {receivedRequests.map((request) => (
                <div key={request.id} className="mb-4 last:mb-0">
                  <Card>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{request.from[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {request.from} invited you to join their group
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <Clock className="mr-1 h-3 w-3" /> {request.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-primary text-white hover:bg-primary/90"
                          onClick={() => handleActionClick(request, "accept")}
                        >
                          <Check className="mr-1 h-4 w-4" /> Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/10"
                          onClick={() => handleActionClick(request, "reject")}
                        >
                          <X className="mr-1 h-4 w-4" /> Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
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
            <Button variant="outline" onClick={() => setOpenCancelDialog(false)}>
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
            <DialogTitle>{actionType === "accept" ? "Accept" : "Reject"} Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to {actionType} this request?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenActionDialog(false)}>
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
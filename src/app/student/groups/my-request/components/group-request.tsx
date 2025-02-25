import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Request {
  id: string;
  groupId: string;
  studentId: string;
  studentEmail: string;
  studentFullName: string;
  isLeader: boolean;
  status: string;
}

interface GroupRequestProps {
  requests: Request[];
  handleActionClick: (request: Request, action: "accept" | "reject") => void;
}

const GroupRequest: React.FC<GroupRequestProps> = ({
  requests,
  handleActionClick,
}) => {
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

  return (
    <div className="h-[440px] w-full rounded-md border p-4 overflow-y-auto">
      {requests?.length === 0 ? (
        <p className="text-center text-muted-foreground">No Request</p>
      ) : (
        requests?.slice().reverse().map((request) => (
          <div key={request.id} className="mb-4 last:mb-0">
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {request.studentFullName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {request.studentFullName} invited you to join their group
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <Clock className="mr-1 h-3 w-3" />{" "}
                      {new Date().toLocaleString()}
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
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))
      )}
    </div>
  );
};

export default GroupRequest;

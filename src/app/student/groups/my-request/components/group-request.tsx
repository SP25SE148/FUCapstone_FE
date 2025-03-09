import React from "react";
import { Clock, Check, X, Inbox } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RequestMember } from "@/contexts/student/student-group-context";



interface GroupRequestProps {
  requests: RequestMember[];
  handleActionClick: (request: RequestMember, action: "accept" | "reject") => void;
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
    <div className="rounded-md border p-4 space-y-2 bg-muted">
      {requests?.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <Inbox className="h-16 w-16 text-muted-foreground" />
          <p className="mt-4 text-lg font-medium text-muted-foreground">
            No Request
          </p>
          <p className="text-muted-foreground">You have no Requests</p>
        </div>
      ) : (
        requests
          ?.slice()
          .reverse()
          .map((request) => (
            <div key={request.id}>
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
                        {request.createdBy} invited you to join their group
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <Clock className="mr-1 h-3 w-3" />{" "}
                        {request.createdDate.toLocaleString()}
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

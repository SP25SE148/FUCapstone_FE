import React from "react";
import { Clock, Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RequestMember } from "@/contexts/student/student-group-context";


interface MyRequestProps {
  requests: RequestMember[];
  getStatusBadge: (status: string) => JSX.Element | null;
  handleCancelClick: (request: RequestMember) => void;
}

const MyRequest: React.FC<MyRequestProps> = ({
  requests,
  getStatusBadge,
  handleCancelClick,
}) => {
  return (
    <div className="rounded-md border p-4 space-y-2 bg-muted">
      {requests === null || requests?.length === 0 ? (
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
                        Request to {request.studentFullName} to join your group
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
          ))
      )}
    </div>
  );
};

export default MyRequest;

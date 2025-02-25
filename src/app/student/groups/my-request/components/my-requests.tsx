import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Request {
  id: string;
  groupId: string;
  studentId: string;
  studentEmail: string;
  studentFullName: string;
  isLeader: boolean;
  status: string;
}

interface MyRequestProps {
  requests: Request[];
  getStatusBadge: (status: string) => JSX.Element | null;
  handleCancelClick: (request: Request) => void;
}

const MyRequest: React.FC<MyRequestProps> = ({ requests, getStatusBadge, handleCancelClick }) => {
  return (
    <div className="h-[440px] w-full rounded-md border p-4 overflow-y-auto">
      {requests === null || requests?.length === 0 ? (
        <p className="text-center text-muted-foreground">No Request</p>
      ) : (
        requests?.slice().reverse().map((request) => (
          <div key={request.id} className="mb-4 last:mb-0">
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{request.studentFullName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      Request to {request.studentFullName} to join your group
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <Clock className="mr-1 h-3 w-3" /> {new Date().toLocaleString()}
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
"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/student/topics/components/topic-table-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStudentTopics } from "@/contexts/student/student-topic-context";
import { useStudentProfile } from "@/contexts/student/student-profile-context";
import { BookOpen, ClipboardCheck, Code, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CreateGroup from "@/app/student/topics/components/create-group";

export default function TopicTable() {
  const { topics, topicRequest, groupInfo } = useStudentTopics();
  const { studentProfile } = useStudentProfile();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "UnderReview":
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  // if (!studentProfile?.isHaveBeenJoinGroup || groupInfo?.status !== "InProgress") {
  //   return <CreateGroup />;
  // }
  return !studentProfile?.isHaveBeenJoinGroup || groupInfo?.status !== "InProgress" ? (
    <CreateGroup />
  ) : (
    <Card className="min-h-[calc(100vh-16px)]">
      <CardHeader>
        <div className="items-center">
          <div>
            <CardTitle className="font-semibold tracking-tight text-xl">
              Topics
            </CardTitle>
            <CardDescription>
              List of Graduation Project Topics that students can register for
            </CardDescription>
          </div>
          {topicRequest && (
            <div className="mt-6 border border-primary/20 rounded-lg overflow-hidden shadow-sm">
              <div className="bg-primary/10 px-4 py-3 border-b border-primary/20">
                <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5" />
                  Your Topic Request
                </h3>
              </div>
              <div className="p-4 bg-background">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Topic
                      </p>
                      <p className="font-medium">
                        {topicRequest.topicEnglishName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Code className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Topic Code
                      </p>
                      <p className="font-medium">{topicRequest.topicCode}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Supervisor
                      </p>
                      <p className="font-medium">
                        {topicRequest.supervisorFullName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Status
                      </p>
                      <Badge
                        className={`mt-1 ${getStatusColor(
                          topicRequest.status
                        )}`}
                      >
                        {topicRequest.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={topics} />
      </CardContent>
    </Card>
  );
}

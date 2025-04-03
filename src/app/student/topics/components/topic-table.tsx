"use client";

import { BadgeInfo, BookOpen, ClipboardCheck, FileCheck, User } from "lucide-react";

import { getTopicRequestStatus } from "@/utils/statusUtils";
import { useStudentTopics } from "@/contexts/student/student-topic-context";
import { useStudentProfile } from "@/contexts/student/student-profile-context";

import NotAllow from "./not-allow";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/student/topics/components/topic-table-columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";

export default function TopicTable() {
  const { studentProfile } = useStudentProfile();
  const { topics, topicRequest, groupInfo } = useStudentTopics();

  const underReviewRequests = topicRequest
    ? Object.entries(topicRequest).filter(([key, value]) =>
      value.some((request) => request.status === "UnderReview")
    )
    : [];

  return !studentProfile?.isHaveBeenJoinGroup ||
    groupInfo?.status !== "InProgress" ? (
    <NotAllow />
  ) : (
    <Card className="min-h-[calc(100vh-16px)]">
      <CardHeader>
        <CardTitle className="font-semibold tracking-tight text-xl text-primary">
          Topics
        </CardTitle>
        <CardDescription>
          List of Graduation Project Topics that students can register for
        </CardDescription>
      </CardHeader>
      <CardContent>
        {underReviewRequests.length > 0 && (
          <div className="border border-primary/20 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-primary/10 px-4 py-3 border-b border-primary/20">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5" />
                Your Topic Requests
              </h3>
            </div>
            {underReviewRequests.map(([key, requests]) => (
              <div key={key} className="p-4">
                {requests
                  .filter((request) => request.status === "UnderReview")
                  .map((request) => (
                    <div
                      key={request.topicRequestId}
                      className="grid grid-cols-5 gap-4"
                    >
                      <div className="col-span-2 flex items-center gap-4">
                        <BookOpen className="size-5 text-primary" />
                        <div>
                          <h3 className="text-sm text-muted-foreground">Topic Name</h3>
                          <p className="font-semibold tracking-tight">{request.topicEnglishName}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <FileCheck className="size-5 text-primary" />
                        <div>
                          <h3 className="text-sm text-muted-foreground">Topic code</h3>
                          <p className="font-semibold tracking-tight">{request.topicCode}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <User className="size-5 text-primary" />
                        <div>
                          <h3 className="text-sm text-muted-foreground">Supervisor</h3>
                          <p className="font-semibold tracking-tight">{request.supervisorFullName}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <BadgeInfo className="size-5 text-primary" />
                        <div>
                          <h3 className="text-sm text-muted-foreground">Status</h3>
                          {getTopicRequestStatus(request?.status)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )}
        <DataTable columns={columns} data={topics} />
      </CardContent>
    </Card>
  );
}

"use client";

import NoTopicRequest from "@/app/student/topics/topic-request/components/no-topic-request";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useStudentTopics } from "@/contexts/student/student-topic-context";
import { getTopicRequestStatus } from "@/utils/statusUtils";
import {
  BadgeInfo,
  BookOpen,
  ClipboardCheck,
  FileCheck,
  MessageCircleQuestion,
  User,
} from "lucide-react";

export default function TopicRequestPage() {
  const { topicRequest } = useStudentTopics();

  const topicRequests = topicRequest ? Object.entries(topicRequest) : [];

  return (
    <div className="flex flex-col gap-2">
      {topicRequests.length > 0 ? (
        <Card className="min-h-[calc(100vh-60px)]">
          <CardHeader>
            <CardTitle className="font-semibold tracking-tight text-xl text-primary flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Your Topic Requests
            </CardTitle>
            <CardDescription>
              List of Topic Requests that your Group has submitted
            </CardDescription>
          </CardHeader>

          <Separator orientation="horizontal" className="my-2 bg-primary/10" />

          <>
            {topicRequests.map(([key, requests]) => (
              <div key={key} className="px-4 py-2">
                {requests.map((request) => (
                  <div
                    key={request.topicRequestId}
                    className="p-6 rounded-lg bg-primary/5"
                  >
                    <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 ">
                      <div className="col-span-1 lg:col-span-2 flex items-center gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <BookOpen className="size-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm text-muted-foreground">
                            Topic Name
                          </h3>
                          <p className="font-semibold tracking-tight">
                            {request.topicEnglishName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <FileCheck className="size-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm text-muted-foreground">
                            Topic code
                          </h3>
                          <p className="font-semibold tracking-tight">
                            {request.topicCode}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <User className="size-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm text-muted-foreground">
                            Supervisor
                          </h3>
                          <p className="font-semibold tracking-tight">
                            {request.supervisorFullName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <BadgeInfo className="size-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm text-muted-foreground">
                            Status
                          </h3>
                          {getTopicRequestStatus(request?.status)}
                        </div>
                      </div>
                    </div>
                    {request?.status === "Rejected" && (
                      <div className="flex items-center gap-3 mt-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <MessageCircleQuestion className="size-5 text-primary" />
                        </div>
                        <div>
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
                  </div>
                ))}
              </div>
            ))}
          </>
        </Card>
      ) : (
        <NoTopicRequest />
      )}
    </div>
  );
}

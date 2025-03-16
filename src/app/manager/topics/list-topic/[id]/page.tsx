"use client";

import { useParams } from "next/navigation";
import { useManagerTopics } from "@/contexts/manager/manager-topic-context";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import {
  BookOpen,
  School,
  Calendar,
  FileCheck,
  PenTool,
  BriefcaseBusiness,
  Star,
  BadgeInfo,
  FileX,
} from "lucide-react";
import DownloadDocument from "@/app/manager/topics/list-topic/[id]/components/download-document";

const getDifficultyStatus = (status: string | undefined) => {
  switch (status) {
    case "Easy":
      return (
        <Badge
          variant="secondary"
          className="select-none bg-blue-400 text-blue-800 hover:bg-blue-400"
        >
          Easy
        </Badge>
      );
    case "Medium":
      return (
        <Badge
          variant="secondary"
          className="select-none bg-green-400 text-green-800 hover:bg-green-400"
        >
          Medium
        </Badge>
      );
    case "Hard":
      return (
        <Badge
          variant="secondary"
          className="select-none bg-red-400 text-red-800 hover:bg-red-400"
        >
          Hard
        </Badge>
      );
    default:
      return null;
  }
};

const getStatus = (status: string | undefined) => {
  switch (status) {
    case "Pending":
      return (
        <Badge
          variant="secondary"
          className="select-none bg-yellow-200 text-yellow-800 hover:bg-yellow-200"
        >
          Pending
        </Badge>
      );
    case " Accepted":
      return (
        <Badge
          variant="secondary"
          className="select-none bg-green-200 text-green-800 hover:bg-green-200"
        >
          Accepted
        </Badge>
      );
    case "Considered":
      return (
        <Badge
          variant="secondary"
          className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200"
        >
          Considered
        </Badge>
      );
    case "Rejected":
      return (
        <Badge
          variant="secondary"
          className="select-none bg-red-200 text-red-800 hover:bg-red-200"
        >
          Rejected
        </Badge>
      );
    default:
      return null;
  }
};

const getCreatedDate = (data: string | undefined) => {
  const date = new Date(data || "");
  // Chuyển sang giờ Việt Nam (GMT+7)
  const vnDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );

  const day = vnDate.getDate().toString().padStart(2, "0");
  const month = (vnDate.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = vnDate.getFullYear();

  const hours = vnDate.getHours().toString().padStart(2, "0");
  const minutes = vnDate.getMinutes().toString().padStart(2, "0");
  const seconds = vnDate.getSeconds().toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-2">
      <span>{`${day}/${month}/${year}`}</span>
      <span className="text-muted-foreground">{`${hours}:${minutes}:${seconds}`}</span>
    </div>
  );
};



export default function TopicDetail() {
  const { topics} = useManagerTopics();
  const { id } = useParams();
  const topic = topics.find((t) => t.id === id);

if (!topic) {
    return (
      <Card className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gradient-to-tr from-primary/20 to-background">
        <div className="flex flex-col items-center justify-center gap-8">
          <FileX className="size-20 text-primary" />
          <div className="space-y-2">
            <p className="text-2xl font-bold text-center">
              You are trying to access a topic that does not exist.
            </p>
            <p className="text-muted-foreground text-center">
              Please check the Id again or view another topic.
            </p>
          </div>
        </div>
      </Card>
    );
  }
  const supervisorAppraisals = topic?.topicAppraisals.filter(
    (appraisal: any) => appraisal.supervisorId
  );

  return (
    <div className="container mx-auto w-full">
      <Card className="min-h-[calc(100vh-60px)]">
        <CardHeader>
          <CardTitle className="font-semibold tracking-tight text-xl text-primary">
            {topic?.englishName}
          </CardTitle>
          <CardDescription>{topic?.vietnameseName}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <School className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Campus</h3>
                <p className="font-semibold tracking-tight">
                  {topic?.campusId}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <Calendar className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Semester</h3>
                <p className="font-semibold tracking-tight">
                  {topic?.semesterId}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <BookOpen className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Capstone</h3>
                <p className="font-semibold tracking-tight">
                  {topic?.capstoneId}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <FileCheck className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Topic code</h3>
                <p className="font-semibold tracking-tight">{topic?.code}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <PenTool className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Abbreviation</h3>
                <p className="font-semibold tracking-tight">
                  {topic?.abbreviation}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <BriefcaseBusiness className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Business area</h3>
                <p className="font-semibold tracking-tight">
                  {topic?.businessAreaName}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <Star className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Difficulty</h3>
                {getDifficultyStatus(topic?.difficultyLevel)}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <BadgeInfo className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Status</h3>
                {getStatus(topic?.status)}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground">Description:</h3>
            <p className="p-4 font-semibold tracking-tight text-justify italic">
              {topic?.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm text-muted-foreground">Supervisor(s):</h3>
            <div className="p-4 pl-0 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/20">
                <Avatar className="size-12 border-2 border-primary/10">
                  <AvatarFallback className="text-lg font-semibold text-primary">
                    {topic?.mainSupervisorName?.slice(-1)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">{topic?.mainSupervisorName}</p>
                  <p className="text-sm text-muted-foreground">
                    {topic?.mainSupervisorEmail}
                  </p>
                </div>
              </div>
              {topic?.coSupervisors?.map((supervisor: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border rounded-lg bg-muted/20"
                >
                  <Avatar className="size-12 border-2 border-primary/10">
                    <AvatarFallback className="text-lg font-semibold text-primary">
                      {supervisor?.SupervisorName.slice(-1)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{supervisor?.SupervisorName}</p>
                    <p className="text-sm text-muted-foreground">
                      {supervisor?.SupervisorEmail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <DownloadDocument topic={topic} />
            <div className="flex gap-2 text-sm text-muted-foreground">
              <span>Created at:</span> {getCreatedDate(topic?.createdDate)}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Reviewer Evaluations
              </h3>
              {supervisorAppraisals.map((appraisal: any, index: number) => (
                <div
                  key={index}
                  className="p-4 mb-4 border rounded-lg bg-muted/20"
                >
                  <div className="flex gap-5 items-center">
                    <p className="font-semibold">{appraisal.supervisorId}</p>
                    <Badge
                      variant="outline"
                      className={`text-sm font-medium px-3 py-1 ${
                        appraisal.status === 1
                          ? "text-green-500 bg-green-50"
                          : appraisal.status === 2
                          ? "text-blue-500 bg-blue-50"
                          : appraisal.status === 3
                          ? "text-red-500 bg-red-50"
                          : "text-yellow-500 bg-yellow-50"
                      }`}
                    >
                      {appraisal.status === 1
                        ? "Accepted"
                        : appraisal.status === 2
                        ? "Considered"
                        : appraisal.status === 3
                        ? "Rejected"
                        : "Pending"}
                    </Badge>
                  </div>
                  <div className="space-y-4 pt-2 pl-4">
                    <div>
                      <h4 className="text-sm font-medium">Appraisal Content</h4>
                      <p className="text-sm text-muted-foreground">
                        {appraisal.appraisalContent || "No Content"}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Appraisal Comment</h4>
                      <p className="text-sm text-muted-foreground">
                        {appraisal.appraisalComment || "No Comment"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

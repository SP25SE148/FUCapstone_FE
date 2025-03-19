"use client";

import { useParams, useRouter } from "next/navigation";
import { BookOpen, School, Calendar, FileCheck, PenTool, BriefcaseBusiness, Star, BadgeInfo, FileX, Undo2, BookUser, Users, User2, ChartColumn, } from "lucide-react";

import { getDate } from "@/lib/utils";
import { useManagerTopics } from "@/contexts/manager/manager-topic-context";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import DownloadDocument from "@/app/manager/topics/(list-topic)/[id]/components/download-document";

const getDifficultyStatus = (status: string | undefined) => {
  switch (status) {
    case "Easy":
      return <Badge variant="secondary" className="select-none bg-blue-400 text-blue-800 hover:bg-blue-400">{status}</Badge>
    case "Medium":
      return <Badge variant="secondary" className="select-none bg-green-400 text-green-800 hover:bg-green-400">{status}</Badge>
    case "Hard":
      return <Badge variant="secondary" className="select-none bg-red-400 text-red-800 hover:bg-red-400">{status}</Badge>
    default:
      return null;
  }
}

const getStatus = (status: string | undefined) => {
  switch (status) {
    case "Pending":
      return (
        <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
          {status}
        </Badge>
      );
    case "Approved":
      return (
        <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
          {status}
        </Badge>
      );
    case "Considered":
      return (
        <Badge variant="secondary" className="select-none bg-rose-200 text-rose-800 hover:bg-rose-200">
          {status}
        </Badge>
      );
    case "Rejected":
      return (
        <Badge variant="secondary" className="select-none bg-red-200 text-red-800 hover:bg-red-200">
          {status}
        </Badge>
      );
    default:
      return null;
  }
}
export default function TopicDetail() {
  const { topics } = useManagerTopics();
  const router = useRouter();
  const params = useParams();
  const id: string = String(params.id);
  const topic = topics.find((t) => t.id === id);

  const supervisorAppraisals = topic?.topicAppraisals.filter(
    (appraisal: any) => appraisal.supervisorId
  );

  return topic
    ?
    <Card className="min-h-[calc(100vh-60px)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button className="ml-6" size={"icon"}
            onClick={() => router.back()}
          >
            <Undo2 />
          </Button>
          <CardHeader>
            <CardTitle className="font-semibold tracking-tight text-xl text-primary">{topic?.englishName}</CardTitle>
            <CardDescription>{topic?.vietnameseName}</CardDescription>
          </CardHeader>
        </div>
        <DownloadDocument topic={topic} />
      </div>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <BookUser className="size-4 text-primary" />
              General Information
            </h3>
            <p className="text-sm text-muted-foreground">
              Created at: {getDate(topic?.createdDate)}
            </p>
          </div>
          <Card className="bg-primary/5">
            <CardContent className="p-6 space-y-2">
              <div className="grid grid-cols-4 gap-6 text-sm border-b pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <School className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Campus
                    </h3>
                    <p className="font-semibold tracking-tight">{topic?.campusId}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <Calendar className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Semester
                    </h3>
                    <p className="font-semibold tracking-tight">{topic?.semesterId}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <BookOpen className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Capstone
                    </h3>
                    <p className="font-semibold tracking-tight">{topic?.capstoneId}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <FileCheck className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Topic code
                    </h3>
                    <p className="font-semibold tracking-tight">{topic?.code}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <PenTool className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Abbreviation
                    </h3>
                    <p className="font-semibold tracking-tight">{topic?.abbreviation}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <BriefcaseBusiness className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Business area
                    </h3>
                    <p className="font-semibold tracking-tight">{topic?.businessAreaName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <Star className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Difficulty
                    </h3>
                    {getDifficultyStatus(topic?.difficultyLevel)}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <BadgeInfo className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Status
                    </h3>
                    {getStatus(topic?.status)}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm text-muted-foreground">Description:</h3>
                <p className="font-semibold tracking-tight text-justify italic">{topic?.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Users className="size-4 text-primary" />
            Supervisor(s):
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12 border-2 border-primary">
                    <AvatarFallback className="bg-primary/10">
                      <User2 className="size-6 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold"> {topic?.mainSupervisorName}</p>
                    <p className="text-sm text-muted-foreground">{topic?.mainSupervisorEmail}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {topic?.coSupervisors?.map((supervisor: any, index) => (
              <Card key={index} className="bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12 border-2 border-primary">
                      <AvatarFallback className="bg-primary/10">
                        <User2 className="size-6 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">
                        {supervisor?.SupervisorName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {supervisor?.SupervisorEmail}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <ChartColumn className="size-4 text-primary" />
            Reviewer Evaluations:
          </h3>
          {supervisorAppraisals && supervisorAppraisals.map((appraisal: any, index: number) => (
            <Card className="bg-primary/5" key={index}>
              <CardContent className="p-6 space-y-2">
                <div className="flex gap-4 items-center">
                  <p className="font-semibold">{appraisal.supervisorId}</p>
                  <Badge
                    variant="outline"
                    className={`text-sm font-medium px-2 ${appraisal.status === 1
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
                <div className="space-y-4 pl-4">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
    :
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
    </Card>;
}

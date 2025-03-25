"use client";

import { BookOpen, Users, FileCheck, BriefcaseBusiness, BadgeInfo, BookUser, School, Calendar, PenTool, Star, User2, } from "lucide-react";

import { getDate } from "@/lib/utils";
import { Member, useStudentGroup, } from "@/contexts/student/student-group-context";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import NoTopic from "@/app/student/groups/my-topic/components/no-topic";
import DownloadDocument from "@/app/student/groups/my-topic/components/download-document";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";

const getDifficultyStatus = (status: string | undefined) => {
  switch (status) {
    case "Easy":
      return (
        <Badge
          variant="secondary"
          className="select-none bg-blue-400 text-blue-800 hover:bg-blue-400"
        >
          {status}
        </Badge>
      );
    case "Medium":
      return (
        <Badge
          variant="secondary"
          className="select-none bg-green-400 text-green-800 hover:bg-green-400"
        >
          {status}
        </Badge>
      );
    case "Hard":
      return (
        <Badge
          variant="secondary"
          className="select-none bg-red-400 text-red-800 hover:bg-red-400"
        >
          {status}
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
          className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200"
        >
          {status}
        </Badge>
      );
    case "Approved":
      return (
        <Badge
          variant="secondary"
          className="select-none bg-green-200 text-green-800 hover:bg-green-200"
        >
          {status}
        </Badge>
      );
    case "Considered":
      return (
        <Badge
          variant="secondary"
          className="select-none bg-rose-200 text-rose-800 hover:bg-rose-200"
        >
          {status}
        </Badge>
      );
    case "Rejected":
      return (
        <Badge
          variant="secondary"
          className="select-none bg-red-200 text-red-800 hover:bg-red-200"
        >
          {status}
        </Badge>
      );
    default:
      return null;
  }
};

export default function MyTopicPage() {
  const { groupInfo } = useStudentGroup();
  const leaderInfo = groupInfo?.groupMemberList?.find(
    (x: Member) => x.isLeader == true
  );
  const memberList = groupInfo?.groupMemberList?.filter(
    (x: Member) => x.isLeader == false
  );
  const noTopic = groupInfo?.topicCode === null;

  return noTopic
    ?
    <NoTopic />
    :
    <Card className="min-h-[calc(100vh-60px)]">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle className="font-semibold tracking-tight text-xl text-primary">
            {groupInfo?.topicResponse?.englishName}
          </CardTitle>
          <CardDescription>
            {groupInfo?.topicResponse?.vietnameseName}
          </CardDescription>
        </CardHeader>
        {groupInfo?.topicResponse && (
          <DownloadDocument topic={groupInfo.topicResponse} />
        )}
      </div>
      <CardContent className="space-y-4">
        {/* topic info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <BookUser className="size-4 text-primary" />
              General Information
            </h3>
            <p className="text-sm text-muted-foreground">
              Created at:{" "}
              {getDate(groupInfo?.topicResponse?.createdDate || "")}
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
                    <h3 className="text-sm text-muted-foreground">Campus</h3>
                    <p className="font-semibold tracking-tight">
                      {groupInfo?.topicResponse?.campusId}
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
                      {groupInfo?.topicResponse?.semesterId}
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
                      {groupInfo?.topicResponse?.capstoneId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <FileCheck className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Topic code</h3>
                    <p className="font-semibold tracking-tight">
                      {groupInfo?.topicResponse?.code}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <PenTool className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Abbreviation</h3>
                    <p className="font-semibold tracking-tight">
                      {groupInfo?.topicResponse?.abbreviation}
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
                      {groupInfo?.topicResponse?.businessAreaName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <Star className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Difficulty</h3>
                    {getDifficultyStatus(
                      groupInfo?.topicResponse?.difficultyLevel
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <BadgeInfo className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Status</h3>
                    {getStatus(groupInfo?.topicResponse?.status)}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm text-muted-foreground">
                  Description:
                </h3>
                <p className="font-semibold tracking-tight text-justify italic">
                  {groupInfo?.topicResponse?.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* supervisor */}
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
                    <p className="font-semibold text-primary">{groupInfo?.topicResponse?.mainSupervisorName}</p>
                    <p className="text-sm text-muted-foreground">{groupInfo?.topicResponse?.mainSupervisorEmail}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {groupInfo?.topicResponse?.coSupervisors?.map(
              (supervisor: any, index) => (
                <Card key={index} className="bg-primary/5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-12 border-2 border-primary">
                        <AvatarFallback className="bg-primary/10">
                          <User2 className="size-6 text-primary" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-primary">{supervisor?.SupervisorName}</p>
                        <p className="text-sm text-muted-foreground">{supervisor?.SupervisorEmail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>

        {/* member */}
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Users className="size-4 text-primary" />
            Member(s)
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
                    <p className="font-semibold text-primary">{leaderInfo?.studentFullName} - {leaderInfo?.studentId} - GPA: {leaderInfo?.gpa}</p>
                    <p className="text-sm text-muted-foreground">{leaderInfo?.isLeader ? "Leader" : "Member"} - {leaderInfo?.studentEmail}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {memberList?.map((member, index) => (
              <Card key={index} className="bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12 border-2 border-primary">
                      <AvatarFallback className="bg-primary/10">
                        <User2 className="size-6 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-primary">{member.studentFullName} - {member.studentId} - GPA: {member?.gpa}</p>
                      <p className="text-sm text-muted-foreground">{member?.isLeader ? "Leader" : "Member"} - {member.studentEmail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
}

"use client";

import {
  BookOpen,
  Users,
  FileCheck,
  BriefcaseBusiness,
  BadgeInfo,
  BookUser,
  School,
  Calendar,
  PenTool,
  Star,
  User2,
} from "lucide-react";

import { getDate } from "@/lib/utils";
import { getTopicDifficulty, getTopicStatus } from "@/utils/statusUtils";

import { Member } from "@/types/types";
import { useStudentGroup } from "@/contexts/student/student-group-context";

import NoTopic from "@/app/student/groups/my-topic/components/no-topic";
import DownloadDocument from "@/app/student/groups/my-topic/components/download-document";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MyTopicPage() {
  const { groupInfo } = useStudentGroup();
  const leaderInfo = groupInfo?.groupMemberList?.find(
    (x: Member) => x.isLeader == true
  );
  const memberList = groupInfo?.groupMemberList?.filter(
    (x: Member) => x.isLeader == false
  );
  const noTopic = !groupInfo || groupInfo?.topicCode === null;

  return noTopic ? (
    <NoTopic />
  ) : (
    <Card className="min-h-[calc(100vh-60px)]">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle className="font-semibold tracking-tight text-lg sm:text-xl text-primary">
            {groupInfo?.topicResponse?.englishName}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm break-words">
            {groupInfo?.topicResponse?.vietnameseName}
          </CardDescription>
        </CardHeader>
        {groupInfo?.topicResponse && (
          <div className="flex-shrink-0">
            <DownloadDocument topic={groupInfo.topicResponse} />
          </div>
        )}
      </div>
      <CardContent className="space-y-4">
        {/* topic info */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-semibold flex items-center gap-2">
              <BookUser className="size-4 text-primary" />
              General Information
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Created at: {getDate(groupInfo?.topicResponse?.createdDate || "")}
            </p>
          </div>
          <Card className="bg-primary/5">
            <CardContent className="p-3 sm:p-6 space-y-2">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm border-b pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-1 sm:p-2 flex-shrink-0">
                    <School className="size-4 sm:size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm text-muted-foreground">
                      Campus
                    </h3>
                    <p className="font-semibold tracking-tight break-words">
                      {groupInfo?.topicResponse?.campusId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-1 sm:p-2 flex-shrink-0">
                    <Calendar className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm text-muted-foreground">
                      Semester
                    </h3>
                    <p className="font-semibold tracking-tight break-words">
                      {groupInfo?.topicResponse?.semesterId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-1 sm:p-2 flex-shrink-0">
                    <BookOpen className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm text-muted-foreground">
                      Capstone
                    </h3>
                    <p className="font-semibold tracking-tight break-words">
                      {groupInfo?.topicResponse?.capstoneId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-1 sm:p-2 flex-shrink-0">
                    <FileCheck className="size-4 sm:size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm text-muted-foreground">
                      Topic code
                    </h3>
                    <p className="font-semibold tracking-tight break-words">
                      {groupInfo?.topicResponse?.code}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-1 sm:p-2 flex-shrink-0">
                    <PenTool className="size-4 sm:size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm text-muted-foreground">
                      Abbreviation
                    </h3>
                    <p className="font-semibold tracking-tight break-words">
                      {groupInfo?.topicResponse?.abbreviation}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-1 sm:p-2 flex-shrink-0">
                    <BriefcaseBusiness className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm text-muted-foreground">
                      Business area
                    </h3>

                    <p className="font-semibold tracking-tight break-words">
                      {groupInfo?.topicResponse?.businessAreaName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-1 sm:p-2 flex-shrink-0">
                    <Star className="size-4 sm:size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm text-muted-foreground">
                      Difficulty
                    </h3>

                    {getTopicDifficulty(
                      groupInfo?.topicResponse?.difficultyLevel || ""
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-1 sm:p-2 flex-shrink-0">
                    <BadgeInfo className="size-4 sm:size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm text-muted-foreground">
                      Status
                    </h3>
                    {getTopicStatus(groupInfo?.topicResponse?.status || "")}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xs sm:text-sm text-muted-foreground">
                  Description:
                </h3>
                <div
                  className="text-xs sm:text-base prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: groupInfo?.topicResponse?.description,
                  }}
                />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Card className="bg-primary/5">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10 sm:size-12 border-2 border-primary flex-shrink-0">
                    <AvatarFallback className="bg-primary/10">
                      <User2 className="size-5 sm:size-6 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-semibold text-primary text-sm sm:text-base break-words">
                      {groupInfo?.topicResponse?.mainSupervisorName}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground break-words">
                      {groupInfo?.topicResponse?.mainSupervisorEmail}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {groupInfo?.topicResponse?.coSupervisors?.map(
              (supervisor: any, index) => (
                <Card key={index} className="bg-primary/5">
                  <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-3">
                  <Avatar className="size-10 sm:size-12 border-2 border-primary flex-shrink-0">
                  <AvatarFallback className="bg-primary/10">
                  <User2 className="size-5 sm:size-6 text-primary" />
                  </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                      <p className="font-semibold text-primary text-sm sm:text-base break-words">
                      {supervisor?.SupervisorName}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground break-words">
                          {supervisor?.SupervisorEmail}
                        </p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Card className="bg-primary/5">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10 sm:size-12 border-2 border-primary">
                    <AvatarFallback className="bg-primary/10">
                      <User2 className="size-5 sm:size-6 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary text-sm sm:text-base break-words">
                      {leaderInfo?.studentFullName} - {leaderInfo?.studentId} -
                      GPA: {leaderInfo?.gpa}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {leaderInfo?.isLeader ? "Leader" : "Member"} -{" "}
                      {leaderInfo?.studentEmail}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {memberList?.map((member, index) => (
              <Card key={index} className="bg-primary/5">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 sm:size-12 border-2 border-primary">
                      <AvatarFallback className="bg-primary/10">
                        <User2 className="size-5 sm:size-6 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-primary text-sm sm:text-base break-words">
                        {member.studentFullName} - {member.studentId} - GPA:{" "}
                        {member?.gpa}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {member?.isLeader ? "Leader" : "Member"} -{" "}
                        {member.studentEmail}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

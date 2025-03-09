"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Topic } from "@/contexts/student/student-topic-context";
import DownloadDocument from "@/app/student/topics/components/download-document";
import RegisterTopic from "@/app/student/topics/components/register-topic";
import { BookOpen, Award, BarChart3, BriefcaseBusiness, BadgeInfo, GraduationCap, Users, FileCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";
import { useStudentTopics } from "@/contexts/student/student-topic-context";
import { useEffect, useState } from "react";

interface TopicSheetProps {
  topic: Topic;
  open: boolean;
  onClose: () => void;
}

export default function TopicSheet({ topic, open, onClose }: TopicSheetProps) {
  const { user } = useAuth();
  const { groupInfo } = useStudentTopics();
  const [isLeader, setIsLeader] = useState(false);


  useEffect(() => {
    if (groupInfo && user) {
      const leader = groupInfo.groupMemberList.find(
        (member) => member.studentId === user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"] && member.isLeader
      );
      setIsLeader(!!leader);
    }
  }, [groupInfo, user]);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-1/2 sm:max-w-[50%] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="font-semibold tracking-tight text-xl text-primary">
            {topic.englishName}
          </SheetTitle>
          <SheetDescription>{topic.vietnameseName}</SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <FileCheck className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Topic Code</h3>
                <p className="font-semibold tracking-tight">{topic.code}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <BookOpen className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Capstone</h3>
                <p className="font-semibold tracking-tight">{topic.capstoneId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <Award className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Abbreviation</h3>
                <p className="font-semibold tracking-tight">{topic.abbreviation}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <BarChart3 className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Difficulty</h3>
                <p className="font-semibold tracking-tight">{topic.difficultyLevel}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <GraduationCap className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Profession</h3>
                <p className="font-semibold tracking-tight">{topic.businessAreaName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <BriefcaseBusiness className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Business Area</h3>
                <p className="font-semibold tracking-tight">{topic.businessAreaName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <Users className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Specialty</h3>
                <p className="font-semibold tracking-tight">{topic.capstoneId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <BadgeInfo className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Status</h3>
                <Badge variant="outline" className="text-sm font-medium px-3 py-1">
                  {topic.status}
                </Badge>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground">Description:</h3>
            <p className="p-4 font-semibold tracking-tight text-justify italic">
              {topic.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm text-muted-foreground">Supervisor:</h3>
            <div className="p-4 pl-0 grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/20">
                <Avatar className="size-12 border-2 border-primary/10">
                  <AvatarFallback className="text-lg font-semibold text-primary">
                    {topic.mainSupervisorName?.slice(-1)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">{topic.mainSupervisorName}</p>
                  <p className="text-sm text-muted-foreground">
                    {topic.mainSupervisorEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <DownloadDocument topic={topic} />
            {isLeader && <RegisterTopic topicId={topic.id} groupId={groupInfo?.id} />}
          </div>
        </div>
        <SheetClose asChild>
          <button className="mt-4 bg-primary text-white py-2 px-4 rounded">
            Close
          </button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
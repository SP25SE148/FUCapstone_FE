"use client";

import {
  Users,
  BookUser,
  User2,
  Calculator,
  BookOpen,
  BriefcaseBusiness,
  Calendar,
  School,
} from "lucide-react";
import type { GroupFullInfo, Member } from "@/types/types";

import ApplyGroup from "./apply-group";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

interface GroupInfoSheetProps {
  group: GroupFullInfo;
  open: boolean;
  onClose: () => void;
}

export default function GroupInfoSheet({
  group,
  open,
  onClose,
}: GroupInfoSheetProps) {
  const leaderInfo = group?.groupMemberList?.find(
    (x: Member) => x.isLeader == true
  );
  const memberList = group?.groupMemberList?.filter(
    (x: Member) => x.isLeader == false
  );

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        className="w-full md:max-w-[50%] overflow-y-auto p-4 sm:p-6"
        // Make sheet full-screen on mobile
        side="right"
      >
        <SheetHeader className="mb-4 sm:mb-6">
          <SheetTitle className="font-semibold tracking-tight text-lg sm:text-xl text-primary">
            Group Information
          </SheetTitle>
          <SheetDescription className="text-xs sm:text-sm">
            Detail information about group
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          {/* Group info */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <BookUser className="size-4 text-primary" />
              General Information
            </h3>
            <Card className="bg-primary/5">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between border-b pb-3 sm:pb-4 mb-3 sm:mb-4">
                  <div className="flex flex-1 items-center gap-3 sm:gap-4">
                    <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-2 border-primary flex-shrink-0">
                      <AvatarFallback className="bg-primary/10">
                        <User2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-bold text-lg sm:text-xl text-primary break-words">
                        {leaderInfo?.studentFullName}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">
                        Leader - {leaderInfo?.studentEmail}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="rounded-md p-1 sm:p-2 flex-shrink-0">
                      <Users className="size-4 sm:size-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm text-muted-foreground">
                        Group Code
                      </h3>
                      <p className="font-semibold tracking-tight break-words">
                        {group?.groupCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="rounded-md p-1 sm:p-2 flex-shrink-0">
                      <Calculator className="size-4 sm:size-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm text-muted-foreground">
                        Average GPA
                      </h3>
                      <p className="font-semibold tracking-tight break-words">
                        {group?.averageGPA?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="rounded-md p-1 sm:p-2 flex-shrink-0">
                      <School className="size-4 sm:size-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm text-muted-foreground">
                        Campus
                      </h3>
                      <p className="font-semibold tracking-tight break-words">
                        {group?.campusName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="rounded-md p-1 sm:p-2 flex-shrink-0">
                      <Calendar className="size-4 sm:size-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm text-muted-foreground">
                        Semester
                      </h3>
                      <p className="font-semibold tracking-tight break-words">
                        {group?.semesterName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="rounded-md p-1 sm:p-2 flex-shrink-0">
                      <BriefcaseBusiness className="size-4 sm:size-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm text-muted-foreground">
                        Major
                      </h3>
                      <p className="font-semibold tracking-tight break-words">
                        {group?.majorName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="rounded-md p-1 sm:p-2 flex-shrink-0">
                      <BookOpen className="size-4 sm:size-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm text-muted-foreground">
                        Capstone
                      </h3>
                      <p className="font-semibold tracking-tight break-words">
                        {group?.capstoneName}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* List invited */}
          {group?.groupMemberList && group?.groupMemberList?.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="size-4 text-primary" />
                Member(s)
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <Card className="bg-primary/5">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="size-10 sm:size-12 border-2 border-primary flex-shrink-0">
                        <AvatarFallback className="bg-primary/10">
                          <User2 className="size-5 sm:size-6 text-primary" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 w-full">
                        <p className="font-semibold text-primary text-sm sm:text-base break-words">
                          {leaderInfo?.studentFullName} -{" "}
                          {leaderInfo?.studentId} - GPA: {leaderInfo?.gpa}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground break-words">
                          {leaderInfo?.isLeader ? "Leader" : "Member"} -{" "}
                          {leaderInfo?.studentEmail}
                        </p>
                        <div className="text-xs sm:text-sm font-medium text-foreground flex items-start gap-1">
                          <span className="text-primary text-xs sm:text-sm font-bold whitespace-nowrap">
                            Skills:
                          </span>
                          <span className="break-words">
                            {leaderInfo?.skills}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {memberList?.map((member: Member, index: number) => (
                  <Card key={index} className="bg-primary/5">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="size-10 sm:size-12 border-2 border-primary flex-shrink-0">
                          <AvatarFallback className="bg-primary/10">
                            <User2 className="size-5 sm:size-6 text-primary" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 w-full">
                          <p className="font-semibold text-primary text-sm sm:text-base break-words">
                            {member.studentFullName} - {member.studentId} - GPA:{" "}
                            {member?.gpa}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground break-words">
                            {member?.isLeader ? "Leader" : "Member"} -{" "}
                            {member.studentEmail}
                          </p>
                          <div className="text-xs sm:text-sm font-medium text-foreground flex items-start gap-1">
                            <span className="text-primary text-xs sm:text-sm font-bold whitespace-nowrap">
                              Skills:
                            </span>
                            <span className="break-words">
                              {member?.skills}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        <SheetFooter className="mt-4 sm:mt-6 flex justify-end">
          <ApplyGroup group={group} onClose={onClose} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

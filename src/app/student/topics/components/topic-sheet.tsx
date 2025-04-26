"use client"

import { useEffect, useState } from "react"
import {
  BookOpen,
  BriefcaseBusiness,
  BadgeInfo,
  Users,
  FileCheck,
  BookUser,
  School,
  Calendar,
  PenTool,
  Star,
  User2,
  X,
} from "lucide-react"

import { getDate } from "@/lib/utils"
import { getTopicDifficulty, getTopicStatus } from "@/utils/statusUtils"

import type { Topic } from "@/types/types"
import { useAuth } from "@/contexts/auth-context"
import { useStudentTopics } from "@/contexts/student/student-topic-context"

import RegisterTopic from "@/app/student/topics/components/register-topic"
import DownloadDocument from "@/app/student/topics/components/download-document"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet"

interface TopicSheetProps {
  topic: Topic
  open: boolean
  onClose: () => void
}

export default function TopicSheet({ topic, open, onClose }: TopicSheetProps) {
  const { user } = useAuth()
  const { groupInfo } = useStudentTopics()
  const [isLeader, setIsLeader] = useState(false)

  useEffect(() => {
    if (groupInfo && user) {
      const leader = groupInfo.groupMemberList.find(
        (member) =>
          member.studentId === user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"] &&
          member.isLeader,
      )
      setIsLeader(!!leader)
    }
  }, [groupInfo, user])

  const hasRegisteredTopic = !!groupInfo?.topicCode

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full md:w-1/2 md:max-w-[50%] p-4 sm:p-6 overflow-y-auto" side="right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <SheetHeader className="mb-0 sm:mb-0">
            <SheetTitle className="font-semibold tracking-tight text-lg sm:text-xl text-primary break-words">
              {topic.englishName}
            </SheetTitle>
            <SheetDescription className="text-xs sm:text-sm break-words">{topic.vietnameseName}</SheetDescription>
          </SheetHeader>
          <div className="flex-shrink-0">
            <DownloadDocument topic={topic} />
          </div>
        </div>
        <div className="mt-4 sm:mt-6 space-y-4">
          {/* topic info */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-semibold flex items-center gap-2">
                <BookUser className="size-4 text-primary" />
                General Information
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Created at: {getDate(topic?.createdDate || "")}
              </p>
            </div>
            <Card className="bg-primary/5">
              <CardContent className="p-3 sm:p-6 space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-sm border-b pb-3 sm:pb-4 mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-muted rounded-md p-1 sm:p-2 flex-shrink-0">
                      <School className="size-4 sm:size-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm text-muted-foreground">Campus</h3>
                      <p className="font-semibold tracking-tight break-words">{topic?.campusId}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-muted rounded-md p-1 sm:p-2 flex-shrink-0">
                      <Calendar className="size-4 sm:size-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm text-muted-foreground">Semester</h3>
                      <p className="font-semibold tracking-tight break-words">{topic?.semesterId}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-muted rounded-md p-1 sm:p-2 flex-shrink-0">
                      <BookOpen className="size-4 sm:size-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm text-muted-foreground">Capstone</h3>
                      <p className="font-semibold tracking-tight break-words">{topic?.capstoneId}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-muted rounded-md p-1 sm:p-2 flex-shrink-0">
                      <FileCheck className="size-4 sm:size-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm text-muted-foreground">Topic code</h3>
                      <p className="font-semibold tracking-tight break-words">{topic?.code}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-muted rounded-md p-1 sm:p-2 flex-shrink-0">
                      <PenTool className="size-4 sm:size-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm text-muted-foreground">Abbreviation</h3>
                      <p className="font-semibold tracking-tight break-words">{topic?.abbreviation}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-muted rounded-md p-1 sm:p-2 flex-shrink-0">
                      <BriefcaseBusiness className="size-4 sm:size-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm text-muted-foreground">Business area</h3>
                      <p className="font-semibold tracking-tight break-words">{topic?.businessAreaName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-muted rounded-md p-1 sm:p-2 flex-shrink-0">
                      <Star className="size-4 sm:size-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm text-muted-foreground">Difficulty</h3>
                      {getTopicDifficulty(topic?.difficultyLevel)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-muted rounded-md p-1 sm:p-2 flex-shrink-0">
                      <BadgeInfo className="size-4 sm:size-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm text-muted-foreground">Status</h3>
                      {getTopicStatus(topic?.status)}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xs sm:text-sm text-muted-foreground">Description:</h3>
                  <div
                    className="text-xs sm:text-base prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: topic?.description }}
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
            <div className="grid grid-cols-1 gap-2">
              <Card className="bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 sm:size-12 border-2 border-primary flex-shrink-0">
                      <AvatarFallback className="bg-primary/10">
                        <User2 className="size-5 sm:size-6 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-semibold text-primary text-sm sm:text-base break-words">
                        {topic?.mainSupervisorName}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">
                        {topic?.mainSupervisorEmail}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {topic?.coSupervisors?.map((supervisor: any, index: number) => (
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
                          {supervisor?.supervisorName}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground break-words">
                          {supervisor?.supervisorEmail}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* button action */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mt-4">
            <SheetClose asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <X className="h-4 w-4" />
                Close
              </Button>
            </SheetClose>
            {isLeader && !hasRegisteredTopic && groupInfo?.id && (
              <RegisterTopic topicId={topic.id} groupId={groupInfo?.id} />
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

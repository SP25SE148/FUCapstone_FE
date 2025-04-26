"use client"

import { useState } from "react"
import { User2, X, Users, Send, BookUser, FileCheck, Calculator, School, Calendar, BriefcaseBusiness, BookOpen, BadgeInfoIcon } from 'lucide-react'

import { useStudentGroup } from "@/contexts/student/student-group-context"
import { useStudentProfile } from "@/contexts/student/student-profile-context"

import { getGroupMemberStatus, getGroupStatus } from "@/utils/statusUtils"

import CreateGroup from "./create-group"
import InviteMember from "./invite-member"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function MyGroup() {
  const { studentProfile, loading } = useStudentProfile()
  const { groupInfo, updateStatusInvitation, registerGroup } = useStudentGroup()

  const leaderInfo = groupInfo?.groupMemberList?.find((x) => x.isLeader == true)
  const memberList = groupInfo?.groupMemberList?.filter((x) => x.isLeader == false)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [deleteInfo, setDeleteInfo] = useState<{} | null>({})
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [openRegister, setOpenRegister] = useState<boolean>(false)

  const handleDeleteMember = async () => {
    setIsLoading(true)
    try {
      const res: any = await updateStatusInvitation(deleteInfo)
      if (res?.isSuccess) {
        setDeleteInfo(null)
      }
    } finally {
      setIsLoading(false)
      setOpenDelete(false)
    }
  }

  const handleRegisterGroup = async () => {
    setIsLoading(true)
    try {
      await registerGroup()
    } finally {
      setIsLoading(false)
      setOpenRegister(false)
    }
  }

  if (loading) {
    return <MyGroup.Loading />
  } else {
    return !studentProfile?.isHaveBeenJoinGroup ? (
      <CreateGroup />
    ) : (
      <>
        <Card className="min-h-[calc(100vh-60px)] bg-gradient-to-tr from-primary/5 to-background">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <CardHeader>
              <CardTitle className="font-semibold tracking-tight text-xl text-primary">My group</CardTitle>
              <CardDescription>Information about my group</CardDescription>
            </CardHeader>
            {studentProfile?.id == leaderInfo?.studentId && groupInfo?.status == "Pending" && (
              <Button className="mx-6 mb-4 md:m-6 transition-all hover:scale-105" onClick={() => setOpenRegister(true)}>
                <Send className="mr-2" />
                REGISTER
              </Button>
            )}
          </div>

          {/* Body */}
          <CardContent>
            <div className="space-y-6 md:space-y-8">
              {/* Group info */}
              <div className="space-y-3 md:space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <BookUser className="size-4 text-primary" />
                  General Information
                </h3>
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-primary/20 pb-4 mb-4">
                      <div className="flex flex-1 items-start md:items-center gap-4">
                        <Avatar className="h-10 w-10 md:h-16 md:w-16 border-2 border-primary flex-shrink-0">
                          <AvatarFallback className="bg-primary/10">
                            <User2 className="h-4 w-4 md:h-8 md:w-8 text-primary" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 w-full">
                          <p className="font-bold text-base md:text-xl text-primary break-words">
                            {leaderInfo?.studentFullName}
                          </p>
                          <p className="text-xs md:text-sm text-muted-foreground break-words">
                            Leader - {leaderInfo?.studentEmail}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 text-sm">
                      <div className="flex items-start space-x-2">
                        <div className="rounded-md p-2 flex-shrink-0">
                          <Users className="size-4 md:size-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xs md:text-sm text-muted-foreground">Group Code</h3>
                          <p className="font-semibold tracking-tight break-words">{groupInfo?.groupCode}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="rounded-md p-2 flex-shrink-0">
                          <FileCheck className="size-4 md:size-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xs md:text-sm text-muted-foreground">Topic Code</h3>
                          <p className="font-semibold tracking-tight break-words">{groupInfo?.topicCode}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="rounded-md p-2 flex-shrink-0">
                          <Calculator className="size-4 md:size-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xs md:text-sm text-muted-foreground">Average GPA</h3>
                          <p className="font-semibold tracking-tight break-words">
                            {groupInfo?.averageGPA?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="rounded-md p-2 flex-shrink-0">
                          <School className="size-4 md:size-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xs md:text-sm text-muted-foreground">Campus</h3>
                          <p className="font-semibold tracking-tight break-words">{groupInfo?.campusName}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="rounded-md p-2 flex-shrink-0">
                          <Calendar className="size-4 md:size-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xs md:text-sm text-muted-foreground">Semester</h3>
                          <p className="font-semibold tracking-tight break-words">{groupInfo?.semesterName}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="rounded-md p-2 flex-shrink-0">
                          <BriefcaseBusiness className="size-4 md:size-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xs md:text-sm text-muted-foreground">Major</h3>
                          <p className="font-semibold tracking-tight break-words">{groupInfo?.majorName}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="rounded-md p-2 flex-shrink-0">
                          <BookOpen className="size-4 md:size-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xs md:text-sm text-muted-foreground">Capstone</h3>
                          <p className="font-semibold tracking-tight break-words">{groupInfo?.capstoneName}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="rounded-md p-2 flex-shrink-0">
                          <BadgeInfoIcon className="size-4 md:size-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xs md:text-sm text-muted-foreground">Status</h3>
                          {getGroupStatus(groupInfo?.status || "")}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Invite member */}
              {studentProfile?.id == leaderInfo?.studentId && groupInfo?.status == "Pending" && <InviteMember />}

              {/* List invited */}
              {groupInfo?.groupMemberList && groupInfo?.groupMemberList?.length > 0 && (
                <div className="space-y-3 md:space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Users className="size-4 text-primary" />
                    Invited Student(s):
                    <span className="text-xs md:text-sm text-muted-foreground">
                      {groupInfo?.groupMemberList?.length} member(s)
                    </span>
                  </h3>
                  <div className="space-y-2">
                    <Card className="bg-primary/5">
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="size-8 md:size-12 border-2 border-primary flex-shrink-0">
                            <AvatarFallback className="bg-primary/10">
                              <User2 className="size-4 md:size-6 text-primary" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 w-full">
                            <p className="font-semibold text-primary text-xs md:text-base break-words">
                              {leaderInfo?.studentFullName} - {leaderInfo?.studentId} - GPA: {leaderInfo?.gpa}
                            </p>
                            <p className="text-xs md:text-sm text-muted-foreground break-words">
                              {leaderInfo?.isLeader ? "Leader" : "Member"} - {leaderInfo?.studentEmail}
                            </p>
                            <div className="text-xs md:text-sm font-medium text-muted-foreground flex items-start gap-1">
                              <span className="text-primary text-xs md:text-sm font-bold whitespace-nowrap">Skills:</span>
                              <span className="break-words">{leaderInfo?.skills}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {memberList?.map((member, index) => (
                      <Card key={index} className="bg-primary/5">
                        <CardContent className="p-3 md:p-4">
                          <div className="flex flex-col md:flex-row">
                            <div className="flex items-start gap-3 flex-grow">
                              <Avatar className="size-8 md:size-12 border-2 border-primary flex-shrink-0">
                                <AvatarFallback className="bg-primary/10">
                                  <User2 className="size-4 md:size-6 text-primary" />
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0 w-full">
                                <p className="font-semibold text-primary text-xs md:text-base break-words">
                                  {member.studentFullName} - {member.studentId} - GPA: {member?.gpa}
                                </p>
                                <p className="text-xs md:text-sm text-muted-foreground break-words">
                                  {member?.isLeader ? "Leader" : "Member"} - {member.studentEmail}
                                </p>
                                <div className="text-xs md:text-sm font-medium text-muted-foreground flex items-start gap-1">
                                  <span className="text-primary text-xs md:text-sm font-bold whitespace-nowrap">
                                    Skills:
                                  </span>
                                  <span className="break-words">{member?.skills}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 md:mt-0 md:ml-auto md: justify-end">
                              {getGroupMemberStatus(member?.status)}
                              {studentProfile?.id === leaderInfo?.studentId &&
                                member?.status === "Accepted" &&
                                groupInfo?.status === "InProgress" && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      setDeleteInfo({
                                        id: member?.id,
                                        groupId: member?.groupId,
                                        status: 3,
                                      })
                                      setOpenDelete(true)
                                    }}
                                    className="text-destructive hover:text-destructive/90"
                                  >
                                    <X />
                                  </Button>
                                )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* AlertDialog Delete */}
        <AlertDialog open={openDelete} onOpenChange={() => setOpenDelete(!openDelete)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Member</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove this member from your group? <br />
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col md:flex-row gap-2">
              <AlertDialogCancel disabled={isLoading} className="mt-0">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={isLoading}
                onClick={handleDeleteMember}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* comfirm */}
        <AlertDialog open={openRegister} onOpenChange={setOpenRegister}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Please check again before continue.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col md:flex-row gap-2">
              <AlertDialogCancel disabled={isLoading} className="mt-0">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction disabled={isLoading} onClick={handleRegisterGroup}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }
}

MyGroup.Loading = () => {
  return (
    <Card className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gradient-to-tr from-primary/20 to-background">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
    </Card>
  )
}

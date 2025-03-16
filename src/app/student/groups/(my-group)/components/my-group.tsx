"use client";

import { useState } from "react";
import { User2, X, Users, Send, BookUser } from "lucide-react";

import CreateGroup from "./create-group";
import InviteMember from "./invite-member";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useStudentGroup } from "@/contexts/student/student-group-context";
import { useStudentProfile } from "@/contexts/student/student-profile-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";

export default function MyGroup() {
    const { studentProfile, loading } = useStudentProfile();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [openRegister, setOpenRegister] = useState<boolean>(false);
    const [deleteInfo, setDeleteInfo] = useState<{} | null>({});
    const { groupInfo, updateStatusInvitation, registerGroup } = useStudentGroup();
    const leaderInfo = groupInfo?.groupMemberList?.find((x) => x.isLeader == true)
    const memberList = groupInfo?.groupMemberList?.filter((x) => x.isLeader == false)

    const handleDeleteMember = async () => {
        setIsLoading(true);
        try {
            const res: any = await updateStatusInvitation(deleteInfo);
            if (res?.isSuccess) {
                setDeleteInfo(null);
            }
        } finally {
            setIsLoading(false);
            setOpenDelete(false);
        }
    };

    const getGroupStatusBadge = (status: string) => {
        switch (status) {
            case "Pending":
                return (
                    <Badge variant="secondary" className="text-sm select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                        Pending
                    </Badge>
                );
            case "Rejected":
                return (
                    <Badge variant="secondary" className="text-sm select-none bg-rose-200 text-rose-800 hover:bg-rose-200">
                        Rejected
                    </Badge>
                );
            case "InProgress":
                return (
                    <Badge variant="secondary" className="text-sm select-none bg-sky-200 text-sky-800 hover:bg-sky-200">
                        In Progress
                    </Badge>
                );
            case "Deleted":
                return (
                    <Badge variant="secondary" className="text-sm select-none bg-red-200 text-red-800 hover:bg-red-200">
                        Deleted
                    </Badge>
                );
            default:
                return null;
        }
    };

    const getMemberStatusBadge = (status: string) => {
        switch (status) {
            case "UnderReview":
                return (
                    <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                        Under Review
                    </Badge>
                );
            case "Accepted":
                return (
                    <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
                        Accepted
                    </Badge>
                );
            case "Rejected":
                return (
                    <Badge variant="secondary" className="select-none bg-rose-200 text-rose-800 hover:bg-rose-200">
                        Rejected
                    </Badge>
                );
            case "LeftGroup":
                return (
                    <Badge variant="secondary" className="select-none bg-red-200 text-red-800 hover:bg-red-200">
                        Left Group
                    </Badge>
                );
            case "Cancelled":
                return (
                    <Badge variant="secondary" className="select-none bg-red-200 text-red-800 hover:bg-red-200">
                        Cancelled
                    </Badge>
                );
            default:
                return null;
        }
    };

    const handleRegisterGroup = async () => {
        setIsLoading(true);
        try {
            await registerGroup(groupInfo?.id || "");
        } finally {
            setIsLoading(false);
            setOpenRegister(false);
        }
    };

    if (loading) {
        return <MyGroup.Loading />
    } else {
        return !studentProfile?.isHaveBeenJoinGroup
            ?
            <CreateGroup />
            :
            <>
                <Card className="min-h-[calc(100vh-60px)] bg-gradient-to-tr from-primary/5 to-background">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <CardTitle className="font-semibold tracking-tight text-xl text-primary">My group</CardTitle>
                                {getGroupStatusBadge(groupInfo?.status || "")}
                            </div>
                            <CardDescription>Information about my group</CardDescription>
                        </CardHeader>
                        {studentProfile?.id == leaderInfo?.studentId && groupInfo?.status == "Pending" &&
                            <Button
                                className="m-6 transition-all hover:scale-105"
                                onClick={() => setOpenRegister(true)}
                            >
                                <Send />
                                REGISTER
                            </Button>
                        }
                    </div>

                    {/* Body */}
                    <CardContent>
                        <div className="space-y-8">
                            {/* Group info */}
                            <div className="space-y-4">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <BookUser className="size-4 text-primary" />
                                    General Information
                                </h3>
                                <Card className="border-primary/20 bg-primary/5">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between border-b border-primary/20 pb-4 mb-4">
                                            <div className="flex flex-1 items-center gap-4">
                                                <Avatar className="h-16 w-16 border-2 border-primary">
                                                    <AvatarFallback className="bg-primary/10">
                                                        <User2 className="h-8 w-8 text-primary" />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-bold text-xl text-primary">
                                                        {leaderInfo?.studentFullName}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">Leader - {leaderInfo?.studentEmail}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-6 text-sm">
                                            <div className="space-y-2">
                                                <p className="font-medium text-muted-foreground">Group Code</p>
                                                <p className="pl-2 font-semibold">{groupInfo?.groupCode}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="font-medium text-muted-foreground">Topic Code</p>
                                                <p className="pl-2 font-semibold">{groupInfo?.topicCode}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="font-medium text-muted-foreground">Average GPA</p>
                                                <p className="pl-2 font-semibold">{groupInfo?.averageGPA}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="font-medium text-muted-foreground">Campus</p>
                                                <p className="pl-2 font-semibold">{groupInfo?.campusName}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="font-medium text-muted-foreground">Semester</p>
                                                <p className="pl-2 font-semibold">{groupInfo?.semesterName}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="font-medium text-muted-foreground">Major</p>
                                                <p className="pl-2 font-semibold">{groupInfo?.majorName}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="font-medium text-muted-foreground">Capstone</p>
                                                <p className="pl-2 font-semibold">{groupInfo?.capstoneName}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Invite member */}
                            {studentProfile?.id == leaderInfo?.studentId && groupInfo?.status == "Pending" && <InviteMember />}

                            {/* List invited */}
                            {groupInfo?.groupMemberList && groupInfo?.groupMemberList?.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <Users className="size-4 text-primary" />
                                        Invited Student(s)
                                    </h3>
                                    <div className="space-y-2">
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
                                                <CardContent className="p-4 flex items-center justify-between">
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
                                                    <div className="flex items-center gap-2">
                                                        {getMemberStatusBadge(member?.status)}
                                                        {studentProfile?.id == leaderInfo?.studentId && member?.status == "UnderReview" && <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => {
                                                                setDeleteInfo({
                                                                    "id": member?.id,
                                                                    "groupId": member?.groupId,
                                                                    "memberId": member?.studentId,
                                                                    "status": 4
                                                                })
                                                                setOpenDelete(true);
                                                            }}
                                                            className="text-destructive hover:text-destructive/90"
                                                        >
                                                            <X />
                                                        </Button>}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card >

                {/* AlertDialog Delete */}
                <AlertDialog
                    open={openDelete}
                    onOpenChange={() => setOpenDelete(!openDelete)}
                >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Remove Member</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to remove this member from your group? <br />
                                This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
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
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                            <AlertDialogAction disabled={isLoading} onClick={handleRegisterGroup}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </>
            ;
    }
}

MyGroup.Loading = () => {
    return (
        <Card className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gradient-to-tr from-primary/20 to-background">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        </Card>
    )
}
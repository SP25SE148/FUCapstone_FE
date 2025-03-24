"use client";

import { Users, BookUser, User2, Calculator, BookOpen, BriefcaseBusiness, Calendar, School } from "lucide-react";

import { Member } from "./columns";
import ApplyGroup from "./apply-group";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, } from "@/components/ui/sheet";

interface GroupInfoSheetProps {
    group: any;
    open: boolean;
    onClose: () => void;
}

export default function GroupInfoSheet({ group, open, onClose }: GroupInfoSheetProps) {
    const leaderInfo = group?.groupMemberList?.find((x: Member) => x.isLeader == true)
    const memberList = group?.groupMemberList?.filter((x: Member) => x.isLeader == false)

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="w-1/2 sm:max-w-[50%] overflow-y-auto">
                <SheetHeader className="mb-6">
                    <SheetTitle className="font-semibold tracking-tight text-xl text-primary">
                        Group Information
                    </SheetTitle>
                    <SheetDescription>Detail information about group</SheetDescription>
                </SheetHeader>
                <div className="space-y-4">
                    {/* Group info */}
                    <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2">
                            <BookUser className="size-4 text-primary" />
                            General Information
                        </h3>
                        <Card className="bg-primary/5">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between border-b pb-4 mb-4">
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
                                <div className="grid grid-cols-3 gap-6 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <div className="rounded-md p-2">
                                            <Users className="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-muted-foreground">Group Code</h3>
                                            <p className="font-semibold tracking-tight">
                                                {group?.groupCode}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="rounded-md p-2">
                                            <Calculator className="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-muted-foreground">Average GPA</h3>
                                            <p className="font-semibold tracking-tight">
                                                {group?.averageGPA?.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="rounded-md p-2">
                                            <School className="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-muted-foreground">Campus</h3>
                                            <p className="font-semibold tracking-tight">
                                                {group?.campusName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="rounded-md p-2">
                                            <Calendar className="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-muted-foreground">Semester</h3>
                                            <p className="font-semibold tracking-tight">
                                                {group?.semesterName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="rounded-md p-2">
                                            <BriefcaseBusiness className="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-muted-foreground">Major</h3>
                                            <p className="font-semibold tracking-tight">
                                                {group?.majorName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="rounded-md p-2">
                                            <BookOpen className="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-muted-foreground">Capstone</h3>
                                            <p className="font-semibold tracking-tight">
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
                                {memberList?.map((member: Member, index: number) => (
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
                    )}
                </div>
                <SheetFooter className="mt-6">
                    <ApplyGroup group={group} onClose={onClose} />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
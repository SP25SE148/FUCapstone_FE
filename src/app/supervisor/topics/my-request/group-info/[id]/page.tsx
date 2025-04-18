"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { BadgeInfo, BookOpen, BookUser, BriefcaseBusiness, Calculator, Calendar, FileCheck, School, Undo2, User2, Users } from "lucide-react"

import { GroupFullInfo } from "@/types/types"
import { getGroupStatus } from "@/utils/statusUtils"
import { useSupervisorTopicRequest } from "@/contexts/supervisor/supervisor-topic-request-context"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"

export default function GroupInfoPage() {
    const router = useRouter();
    const params = useParams();
    const id: string = String(params.id);
    const { getGroupById } = useSupervisorTopicRequest();

    const [group, setGroup] = useState<GroupFullInfo>();
    const leaderInfo = group?.groupMemberList?.find((x) => x.isLeader == true)
    const memberList = group?.groupMemberList?.filter((x) => x.isLeader == false)

    useEffect(() => {
        (async () => {
            const groupDetail = await getGroupById(id);
            setGroup(groupDetail)
        })();
    }, []);

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <div className="flex items-center">
                <Button className="ml-6" size={"icon"}
                    onClick={() => router.back()}
                >
                    <Undo2 />
                </Button>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <CardTitle className="font-semibold tracking-tight text-xl text-primary">Group Information</CardTitle>
                    </div>
                    <CardDescription>Detailed information about group members</CardDescription>
                </CardHeader>
            </div>
            <CardContent>
                <div className="space-y-4">
                    {/* Group info */}
                    <div className="space-y-2">
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
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
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
                                            <FileCheck className="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-muted-foreground">Topic Code</h3>
                                            <p className="font-semibold tracking-tight">
                                                {group?.topicCode}
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
                                    <div className="flex items-center space-x-2">
                                        <div className="rounded-md p-2">
                                            <BadgeInfo className="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-muted-foreground">Status</h3>
                                            {getGroupStatus(group?.status || "")}
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
                                Member(s):
                                <span className="text-sm text-muted-foreground">{group?.currentNumberOfGroupPerMax}</span>
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
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
                                                <p className="text-sm font-medium text-muted-foreground flex items-center gap-1 pr-4">
                                                    <span className="text-primary text-sm font-bold">Skills: </span> {leaderInfo?.skills}
                                                </p>
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
                                                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-1 pr-4">
                                                        <span className="text-primary text-sm font-bold">Skills: </span> {member.skills}
                                                    </p>
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
    )
}
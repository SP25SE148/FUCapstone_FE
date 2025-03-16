"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { BookUser, Undo2, User2, Users } from "lucide-react"

import { Group, useSupervisorTopicRequest } from "@/contexts/supervisor/supervisor-topic-request-context"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"

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

export default function GroupInfoPage() {
    const router = useRouter();
    const params = useParams();
    const id: string = String(params.id);
    const { getGroupById } = useSupervisorTopicRequest();

    const [group, setGroup] = useState<Group>();
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
                        {getGroupStatusBadge(group?.status || "")}
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
                                <div className="grid grid-cols-4 gap-6 text-sm">
                                    <div className="space-y-2">
                                        <p className="font-medium text-muted-foreground">Group Code</p>
                                        <p className="pl-2 font-semibold">{group?.groupCode}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="font-medium text-muted-foreground">Topic Code</p>
                                        <p className="pl-2 font-semibold">{group?.topicCode}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="font-medium text-muted-foreground">Average GPA</p>
                                        <p className="pl-2 font-semibold">{group?.averageGPA}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="font-medium text-muted-foreground">Campus</p>
                                        <p className="pl-2 font-semibold">{group?.campusName}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="font-medium text-muted-foreground">Semester</p>
                                        <p className="pl-2 font-semibold">{group?.semesterName}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="font-medium text-muted-foreground">Major</p>
                                        <p className="pl-2 font-semibold">{group?.majorName}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="font-medium text-muted-foreground">Capstone</p>
                                        <p className="pl-2 font-semibold">{group?.capstoneName}</p>
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
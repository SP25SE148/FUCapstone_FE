"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BadgeInfo, BookOpen, BookUser, BriefcaseBusiness, Calendar, FileCheck, PenTool, School, Star, Undo2, User2, Users } from "lucide-react";

import { GroupFullInfo, Member } from "@/types/types";
import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import { getDate } from "@/lib/utils";
import { getTopicDifficulty, getTopicStatus } from "@/utils/statusUtils";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GroupInfoPage() {
    const { getTopicGroupInformation } = useSupervisorGroup();

    const router = useRouter();
    const params = useParams();
    const id: string = String(params.id);
    const [groupTopicInfo, setGroupTopicInfo] = useState<GroupFullInfo>();
    const leaderInfo = groupTopicInfo?.groupMemberList?.find((x: Member) => x.isLeader == true)
    const memberList = groupTopicInfo?.groupMemberList?.filter((x: Member) => x.isLeader == false)

    useEffect(() => {
        (async () => {
            const groupTopicDetail = await getTopicGroupInformation(id);
            setGroupTopicInfo(groupTopicDetail)
        })();
    }, [])

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Button className="ml-6" size={"icon"}
                        onClick={() => router.back()}
                    >
                        <Undo2 />
                    </Button>
                    <CardHeader>
                        <CardTitle className="font-semibold tracking-tight text-xl text-primary">{groupTopicInfo?.topicResponse?.englishName}</CardTitle>
                        <CardDescription>{groupTopicInfo?.topicResponse?.vietnameseName}</CardDescription>
                    </CardHeader>
                </div>
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
                            Created at: {getDate(groupTopicInfo?.topicResponse?.createdDate || "")}
                        </p>
                    </div>
                    <Card className="bg-primary/5">
                        <CardContent className="p-6 space-y-2">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm border-b pb-4 mb-4">
                                <div className="flex items-center space-x-2">
                                    <div className="bg-muted rounded-md p-2">
                                        <School className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">
                                            Campus
                                        </h3>
                                        <p className="font-semibold tracking-tight">{groupTopicInfo?.topicResponse?.campusId}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-muted rounded-md p-2">
                                        <Calendar className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">
                                            Semester
                                        </h3>
                                        <p className="font-semibold tracking-tight">{groupTopicInfo?.topicResponse?.semesterId}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-muted rounded-md p-2">
                                        <BookOpen className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">
                                            Capstone
                                        </h3>
                                        <p className="font-semibold tracking-tight">{groupTopicInfo?.topicResponse?.capstoneId}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-muted rounded-md p-2">
                                        <FileCheck className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">
                                            Topic code
                                        </h3>
                                        <p className="font-semibold tracking-tight">{groupTopicInfo?.topicResponse?.code}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-muted rounded-md p-2">
                                        <PenTool className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">
                                            Abbreviation
                                        </h3>
                                        <p className="font-semibold tracking-tight">{groupTopicInfo?.topicResponse?.abbreviation}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-muted rounded-md p-2">
                                        <BriefcaseBusiness className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">
                                            Business area
                                        </h3>
                                        <p className="font-semibold tracking-tight">{groupTopicInfo?.topicResponse?.businessAreaName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-muted rounded-md p-2">
                                        <Star className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">
                                            Difficulty
                                        </h3>
                                        {getTopicDifficulty(groupTopicInfo?.topicResponse?.difficultyLevel || "")}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-muted rounded-md p-2">
                                        <BadgeInfo className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">
                                            Status
                                        </h3>
                                        {getTopicStatus(groupTopicInfo?.topicResponse?.status || "")}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-sm text-muted-foreground">Description:</h3>
                                <div dangerouslySetInnerHTML={{ __html: groupTopicInfo?.topicResponse?.description || "" }} />
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
                                        <p className="font-semibold text-primary"> {groupTopicInfo?.topicResponse?.mainSupervisorName}</p>
                                        <p className="text-sm text-muted-foreground">{groupTopicInfo?.topicResponse?.mainSupervisorEmail}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        {groupTopicInfo?.topicResponse?.coSupervisors?.map((supervisor: any, index) => (
                            <Card key={index} className="bg-primary/5">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="size-12 border-2 border-primary">
                                            <AvatarFallback className="bg-primary/10">
                                                <User2 className="size-6 text-primary" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-primary">
                                                {supervisor?.supervisorName}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {supervisor?.supervisorEmail}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* member */}
                <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                        <Users className="size-4 text-primary" />
                        Member(s):
                        <span className="text-sm text-muted-foreground">{groupTopicInfo?.currentNumberOfGroupPerMax}</span>
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
            </CardContent>
        </Card>
    );
}
"use client"

import { BadgeInfo, BookOpen, BriefcaseBusiness, Calendar, FileCheck, PenTool, School, Star, User2 } from "lucide-react";

import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const getDifficultyStatus = (status: string | undefined) => {
    switch (status) {
        case "Easy":
            return <Badge variant="secondary" className="select-none bg-blue-400 text-blue-800 hover:bg-blue-400">{status}</Badge>
        case "Medium":
            return <Badge variant="secondary" className="select-none bg-green-400 text-green-800 hover:bg-green-400">{status}</Badge>
        case "Hard":
            return <Badge variant="secondary" className="select-none bg-red-400 text-red-800 hover:bg-red-400">{status}</Badge>
        default:
            return null;
    }
}

const getStatus = (status: string | undefined) => {
    switch (status) {
        case "Pending":
            return (
                <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                    {status}
                </Badge>
            );
        case "Approved":
            return (
                <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
                    {status}
                </Badge>
            );
        case "Considered":
            return (
                <Badge variant="secondary" className="select-none bg-rose-200 text-rose-800 hover:bg-rose-200">
                    {status}
                </Badge>
            );
        case "Rejected":
            return (
                <Badge variant="secondary" className="select-none bg-red-200 text-red-800 hover:bg-red-200">
                    {status}
                </Badge>
            );
        default:
            return null;
    }
}

export default function GroupInfoPage() {
    const { groupTopicInfo } = useSupervisorGroup();
    const leaderInfo = groupTopicInfo?.groupResponse?.groupMemberList?.find((x) => x.isLeader == true)
    const memberList = groupTopicInfo?.groupResponse?.groupMemberList?.filter((x) => x.isLeader == false)

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">{groupTopicInfo?.topicResponse?.englishName}</CardTitle>
                <CardDescription>{groupTopicInfo?.topicResponse?.vietnameseName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
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
                            {getDifficultyStatus(groupTopicInfo?.topicResponse?.difficultyLevel)}
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
                            {getStatus(groupTopicInfo?.topicResponse?.status)}
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-sm text-muted-foreground">Description:</h3>
                    <p className="p-4 font-semibold tracking-tight text-justify italic">{groupTopicInfo?.topicResponse?.description}</p>
                </div>
                <div>
                    <h3 className="text-sm text-muted-foreground">Supervisor(s):</h3>
                    <div className="p-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/20">
                            <Avatar className="size-12 border-2 border-primary/10">
                                <AvatarFallback className="text-lg font-semibold text-primary">
                                    <User2 />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold">
                                    {groupTopicInfo?.topicResponse?.mainSupervisorName}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {groupTopicInfo?.topicResponse?.mainSupervisorEmail}
                                </p>
                            </div>
                        </div>
                        {groupTopicInfo?.topicResponse?.coSupervisors?.map((supervisor: any, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 border rounded-lg bg-muted/20">
                                <Avatar className="size-12 border-2 border-primary/10">
                                    <AvatarFallback className="text-lg font-semibold text-primary">
                                        <User2 />
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold">
                                        {supervisor?.SupervisorName}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {supervisor?.SupervisorEmail}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-sm text-muted-foreground">Member(s):</h3>
                    <div className="p-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/20">
                            <Avatar className="size-12 border-2 border-primary/10">
                                <AvatarFallback className="text-lg font-semibold text-primary">
                                    <User2 />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold">
                                    {leaderInfo?.studentFullName} - {leaderInfo?.studentId}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {leaderInfo?.isLeader ? "Leader" : "Member"} - {leaderInfo?.studentEmail}
                                </p>
                            </div>
                        </div>
                        {memberList?.map((member, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 border rounded-lg bg-muted/20">
                                <Avatar className="size-12 border-2 border-primary/10">
                                    <AvatarFallback className="text-lg font-semibold text-primary">
                                        <User2 />
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold">
                                        {member.studentFullName} - {member.studentId}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {member?.isLeader ? "Leader" : "Member"} - {member.studentEmail}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
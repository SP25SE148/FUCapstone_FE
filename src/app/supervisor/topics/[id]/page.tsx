"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BadgeInfo, BookOpen, BookUser, BriefcaseBusiness, Calendar, FileCheck, FileX, Pencil, PenTool, RefreshCw, School, Star, Undo2, User2, Users } from "lucide-react";

import { Topic } from "@/types/types";
import { useSupervisorTopic } from "@/contexts/supervisor/supervisor-topic-context";

import { getDate } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { getTopicDifficulty, getTopicStatus } from "@/utils/statusUtils";

import GetStatistics from "./components/get-statistics";
import DownloadDocument from "./components/download-document";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TopicDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const id: string = String(params.id);

    const { user } = useAuth();
    const { fetchTopicsById, reAppraisalTopicForMainSupervisor } = useSupervisorTopic();

    const [topic, setTopic] = useState<Topic>();

    useEffect(() => {
        (async () => {
            const topicDetail = await fetchTopicsById(id);
            setTopic(topicDetail)
        })();
    }, [])

    return topic
        ?
        <Card className="min-h-[calc(100vh-60px)]">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Button className="ml-6" size={"icon"}
                        onClick={() => router.back()}
                    >
                        <Undo2 />
                    </Button>
                    <CardHeader>
                        <CardTitle className="font-semibold tracking-tight text-xl text-primary">{topic?.englishName}</CardTitle>
                        <CardDescription>{topic?.vietnameseName}</CardDescription>
                    </CardHeader>
                </div>
                <div className="flex items-center gap-2">
                    <GetStatistics />
                    <DownloadDocument topic={topic} />
                </div>
            </div>
            <CardContent className="space-y-4">
                {/* general info */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold flex items-center gap-2">
                            <BookUser className="size-4 text-primary" />
                            General Information
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Created at: {getDate(topic?.createdDate)}
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
                                        <p className="font-semibold tracking-tight">{topic?.campusId}</p>
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
                                        <p className="font-semibold tracking-tight">{topic?.semesterId}</p>
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
                                        <p className="font-semibold tracking-tight">{topic?.capstoneId}</p>
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
                                        <p className="font-semibold tracking-tight">{topic?.code}</p>
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
                                        <p className="font-semibold tracking-tight">{topic?.abbreviation}</p>
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
                                        <p className="font-semibold tracking-tight">{topic?.businessAreaName}</p>
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
                                        {getTopicDifficulty(topic?.difficultyLevel)}
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
                                        {getTopicStatus(topic?.status)}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-sm text-muted-foreground">Description:</h3>
                                <div dangerouslySetInnerHTML={{ __html: topic?.description }} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* supervisors */}
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
                                        <p className="font-semibold"> {topic?.mainSupervisorName}</p>
                                        <p className="text-sm text-muted-foreground">{topic?.mainSupervisorEmail}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        {topic?.coSupervisors?.map((supervisor: any, index: number) => (
                            <Card key={index} className="bg-primary/5">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="size-12 border-2 border-primary">
                                            <AvatarFallback className="bg-primary/10">
                                                <User2 className="size-6 text-primary" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">
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

                <div className="flex justify-end items-center gap-2">
                    {topic?.status === "Considered" && topic?.mainSupervisorName == user?.name &&
                        <Button
                            variant={"outline"}
                            onClick={() => reAppraisalTopicForMainSupervisor(topic?.id)}
                            className="border-primary text-primary hover:bg-primary hover:text-white"
                        >
                            <RefreshCw />
                            Reappraisal
                        </Button>}
                    {topic?.status !== "Approved" && topic?.mainSupervisorName == user?.name &&
                        <Button
                            onClick={() => router.push(`/supervisor/topics/${topic.id}/update`)}
                        >
                            <Pencil />
                            Update
                        </Button>}
                </div>
            </CardContent>
        </Card >
        :
        <Card className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gradient-to-tr from-primary/20 to-background">
            <div className="flex flex-col items-center justify-center gap-8">
                <FileX className="size-20 text-primary" />
                <div className="space-y-2">
                    <p className="text-2xl font-bold text-center">
                        You are trying to access a topic that does not exist.
                    </p>
                    <p className="text-muted-foreground text-center">
                        Please check the Id again or view another topic.
                    </p>
                </div>
            </div>
        </Card>
}
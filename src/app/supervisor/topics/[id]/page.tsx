"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BadgeInfo, BookOpen, BriefcaseBusiness, Calendar, FileCheck, FileX, PenTool, School, Star, Undo2 } from "lucide-react";

import { Topic, useSupervisorTopic } from "@/contexts/supervisor/supervisor-topic-context";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DownloadDocument from "./components/download-document";
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

const getCreatedDate = (data: string | undefined) => {
    const date = new Date(data || "");
    // Chuyển sang giờ Việt Nam (GMT+7)
    const vnDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));

    const day = vnDate.getDate().toString().padStart(2, '0');
    const month = (vnDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = vnDate.getFullYear();

    const hours = vnDate.getHours().toString().padStart(2, '0');
    const minutes = vnDate.getMinutes().toString().padStart(2, '0');
    const seconds = vnDate.getSeconds().toString().padStart(2, '0');

    return (
        <div className="flex items-center gap-2">
            <span>{`${day}/${month}/${year}`}</span>
            <span className="text-muted-foreground">{`${hours}:${minutes}:${seconds}`}</span>
        </div>
    )
};

export default function TopicDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const id: string = String(params.id);
    const [topic, setTopic] = useState<Topic>();
    const { fetchTopicsById } = useSupervisorTopic();

    useEffect(() => {
        (async () => {
            const topicDetail = await fetchTopicsById(id);
            setTopic(topicDetail)
        })();
    }, [])

    return topic
        ?
        <Card className="min-h-[calc(100vh-60px)]">
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
                            {getDifficultyStatus(topic?.difficultyLevel)}
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
                            {getStatus(topic?.status)}
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-sm text-muted-foreground">Description:</h3>
                    <p className="p-4 font-semibold tracking-tight text-justify italic">{topic?.description}</p>
                </div>
                <div>
                    <h3 className="text-sm text-muted-foreground">Supervisor(s):</h3>
                    <div className="p-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/20">
                            <Avatar className="size-12 border-2 border-primary/10">
                                <AvatarFallback className="text-lg font-semibold text-primary">
                                    {topic?.mainSupervisorName.slice(-1)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold">
                                    {topic?.mainSupervisorName}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {topic?.mainSupervisorEmail}
                                </p>
                            </div>
                        </div>
                        {topic?.coSupervisors?.map((supervisor: any, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 border rounded-lg bg-muted/20">
                                <Avatar className="size-12 border-2 border-primary/10">
                                    <AvatarFallback className="text-lg font-semibold text-primary">
                                        {supervisor?.SupervisorName.slice(-1)}
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
                <div className="flex justify-between items-center">
                    <DownloadDocument topic={topic} />
                    <div className="flex gap-2 text-sm text-muted-foreground">
                        <span>Created at:</span> {getCreatedDate(topic?.createdDate)}
                    </div>
                </div>
            </CardContent>
        </Card>
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
"use client"

import { useState } from "react";
import { BadgeInfo, BookOpen, BriefcaseBusiness, Calendar, FileCheck, PenTool, School, Star } from "lucide-react";

import { Topic } from "@/contexts/supervisor/supervisor-topic-context";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import DownloadDocument from "../../[id]/components/download-document";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const getDifficultyStatus = (status: number | undefined) => {
    switch (status) {
        case 0:
            return <Badge variant="secondary" className="select-none bg-blue-400 text-blue-800 hover:bg-blue-400">Easy</Badge>
        case 1:
            return <Badge variant="secondary" className="select-none bg-green-400 text-green-800 hover:bg-green-400">Medium</Badge>
        case 2:
            return <Badge variant="secondary" className="select-none bg-red-400 text-red-800 hover:bg-red-400">Hard</Badge>
        default:
            return null;
    }
}

const getStatus = (status: number | undefined) => {
    switch (status) {
        case 0:
            return (
                <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                    Pending
                </Badge>
            );
        case 1:
            return (
                <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
                    Passed
                </Badge>
            );
        case 2:
            return (
                <Badge variant="secondary" className="select-none bg-rose-200 text-rose-800 hover:bg-rose-200">
                    Considered
                </Badge>
            );
        case 3:
            return (
                <Badge variant="secondary" className="select-none bg-red-200 text-red-800 hover:bg-red-200">
                    Failed
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

export default function ItemTopic({ topic }: { topic: Topic }) {
    const [openDetail, setOpenDetail] = useState<boolean>(false);

    return (
        <>
            {/* item topic */}
            <Card
                className="p-4 grid grid-cols-4 items-center cursor-pointer hover:bg-muted"
                onClick={() => {
                    setOpenDetail(true);
                }}
            >
                <div className="col-span-3 flex items-center gap-4">
                    <span className="font-semibold text-primary">{topic?.code}</span>
                    <div className="col-span-2">
                        <p className="font-semibold tracking-tight text-xl text-primary">{topic?.englishName} - {topic?.abbreviation}</p>
                        <p className="text-sm text-muted-foreground">{topic?.vietnameseName}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    {getStatus(topic?.status)}
                    <div className="flex gap-2 text-sm text-muted-foreground">
                        <span>Created at:</span> {getCreatedDate(topic?.createdDate)}
                    </div>
                </div>
            </Card>

            {/* view detail */}
            <Dialog open={openDetail} onOpenChange={setOpenDetail}>
                <DialogContent className="max-w-4xl w-full max-h-[600px] overflow-auto">
                    <DialogHeader>
                        <DialogTitle className="font-semibold tracking-tight text-xl text-primary">{topic?.englishName}</DialogTitle>
                        <DialogDescription>{topic?.vietnameseName}</DialogDescription>
                    </DialogHeader>
                    <Card>
                        <CardContent className="pt-6 space-y-4">
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
                </DialogContent>
            </Dialog>
        </>
    )
}
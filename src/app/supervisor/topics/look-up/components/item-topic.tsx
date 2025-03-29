"use client"

import { useState } from "react";
import { BadgeInfo, BookOpen, BookUser, BriefcaseBusiness, Calendar, FileCheck, PenTool, School, Star, User2, Users } from "lucide-react";

import { Topic } from "@/types/types";
import { getDate } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import DownloadDocument from "./download-document";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

export default function ItemTopic({ topic }: { topic: Topic }) {
    const [openDetail, setOpenDetail] = useState<boolean>(false);

    return (
        <>
            {/* item topic */}
            <Card
                className="p-4 grid grid-cols-5 items-center cursor-pointer hover:bg-muted"
                onClick={() => {
                    setOpenDetail(true);
                }}
            >
                <div className="col-span-3">
                    <p className="font-semibold tracking-tight text-lg text-primary">{topic?.code} - {topic?.englishName} - {topic?.abbreviation}</p>
                    <p className="text-sm text-muted-foreground">{topic?.vietnameseName}</p>
                </div>
                <div className="col-span-2 text-right space-y-2">
                    {getStatus(topic?.status)}
                    <p className="text-sm text-muted-foreground">Created at: {getDate(topic?.createdDate)}</p>
                </div>
            </Card>

            {/* view detail */}
            <Dialog open={openDetail} onOpenChange={setOpenDetail}>
                <DialogContent className="max-w-4xl w-full max-h-[600px] overflow-auto">
                    <div className="flex items-center justify-between">
                        <DialogHeader>
                            <DialogTitle className="font-semibold tracking-tight text-xl text-primary">{topic?.englishName}</DialogTitle>
                            <DialogDescription>{topic?.vietnameseName}</DialogDescription>
                        </DialogHeader>
                        <DownloadDocument topic={topic} />
                    </div>
                    <div className="space-y-4">
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
                                    <div className="grid grid-cols-4 gap-6 text-sm border-b pb-4 mb-4">
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
                                    <div className="space-y-2">
                                        <h3 className="text-sm text-muted-foreground">Description:</h3>
                                        <p className="font-semibold tracking-tight text-justify italic">{topic?.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Users className="size-4 text-primary" />
                                Supervisor(s):
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
                                                <p className="font-semibold"> {topic?.mainSupervisorName}</p>
                                                <p className="text-sm text-muted-foreground">{topic?.mainSupervisorEmail}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                {topic?.coSupervisors?.map((supervisor: any, index) => (
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
                                                        {supervisor?.SupervisorName}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {supervisor?.SupervisorEmail}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
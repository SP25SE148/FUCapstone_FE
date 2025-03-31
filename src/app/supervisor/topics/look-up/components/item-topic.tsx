"use client"

import { useState } from "react";
import { BadgeInfo, BookOpen, BookUser, BriefcaseBusiness, Calendar, FileCheck, PenTool, School, Star, User2, Users } from "lucide-react";

import { Topic } from "@/types/types";
import { getDate } from "@/lib/utils";
import { getTopicDifficulty, getTopicStatus } from "@/utils/statusUtils";

import DownloadDocument from "./download-document";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
                    {getTopicStatus(topic?.status)}
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
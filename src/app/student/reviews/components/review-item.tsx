"use client"

import { useState } from "react"
import { getDate } from "@/lib/utils"
import { CalendarIcon, Clock, MapPin, Users, RotateCw, User2, ChevronUp, ChevronDown } from "lucide-react"

import { ReviewCalendar } from "@/types/types"
import { getReviewCalendarStatus } from "@/utils/statusUtils"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReviewItem({ calendar }: { calendar: ReviewCalendar }) {
    const [showDetail, setShowDetail] = useState<boolean>(false);

    return (
        <Card
            className="cursor-pointer select-none hover:shadow-md transition-all"
            onClick={() => { setShowDetail(!showDetail) }}
        >
            <div className="flex items-center justify-between border-b-[1px] bg-primary/20 rounded-t-xl">
                <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                        <RotateCw className="size-4 text-primary" />
                        <CardTitle className="font-semibold tracking-tight text-xl text-primary">Review {calendar?.attempt}</CardTitle>
                        {getReviewCalendarStatus(calendar?.status)}
                    </div>
                </CardHeader>
                {showDetail ? <ChevronUp className="size-4 text-primary mr-4" /> : <ChevronDown className="size-4 text-primary mr-4" />}
            </div>
            <CardContent className="p-4">
                <div className="grid gap-4">
                    {/* Date and Time Section - Highlighted */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm flex items-center gap-2">
                            <CalendarIcon className="size-4 text-primary" />
                            General Information
                        </h3>
                        <Card className="bg-primary/5">
                            <CardContent className="p-4">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <div className="rounded-md p-2">
                                            <CalendarIcon className="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-muted-foreground">Date</h3>
                                            <p className="font-semibold tracking-tight">
                                                {getDate(calendar?.date)?.split(" ")?.[0]}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="rounded-md p-2">
                                            <Clock className="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-muted-foreground">Time</h3>
                                            <p className="font-semibold tracking-tight">
                                                {calendar?.time}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="rounded-md p-2">
                                            <MapPin className="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-muted-foreground">Room</h3>
                                            <p className="font-semibold tracking-tight">
                                                {calendar?.room}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Reviewers Section */}
                    {showDetail && <div className="space-y-2">
                        <h3 className="font-semibold text-sm flex items-center gap-2">
                            <Users className="size-4 text-primary" />
                            Reviewer(s)
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {calendar?.reviewers?.map((reviewer: string, index: number) => (
                                <Card key={index} className="bg-primary/5">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="size-12 border-2 border-primary">
                                                <AvatarFallback className="bg-primary/10">
                                                    <User2 className="size-6 text-primary" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold text-primary">{reviewer}</p>
                                                <p className="text-sm text-muted-foreground">Reviewer {index + 1}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>}
                </div>
            </CardContent>
        </Card >
    )
}
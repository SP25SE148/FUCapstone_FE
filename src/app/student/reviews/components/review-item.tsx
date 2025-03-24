"use client"

import { getDate } from "@/lib/utils"
import { CalendarIcon, Clock, MapPin, Users, RotateCw, User2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { ReviewCalendar } from "@/contexts/student/student-review-context"

export default function ReviewItem({ calendar }: { calendar: ReviewCalendar }) {
    return (
        <Card className="overflow-hidden border-l-8 border-l-primary hover:shadow-md transition-all">
            <CardHeader className="bg-primary/20 p-2">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <RotateCw className="size-4 text-primary" />
                        <span className="font-bold text-primary">Review {calendar?.attempt}</span>
                    </div>
                    <Badge variant="outline" className="bg-primary text-background font-medium">
                        Room {calendar?.room}
                    </Badge>
                </div>
            </CardHeader>
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
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary text-primary-foreground rounded-lg p-2 flex flex-col items-center justify-center min-w-16 text-center gap-2">
                                        <CalendarIcon className="size-5" />
                                        <div className="text-sm font-bold">{getDate(calendar?.date)?.split(" ")?.[0]}</div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Clock className="size-4 text-primary" />
                                            <span className="font-semibold text-primary">Slot {calendar?.slot}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="size-4 text-primary" />
                                            <span className="font-semibold text-primary">Room {calendar?.room}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Reviewers Section */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm flex items-center gap-2">
                            <Users className="size-4 text-primary" />
                            Reviewer(s)
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {calendar?.reviewersCode?.map((reviewer: string, index: number) => (
                                <Card className="bg-primary/5">
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
                    </div>
                </div>
            </CardContent>
        </Card >
    )
}
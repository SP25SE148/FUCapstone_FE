"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlarmClockMinus, CheckCircle, ChevronDown, ChevronUp, Circle, Clock, Sigma, Undo2 } from "lucide-react"

import { DashBoardTask } from "@/types/types"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard({ data }: { data: DashBoardTask }) {
    const router = useRouter();
    const overallTasks = data?.dashBoardFucTask
    const studentTasks = data?.dashBoardFucTasksStudents
    const [showMore, setShowMore] = useState<boolean>(false);

    return (
        <Card>
            <div className="flex items-center">
                <Button className="ml-6" size={"icon"}
                    onClick={() => router.back()}
                >
                    <Undo2 />
                </Button>
                <div
                    onClick={() => setShowMore(!showMore)}
                    className="flex-1 flex items-center justify-between cursor-pointer"
                >
                    <CardHeader>
                        <CardTitle className="font-semibold tracking-tight text-xl text-primary">Dashboard</CardTitle>
                        <CardDescription>Overall informations</CardDescription>
                    </CardHeader>
                    {showMore ? <ChevronUp className="mr-4" /> : <ChevronDown className="mr-6" />}
                </div>
            </div>
            {showMore && <CardContent className="space-y-4">
                {/* Overall Tasks */}
                <div className="space-y-2">
                    <h2 className="font-semibold tracking-tight text-base">Overall Tasks</h2>
                    <Card className="bg-primary/5">
                        <CardContent className="p-4 space-y-2">
                            <div className="grid grid-cols-5 gap-6 text-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="bg-muted rounded-md p-2">
                                        <Sigma className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">
                                            Total Tasks
                                        </h3>
                                        <p className="font-semibold tracking-tight">{overallTasks.totalTasks}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-muted rounded-md p-2">
                                        <Circle className="size-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">
                                            To Do
                                        </h3>
                                        <p className="font-semibold tracking-tight">{overallTasks.totalToDoTasks}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-muted rounded-md p-2">
                                        <Clock className="size-5 text-amber-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">
                                            In Progress
                                        </h3>
                                        <p className="font-semibold tracking-tight">{overallTasks.totalInprogressTasks}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-muted rounded-md p-2">
                                        <CheckCircle className="size-5 text-green-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">
                                            Completed
                                        </h3>
                                        <p className="font-semibold tracking-tight">{overallTasks.totalDoneTasks}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-muted rounded-md p-2">
                                        <AlarmClockMinus className="size-5 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">
                                            Expired
                                        </h3>
                                        <p className="font-semibold tracking-tight">{overallTasks.totalExpiredTasks}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Student Tasks */}
                {studentTasks?.map((student: any, index: number) => (
                    <div key={index} className="space-y-2">
                        <h2 className="font-semibold tracking-tight text-base   ">Student: {student.studentId}</h2>
                        <Card className="bg-primary/5">
                            <CardContent className="p-4 space-y-2">
                                <div className="grid grid-cols-5 gap-6 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <div className="bg-muted rounded-md p-2">
                                            <Sigma className="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-muted-foreground">
                                                Total Tasks
                                            </h3>
                                            <p className="font-semibold tracking-tight">{student.dashBoardFucTask.totalTasks}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="bg-muted rounded-md p-2">
                                            <Circle className="size-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-muted-foreground">
                                                To Do
                                            </h3>
                                            <p className="font-semibold tracking-tight">{student.dashBoardFucTask.totalToDoTasks}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="bg-muted rounded-md p-2">
                                            <Clock className="size-5 text-amber-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-muted-foreground">
                                                In Progress
                                            </h3>
                                            <p className="font-semibold tracking-tight">{student.dashBoardFucTask.totalInprogressTasks}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="bg-muted rounded-md p-2">
                                            <CheckCircle className="size-5 text-green-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-muted-foreground">
                                                Completed
                                            </h3>
                                            <p className="font-semibold tracking-tight">{student.dashBoardFucTask.totalDoneTasks}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="bg-muted rounded-md p-2">
                                            <AlarmClockMinus className="size-5 text-red-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-muted-foreground">
                                                Expired
                                            </h3>
                                            <p className="font-semibold tracking-tight">{student.dashBoardFucTask.totalExpiredTasks}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </CardContent>}
        </Card>
    )
}


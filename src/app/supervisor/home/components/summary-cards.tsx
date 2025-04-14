"use client"

import { Trophy, AlarmClock, CheckCircle, Clock, ListChecks, Flag } from "lucide-react"

import { useSupervisorDashboard } from "@/contexts/supervisor/supervisor-dashboard-context"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SummaryCards() {
    const { dashboard } = useSupervisorDashboard()

    const lowest = dashboard?.groupWithLowestOverdue
    const highest = dashboard?.groupWithHighestCompletion

    const renderGroupStats = (group: typeof highest | typeof lowest) => {
        if (!group) return null

        return (
            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <div className="flex items-center text-sm font-medium">
                            <ListChecks className="mr-1.5 h-4 w-4 text-muted-foreground" />
                            <span>Total Tasks</span>
                        </div>
                        <p className="text-xl font-semibold">{group.totalTasks}</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center text-sm font-medium">
                            <CheckCircle className="mr-1.5 h-4 w-4 text-emerald-500" />
                            <span>Completed</span>
                        </div>
                        <p className="text-xl font-semibold">{group.completedTasks}</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center text-sm font-medium">
                            <Clock className="mr-1.5 h-4 w-4 text-amber-500" />
                            <span>Overdue</span>
                        </div>
                        <p className="text-xl font-semibold">{group.overdueTasks}</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center text-sm font-medium">
                            <Clock className="mr-1.5 h-4 w-4 text-blue-500" />
                            <span>Avg. Duration</span>
                        </div>
                        <p className="text-xl font-semibold">
                            {group.averageTaskDuration ? `${Number((Number(group.averageTaskDuration) * 24).toFixed(2))} hour(s)` : "N/A"}
                        </p>
                    </div>
                </div>

                {group.priorityDistribution && (
                    <div className="space-y-2 pt-2 border-t border-border">
                        <div className="flex items-center text-sm font-medium">
                            <Flag className="mr-1.5 h-4 w-4 text-muted-foreground" />
                            <span>Priority Distribution</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {Object.entries(group.priorityDistribution).map(([level, count]) => (
                                <div key={level} className="flex items-center gap-4">
                                    <span className="text-sm">{level}:</span>
                                    <span className="font-medium">{String(count)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Best Performing Group */}
            <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-amber-400/40 to-background">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
                    <CardTitle>Best Performing Group</CardTitle>
                    <Trophy className="h-5 w-5 text-amber-500" />
                </CardHeader>
                {highest ?
                    <CardContent className="space-y-4 pt-6">
                        <div className="flex items-end justify-between">
                            <p className="text-2xl font-bold">{highest?.groupCode || "N/A"}</p>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Completion Rate</p>
                                <p className="text-xl font-bold text-emerald-600">
                                    {highest ? `${Math.round(highest.completionTaskRatio * 100)}%` : "N/A"}
                                </p>
                            </div>
                        </div>

                        {highest && (
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-sm">
                                    <span>Progress</span>
                                    <span>
                                        {highest.completedTasks}/{highest.totalTasks} tasks
                                    </span>
                                </div>
                                <Progress
                                    value={(highest.completedTasks / highest.totalTasks) * 100}
                                    className="h-2 bg-amber-100 [&>div]:bg-amber-500"
                                />
                            </div>
                        )}

                        {renderGroupStats(highest)}
                    </CardContent>
                    :
                    <CardContent className="flex flex-col items-center justify-center h-[90%] text-center text-muted-foreground space-y-2">
                        <Trophy className="h-10 w-10 text-amber-300" />
                        <p className="text-sm font-medium">No best performing group yet</p>
                        <p className="text-xs">Once there's data, it will be shown here.</p>
                    </CardContent>}
            </Card>

            {/* Lowest Overdue Group */}
            <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-green-400/40 to-background">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
                    <CardTitle>Lowest Overdue Group</CardTitle>
                    <AlarmClock className="h-5 w-5 text-blue-500" />
                </CardHeader>
                {lowest ?
                    <CardContent className="space-y-4 pt-6">
                        <div className="flex items-end justify-between">
                            <p className="text-2xl font-bold">{lowest?.groupCode || "N/A"}</p>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Overdue Rate</p>
                                <p className="text-xl font-bold text-blue-600">
                                    {lowest ? `${Math.round(lowest.overdueTaskRatio * 100)}%` : "N/A"}
                                </p>
                            </div>
                        </div>

                        {lowest && (
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-sm">
                                    <span>Overdue Tasks</span>
                                    <span>
                                        {lowest.overdueTasks}/{lowest.totalTasks} tasks
                                    </span>
                                </div>
                                <Progress
                                    value={(lowest.overdueTasks / lowest.totalTasks) * 100}
                                    className="h-2 bg-blue-100 [&>div]:bg-blue-500"
                                />
                            </div>
                        )}

                        {renderGroupStats(lowest)}
                    </CardContent>
                    :
                    <CardContent className="flex flex-col items-center justify-center h-[90%] text-center text-muted-foreground space-y-2">
                        <AlarmClock className="h-10 w-10 text-blue-500" />
                        <p className="text-sm font-medium">No lowest overdue group yet</p>
                        <p className="text-xs">Once there's data, it will be shown here.</p>
                    </CardContent>}
            </Card>
        </div>
    )
}

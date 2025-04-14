"use client"

import { Timer } from "lucide-react"
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts"

import { useSupervisorDashboard } from "@/contexts/supervisor/supervisor-dashboard-context"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AverageTaskDurationChart() {
    const { dashboard } = useSupervisorDashboard()

    const durationsData = Object.entries(dashboard?.averageTaskDurations || {}).map(([groupCode, duration]) => ({
        groupCode,
        duration: duration ? Number((Number(duration) * 24).toFixed(2)) : 0, // convert from days to hours
    }))

    const chartConfig = {
        duration: {
            label: "Average",
            color: "hsl(var(--primary))",
        },
    }

    return (
        <Card className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle>Average Task Completion Time</CardTitle>
                    <CardDescription>Unit: hours</CardDescription>
                </div>
                <div className="rounded-full bg-primary/10 p-2">
                    <Timer className="h-5 w-5 text-primary" />
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <ChartContainer config={chartConfig} className="h-[400px] w-full">
                    <BarChart data={durationsData}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="groupCode"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "var(--muted-foreground)" }}
                            tickMargin={8}
                        />
                        <Bar
                            dataKey="duration"
                            fill="var(--color-duration)"
                            radius={[4, 4, 0, 0]}
                            animationDuration={1000}
                            className="transition-all duration-300 hover:opacity-80"
                        />
                        <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "var(--muted)", opacity: 0.1 }} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

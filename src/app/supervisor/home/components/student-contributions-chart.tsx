"use client"

import { Users2 } from "lucide-react"
import { BarChart, Bar, CartesianGrid, XAxis, } from "recharts"

import { useSupervisorDashboard } from "@/contexts/supervisor/supervisor-dashboard-context"

import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, } from "@/components/ui/card"

export default function StudentContributionsChart() {
  const { dashboard } = useSupervisorDashboard()

  const rawData = dashboard?.studentContributions || {}

  const chartData = Object.entries(rawData).map(([studentId, score]) => ({
    studentId,
    contribution: score,
  }))

  const chartConfig = {
    contribution: {
      label: "Contribution",
      color: "hsl(245, 100%, 67%)", // Indigo-ish
    },
  }

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Student Contributions</CardTitle>
          <CardDescription>Within project groups</CardDescription>
        </div>
        <div className="rounded-full bg-cyan-100 p-2 dark:bg-cyan-950/30">
          <Users2 className="h-5 w-5 text-cyan-600" />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="studentId"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              tickMargin={8}
            />
            <Bar
              dataKey="contribution"
              fill="var(--color-contribution)"
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

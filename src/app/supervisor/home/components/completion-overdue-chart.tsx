"use client"

import { Trophy } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { useSupervisorDashboard } from "@/contexts/supervisor/supervisor-dashboard-context"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CompletionOverdueChart() {
  const { dashboard } = useSupervisorDashboard()

  // Merge data from completionTaskRatios and overdueTaskRatios
  const groupCodes = Array.from(
    new Set([
      ...Object.keys(dashboard?.completionTaskRatios || {}),
      ...Object.keys(dashboard?.overdueTaskRatios || {}),
    ]),
  )

  const mergedData = groupCodes.map((code) => ({
    groupCode: code,
    completion: dashboard?.completionTaskRatios?.[code] ?? 0,
    overdue: dashboard?.overdueTaskRatios?.[code] ?? 0,
  }))

  const chartConfig = {
    completion: {
      label: "Completion",
      color: "hsl(142, 76%, 56%)",
    },
    overdue: {
      label: "Overdue",
      color: "hsl(0, 84%, 70%)",
    },
  }

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Completion & Overdue Rate Comparison</CardTitle>
          <CardDescription>Between Groups</CardDescription>
        </div>
        <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-950/30">
          <Trophy className="h-5 w-5 text-amber-500" />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart data={mergedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="groupCode"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)" }}
              tickMargin={8}
            />
            <Bar
              dataKey="completion"
              fill="var(--color-completion)"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
              className="transition-all duration-300 hover:opacity-80"
            />
            <Bar
              dataKey="overdue"
              fill="var(--color-overdue)"
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

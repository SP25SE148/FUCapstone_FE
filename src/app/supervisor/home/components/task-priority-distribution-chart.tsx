"use client";

import { AlertTriangle } from "lucide-react";
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";

import { useSupervisorDashboard } from "@/contexts/supervisor/supervisor-dashboard-context";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// Define the type for the distribution object
interface TaskPriorityDistribution {
  High: number;
  Medium: number;
  Low: number;
}

// Define the chart config type
const chartConfig = {
  High: {
    label: "High",
    color: "#ef4444", // red
  },
  Medium: {
    label: "Medium",
    color: "#facc15", // yellow
  },
  Low: {
    label: "Low",
    color: "#10b981", // green
  },
};

export default function TaskPriorityDistributionChart() {
  const { dashboard } = useSupervisorDashboard();

  // Explicitly type the rawData as an object with groupCode as the key and TaskPriorityDistribution as the value
  const rawData: Record<string, TaskPriorityDistribution> = dashboard?.taskPriorityDistributions || {};

  // Use keyof typeof chartConfig to ensure that the keys are restricted to "High", "Medium", or "Low"
  const priorityLevels: (keyof typeof chartConfig)[] = ["High", "Medium", "Low"];

  const chartData = Object.entries(rawData).map(([groupCode, distribution]) => ({
    groupCode,
    High: distribution?.High || 0,
    Medium: distribution?.Medium || 0,
    Low: distribution?.Low || 0,
  }));

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Task Priority Distribution</CardTitle>
          <CardDescription>By Group</CardDescription>
        </div>
        <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-950/30">
          <AlertTriangle className="h-6 w-6 text-orange-500" />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="groupCode"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)" }}
              tickMargin={8}
            />
            {priorityLevels.map((level) => (
              <Bar
                key={level}
                dataKey={level}
                fill={chartConfig[level].color}
                name={chartConfig[level].label}
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
            <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "var(--muted)", opacity: 0.1 }} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

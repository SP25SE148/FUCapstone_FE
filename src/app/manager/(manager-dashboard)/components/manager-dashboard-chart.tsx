"use client";

import React from "react";
import { Label, Pie, PieChart } from "recharts";
import { FileCheck, UserPen } from "lucide-react";

import { useManagerDashboard } from "@/contexts/manager/manager-dashboard-context";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export default function ManagerDashBoardCharts() {
  const { dashboard } = useManagerDashboard();

  // topicsPerSupervisorChart
  const topicsPerSupervisorPieConfig: ChartConfig = React.useMemo(() => {
    const colors = [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
    ];

    const raw = dashboard?.topicsPerSupervisor as Record<string, number> || {};
    const supervisors = Object.keys(raw);

    return supervisors.reduce((acc, supervisor, index) => {
      acc[supervisor] = {
        label: supervisor,
        color: colors[index % colors.length],
      };
      return acc;
    }, {} as ChartConfig);
  }, [dashboard?.topicsPerSupervisor]);

  const topicsPerSupervisorPieData = React.useMemo(() => {
    const raw = dashboard?.topicsPerSupervisor as Record<string, number> || {};
    return Object.entries(raw).map(([supervisor, count]) => ({
      supervisor,
      value: count,
      fill: topicsPerSupervisorPieConfig[supervisor]?.color || "hsl(var(--muted))",
    }));
  }, [dashboard?.topicsPerSupervisor, topicsPerSupervisorPieConfig]);

  const hasMeaningfultopicsPerSupervisorPieData = topicsPerSupervisorPieData.some(
    (item) => item.value !== 0
  )

  const totalTopicsPerSupervisor = React.useMemo(() => {
    return topicsPerSupervisorPieData.reduce((acc, curr) => acc + curr.value, 0);
  }, [topicsPerSupervisorPieData]);

  // topicsChart
  const topicsPieData = [
    { status: "Pending", topics: dashboard?.topicsInEachStatus?.Pending || 0, fill: "var(--color-Pending)" },
    { status: "Approved", topics: dashboard?.topicsInEachStatus?.Approved || 0, fill: "var(--color-Approved)" },
    { status: "Considered", topics: dashboard?.topicsInEachStatus?.Considered || 0, fill: "var(--color-Considered)" },
    { status: "Rejected", topics: dashboard?.topicsInEachStatus?.Rejected || 0, fill: "var(--color-Rejected)" },
  ];

  const hasMeaningfultopicsPieData = topicsPieData.some(
    (item) => item.topics !== 0
  )

  const topicsPieConfig = {
    topics: {
      label: "Topics",
    },
    Pending: {
      label: "Pending",
      color: "hsl(var(--chart-1))",
    },
    Approved: {
      label: "Approved",
      color: "hsl(var(--chart-2))",
    },
    Considered: {
      label: "Considered",
      color: "hsl(var(--chart-3))",
    },
    Rejected: {
      label: "Rejected",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  const totalTopics = React.useMemo(() => {
    return topicsPieData.reduce((acc, curr) => acc + curr.topics, 0);
  }, [topicsPieData]);

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Topic Per Supervisor Overview</CardTitle>
          <CardDescription>In this semester</CardDescription>
        </CardHeader>
        {hasMeaningfultopicsPerSupervisorPieData
          ?
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={topicsPerSupervisorPieConfig}
              className="mx-auto aspect-square max-h-[350px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={topicsPerSupervisorPieData}
                  dataKey="value"
                  nameKey="supervisor"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalTopicsPerSupervisor.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Total
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          :
          <CardContent className="flex flex-col items-center justify-center h-[350px] text-center text-muted-foreground space-y-2">
            <UserPen className="h-10 w-10 text-primary" />
            <p className="text-sm font-medium">No data yet</p>
            <p className="text-xs">Once there's data, it will be shown here.</p>
          </CardContent>}
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Topic(s) Overview</CardTitle>
          <CardDescription>In this semester</CardDescription>
        </CardHeader>
        {hasMeaningfultopicsPieData
          ?
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={topicsPieConfig}
              className="mx-auto aspect-square max-h-[350px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={topicsPieData}
                  dataKey="topics"
                  nameKey="status"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalTopics.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Topic(s)
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          :
          <CardContent className="flex flex-col items-center justify-center h-[350px] text-center text-muted-foreground space-y-2">
            <FileCheck className="h-10 w-10 text-primary" />
            <p className="text-sm font-medium">No data yet</p>
            <p className="text-xs">Once there's data, it will be shown here.</p>
          </CardContent>}
      </Card>
    </div>
  );
}
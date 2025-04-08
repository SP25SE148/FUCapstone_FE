"use client";

import React from "react";
import { Label, Pie, PieChart } from "recharts";

import { useManagerDashboard } from "@/contexts/manager/manager-dashboard-context";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export default function ManagerDashBoardCharts() {
  const { dashboard } = useManagerDashboard();

  // supervisorsStudentsChart
  const supervisorsStudentsPieData = [
    { role: "Supervisors", value: dashboard?.supervisors || 0, fill: "var(--color-Supervisors)" },
    { role: "Students", value: dashboard?.students || 0, fill: "var(--color-Students)" },
  ];

  const supervisorsStudentsPieConfig = {
    Supervisors: {
      label: "Supervisors",
      color: "hsl(var(--chart-1))",
    },
    Students: {
      label: "Students",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const totalSupervisorsStudents = React.useMemo(() => {
    return supervisorsStudentsPieData.reduce((acc, curr) => acc + curr.value, 0);
  }, [supervisorsStudentsPieData]);

  // topicsChart
  const topicsPieData = [
    { status: "Pending", topics: dashboard?.topicsInEachStatus?.Pending || 0, fill: "var(--color-Pending)" },
    { status: "Approved", topics: dashboard?.topicsInEachStatus?.Approved || 0, fill: "var(--color-Approved)" },
    { status: "Considered", topics: dashboard?.topicsInEachStatus?.Considered || 0, fill: "var(--color-Considered)" },
    { status: "Rejected", topics: dashboard?.topicsInEachStatus?.Rejected || 0, fill: "var(--color-Rejected)" },
  ];

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
          <CardTitle>Supervisors - Students Overview</CardTitle>
          <CardDescription>In this semester</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={supervisorsStudentsPieConfig}
            className="mx-auto aspect-square max-h-[350px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={supervisorsStudentsPieData}
                dataKey="value"
                nameKey="role"
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
                            {totalSupervisorsStudents.toLocaleString()}
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
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Topic(s) Overview</CardTitle>
          <CardDescription>In this semester</CardDescription>
        </CardHeader>
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
      </Card>
    </div>
  );
}
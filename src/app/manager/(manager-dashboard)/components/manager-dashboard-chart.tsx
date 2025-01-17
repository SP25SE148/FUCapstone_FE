"use client";

import React from "react";

import { Bar, BarChart, CartesianGrid, Label, Pie, PieChart, XAxis, } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart";

export default function ManagerDashBoardCharts() {
  const supervisorsStudentsData = [
    { semester: "Spring", supervisors: 20, students: 350 },
    { semester: "Summer", supervisors: 20, students: 400 },
    { semester: "Fall", supervisors: 20, students: 400 },
  ];

  const topicsData = [
    { status: "Assigned", topics: 100, fill: "var(--color-Assigned)" },
    { status: "Available", topics: 20, fill: "var(--color-Available)" },
  ];

  const chartConfig = {
    supervisors: {
      label: "Supervisors",
      color: "hsl(var(--chart-1))",
    },
    students: {
      label: "Students",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const piechartConfig = {
    topics: {
      label: "Topics",
    },
    Assigned: {
      label: "Assigned",
      color: "hsl(var(--chart-2))",
    },
    Available: {
      label: "Available",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  const totalTopics = React.useMemo(() => {
    return topicsData.reduce((acc, curr) => acc + curr.topics, 0);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Supervisors - Students</CardTitle>
          <CardDescription>Year 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={supervisorsStudentsData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="semester"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="supervisors" fill="var(--color-supervisors)" radius={4} />
              <Bar dataKey="students" fill="var(--color-students)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Topic(s) Overview</CardTitle>
          <CardDescription>in this semester</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={piechartConfig}
            className="mx-auto aspect-square max-h-[350px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={topicsData}
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
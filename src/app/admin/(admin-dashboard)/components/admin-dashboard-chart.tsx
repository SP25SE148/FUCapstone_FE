"use client";

import React from "react";

import { Bar, BarChart, CartesianGrid, Label, Pie, PieChart, XAxis, } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart";

export default function AdminDashBoardCharts() {
  const supervisorsStudentsData = [
    { semester: "Spring", supervisors: 80, students: 700 },
    { semester: "Summer", supervisors: 90, students: 800 },
    { semester: "Fall", supervisors: 100, students: 900 },
  ];

  const supervisortData = [
    { major: "IT", supervisors: 40, fill: "var(--color-IT)" },
    { major: "IB", supervisors: 21, fill: "var(--color-IB)" },
    { major: "MC", supervisors: 19, fill: "var(--color-MC)" },
    { major: "GD", supervisors: 20, fill: "var(--color-GD)" },
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
    supervisors: {
      label: "Supervisors",
    },
    IT: {
      label: "IT",
      color: "hsl(var(--chart-2))",
    },
    IB: {
      label: "IB",
      color: "hsl(var(--chart-3))",
    },
    MC: {
      label: "MC",
      color: "hsl(var(--chart-4))",
    },
    GD: {
      label: "GD",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const totalSupervisorss = React.useMemo(() => {
    return supervisortData.reduce((acc, curr) => acc + curr.supervisors, 0);
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
          <CardTitle>Supervisor(s) Overview</CardTitle>
          <CardDescription>Year 2024</CardDescription>
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
                data={supervisortData}
                dataKey="supervisors"
                nameKey="major"
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
                            {totalSupervisorss.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Supervisor(s)
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
"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, Label, Pie, PieChart, XAxis, } from "recharts";

import { useSuperadminDashboard } from "@/contexts/superadmin/superadmin-dashboard-context";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart";
import { ChartColumn, UserPen } from "lucide-react";

export default function DashBoardCharts() {
  const { dashboard } = useSuperadminDashboard();

  // Topic Group Chart
  const chartConfig = {
    topic: {
      label: "Topic",
      color: "#7e22ce",
    },
    group: {
      label: "Group",
      color: "#a855f7",
    },
  } satisfies ChartConfig;

  const topicGroupPerCampusData = React.useMemo(() => {
    const raw = dashboard?.dataPerCampus as Record<
      string,
      { students: number; supervisors: number; topics: number; groups: number }
    > ?? {};

    return Object.entries(raw).map(([campus, value]) => ({
      campus,
      topic: value.topics,
      group: value.groups,
    }));
  }, [dashboard?.dataPerCampus]);

  const hasMeaningfulTopicGroupChartData = topicGroupPerCampusData.some(
    (item) => item?.topic !== 0 || item?.group !== 0
  )

  // PieChart Config
  const generateChartConfig = (keys: string[]): ChartConfig => {
    const colors = [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
    ];

    return keys.reduce((acc, key, index) => {
      acc[key] = {
        label: key,
        color: colors[index % colors.length],
      };
      return acc;
    }, {} as ChartConfig);
  };

  // Supervisor Chart
  const supervisorsPerCampusConfig: ChartConfig = React.useMemo(() => {
    const raw = dashboard?.dataPerCampus as Record<string, number> || {};
    return generateChartConfig(Object.keys(raw));
  }, [dashboard?.dataPerCampus]);

  const supervisorsPerCampusData = React.useMemo(() => {
    const raw = dashboard?.dataPerCampus || {};

    return Object.entries(raw).map(([campus, value]) => {
      const campusData = value as {
        students: number;
        supervisors: number;
        topics: number;
        groups: number;
      };

      return {
        campus,
        value: campusData.supervisors,
        fill: supervisorsPerCampusConfig[campus]?.color || "hsl(var(--muted))",
      };
    });
  }, [dashboard?.dataPerCampus, supervisorsPerCampusConfig]);

  const hasMeaningfulSupervisorChartData = supervisorsPerCampusData.some(
    (item) => item?.value !== 0
  )

  const totalSupervisors = React.useMemo(() => {
    return supervisorsPerCampusData.reduce((acc, curr) => acc + curr.value, 0);
  }, [supervisorsPerCampusData]);

  // Student Chart
  const studentsPerCampusConfig: ChartConfig = React.useMemo(() => {
    const raw = dashboard?.dataPerCampus as Record<string, number> || {};
    return generateChartConfig(Object.keys(raw));
  }, [dashboard?.dataPerCampus]);

  const studentsPerCampusData = React.useMemo(() => {
    const raw = dashboard?.dataPerCampus || {};

    return Object.entries(raw).map(([campus, value]) => {
      const campusData = value as {
        students: number;
        supervisors: number;
        topics: number;
        groups: number;
      };

      return {
        campus,
        value: campusData.students,
        fill: studentsPerCampusConfig[campus]?.color || "hsl(var(--muted))",
      };
    });
  }, [dashboard?.dataPerCampus, studentsPerCampusConfig]);

  const hasMeaningfulStudentChartData = studentsPerCampusData.some(
    (item) => item?.value !== 0
  )

  const totalStudents = React.useMemo(() => {
    return studentsPerCampusData.reduce((acc, curr) => acc + curr.value, 0);
  }, [studentsPerCampusData]);

  return (
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
      {/* topics/groups chart */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Topics & Groups per Campus</CardTitle>
          <CardDescription>In this semester</CardDescription>
        </CardHeader>
        {hasMeaningfulTopicGroupChartData
          ?
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart accessibilityLayer data={topicGroupPerCampusData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="campus"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="topic" fill={chartConfig.topic.color} radius={4} />
                <Bar dataKey="group" fill={chartConfig.group.color} radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          :
          <CardContent className="flex flex-col items-center justify-center h-[350px] text-center text-muted-foreground space-y-2">
            <ChartColumn className="h-10 w-10 text-primary" />
            <p className="text-sm font-medium">No data yet</p>
            <p className="text-xs">Once there's data, it will be shown here.</p>
          </CardContent>}
      </Card>

      {/* Pie Chart 1: Supervisors */}
      <Card>
        <CardHeader>
          <CardTitle>Supervisors Overview</CardTitle>
          <CardDescription>In this semester</CardDescription>
        </CardHeader>
        {hasMeaningfulSupervisorChartData
          ?
          <CardContent>
            <ChartContainer
              config={supervisorsPerCampusConfig}
              className="mx-auto aspect-square max-h-[350px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={supervisorsPerCampusData}
                  dataKey="value"
                  nameKey="campus"
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
                              {totalSupervisors?.toLocaleString()}
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
          :
          <CardContent className="flex flex-col items-center justify-center h-[350px] text-center text-muted-foreground space-y-2">
            <UserPen className="h-10 w-10 text-primary" />
            <p className="text-sm font-medium">No data yet</p>
            <p className="text-xs">Once there's data, it will be shown here.</p>
          </CardContent>}
      </Card>

      {/* Pie Chart 2: Students */}
      <Card>
        <CardHeader>
          <CardTitle>Students Overview</CardTitle>
          <CardDescription>In this semester</CardDescription>
        </CardHeader>
        {hasMeaningfulStudentChartData
          ?
          <CardContent>
            <ChartContainer
              config={studentsPerCampusConfig}
              className="mx-auto aspect-square max-h-[350px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={studentsPerCampusData}
                  dataKey="value"
                  nameKey="campus"
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
                              {totalStudents?.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Student(s)
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
    </div>
  );
}

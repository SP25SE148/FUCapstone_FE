"use client";

import React from "react";
import { Label, Pie, PieChart } from "recharts";

import { useAdminDashboard } from "@/contexts/admin/admin-dashboard-context";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export default function AdminDashBoardCharts() {
  const { dashboard } = useAdminDashboard();

  // SupervisorsChart
  const supervisorsInEachMajorConfig: ChartConfig = React.useMemo(() => {
    const colors = [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
    ];

    const raw = dashboard?.supervisorsInEachMajor as Record<string, number> || {};
    const majors = Object.keys(raw);

    return majors.reduce((acc, major, index) => {
      acc[major] = {
        label: major,
        color: colors[index % colors.length],
      };
      return acc;
    }, {} as ChartConfig);
  }, [dashboard?.supervisorsInEachMajor]);

  const supervisorsInEachMajorData = React.useMemo(() => {
    const raw = dashboard?.supervisorsInEachMajor as Record<string, number> || {};
    return Object.entries(raw).map(([major, count]) => ({
      major,
      value: count,
      fill: supervisorsInEachMajorConfig[major]?.color || "hsl(var(--muted))",
    }));
  }, [dashboard?.supervisorsInEachMajor, supervisorsInEachMajorConfig]);

  const totalSupervisors = React.useMemo(() => {
    return supervisorsInEachMajorData.reduce((acc, curr) => acc + curr?.value, 0);
  }, [supervisorsInEachMajorData]);

  // TopicsChart
  const topicsInEachCapstoneConfig: ChartConfig = React.useMemo(() => {
    const colors = [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
    ];

    const raw = dashboard?.topicsInEachCapstone as Record<string, number> || {};
    const capstones = Object.keys(raw);

    return capstones.reduce((acc, capstone, index) => {
      acc[capstone] = {
        label: capstone,
        color: colors[index % colors.length],
      };
      return acc;
    }, {} as ChartConfig);
  }, [dashboard?.topicsInEachCapstone]);

  const topicsInEachCapstoneData = React.useMemo(() => {
    const raw = dashboard?.topicsInEachCapstone as Record<string, number> || {};
    return Object.entries(raw).map(([capstone, count]) => ({
      capstone,
      value: count,
      fill: topicsInEachCapstoneConfig[capstone]?.color || "hsl(var(--muted))",
    }));
  }, [dashboard?.topicsInEachCapstone, topicsInEachCapstoneConfig]);

  const totalTopics = React.useMemo(() => {
    return topicsInEachCapstoneData.reduce((acc, curr) => acc + curr.value, 0);
  }, [topicsInEachCapstoneData]);

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {/* Supervisors Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Supervisors by Major</CardTitle>
          <CardDescription>In this semester</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={supervisorsInEachMajorConfig}
            className="mx-auto aspect-square max-h-[350px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={supervisorsInEachMajorData}
                dataKey="value"
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
      </Card>

      {/* Topics Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Topic(s) Overview</CardTitle>
          <CardDescription>In this semester</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={topicsInEachCapstoneConfig}
            className="mx-auto aspect-square max-h-[350px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={topicsInEachCapstoneData}
                dataKey="value"
                nameKey="capstone"
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
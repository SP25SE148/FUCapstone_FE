"use client";
import React from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  XAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function DashBoardCharts() {
  const topicgroupData = [
    { name: "Ho Chi Minh", shortName: "HCM", topic: 401, group: 120 },
    { name: "Hoa Lac", shortName: "HL", topic: 398, group: 122 },
    { name: "Da Nang", shortName: "DN", topic: 190, group: 80 },
    { name: "Quy Nho", shortName: "QN", topic: 200, group: 76 },
    { name: "Can Tho", shortName: "CT", topic: 122, group: 67 },
  ];

  const supervisortData = [
    { campus: "Ho Chi Minh", supervisor: 80, fill: "var(--color-HCM)" },
    { campus: "Hoa Lac", supervisor: 83, fill: "var(--color-HL)" },
    { campus: "Da Nang", supervisor: 63, fill: "var(--color-DN)" },
    { campus: "Quy Nhon", supervisor: 34, fill: "var(--color-QN)" },
    { campus: "Can Tho", supervisor: 44, fill: "var(--color-CT)" },
  ];
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

  const piechartConfig = {
    supervisorts: {
      label: "Supervisor",
    },
    HCM: {
      label: "Ho Chi Minh",
      color: "#86efac",
    },
    HL: {
      label: "HL",
      color: "#fcd34d",
    },
    DN: {
      label: "DN",
      color: "#d8b4fe",
    },
    QN: {
      label: "QN",
      color: "#93c5fd",
    },
    CT: {
      label: "CT",
      color: "#fca5a5",
    },
  } satisfies ChartConfig;

  const totalSupervisorss = React.useMemo(() => {
    return supervisortData.reduce((acc, curr) => acc + curr.supervisor, 0);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Topics/Groups this semester</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={topicgroupData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="shortName"
                tickLine={true}
                tickMargin={10}
                axisLine={true}
                tickFormatter={(value) => {
                  const campus = topicgroupData.find(
                    (item) => item.shortName === value
                  );
                  return campus ? campus.name : value;
                }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="topic" fill="var(--color-topic)" radius={4} />
              <Bar dataKey="group" fill="var(--color-group)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Supervisor Overview</CardTitle>
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
                dataKey="supervisor"
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
                            {totalSupervisorss.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Supervisor
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

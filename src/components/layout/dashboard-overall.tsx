"use client";

import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardOverall({
  items,
}: {
  items: {
    title: string;
    stat: number;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items?.map((item, index) => (
        <Card key={index}>
          <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="tracking-tight text-sm font-medium">
              {item.title}
            </CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {item.stat.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

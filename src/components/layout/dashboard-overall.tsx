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
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items?.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-m font-medium">
                {item.title}
              </CardTitle>
              <div className="h-3 w-3 text-muted-foreground">
                <item.icon />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {item.stat.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

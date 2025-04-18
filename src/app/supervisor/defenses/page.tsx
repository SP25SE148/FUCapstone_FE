"use client";

import { Calendar } from "lucide-react";
import { useState, useEffect } from "react";

import { cn, getDateNoTime } from "@/lib/utils";
import { useSupervisorDefense } from "@/contexts/supervisor/supervisor-defense-context";

import { columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DefensesPage() {
  const { defenseCalendar } = useSupervisorDefense();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const defenseDates = Object.keys(defenseCalendar || {}).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  useEffect(() => {
    if (defenseDates.length > 0 && !activeTab) {
      setActiveTab(defenseDates[0]);
    }
  }, [defenseDates, activeTab]);

  return (
    <Card className="min-h-[calc(100vh-60px)]">
      <CardHeader>
        <CardTitle className="font-semibold tracking-tight text-xl text-primary">
          Defenses
        </CardTitle>
        <CardDescription>Defenses schedule and information.</CardDescription>
      </CardHeader>
      {defenseDates.length > 0 ?
        <CardContent>
          <Tabs
            defaultValue={defenseDates[0]}
            value={activeTab || defenseDates[0]}
            onValueChange={setActiveTab}
          >
            <div className="mb-6">
              <TabsList className="w-full h-auto justify-start overflow-x-auto gap-6">
                {defenseDates.map((date) => (
                  <TabsTrigger
                    key={date}
                    value={date}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none",
                      "data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-primary font-medium"
                    )}
                  >
                    <Calendar className="h-4 w-4" />
                    {getDateNoTime(date)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {defenseDates.map((date) => (
              <TabsContent key={date} value={date}>
                {defenseCalendar && defenseCalendar[date] && (
                  <DataTable columns={columns} data={defenseCalendar[date]} />
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        :
        <CardContent className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)]">
          <div className="h-full flex flex-col items-center justify-center gap-8">
            <Calendar className="size-20 text-primary" />
            <div className="space-y-2">
              <p className="text-xl font-bold text-center text-primary">
                No defense schedules available.
              </p>
              <p className="text-muted-foreground text-center text-sm">
                Defense schedules will appear here when they become available.
              </p>
            </div>
          </div>
        </CardContent>}
    </Card >
  );
}

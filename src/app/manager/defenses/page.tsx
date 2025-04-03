"use client";

import { columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useManagerDefense } from "@/contexts/manager/manager-defense-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { cn, getDateNoTime } from "@/lib/utils";
import UploadDefenseCalendar from "@/app/manager/defenses/components/upload-defense-calendar";
import { Calendar } from "lucide-react";

export default function DefensesPage() {
  const { defenseCalendar } = useManagerDefense();
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
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle className="font-semibold tracking-tight text-xl text-primary">
            Defenses
          </CardTitle>
          <CardDescription>Defense schedule and information.</CardDescription>
        </CardHeader>
        <UploadDefenseCalendar />
      </div>
      <CardContent>
        {defenseDates.length > 0 ? (
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
        ) : (
          <div className="text-center py-8">
            <p>No defense schedules available.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

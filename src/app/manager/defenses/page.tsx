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
import { useState } from "react";
import { getDate } from "@/lib/utils";
import UploadDefenseCalendar from "@/app/manager/defenses/components/upload-defense-calendar";

export default function DefensesPage() {
  const { defenseCalendar } = useManagerDefense();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const defenseDates = Object.keys(defenseCalendar || {}).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  if (defenseDates.length > 0 && !activeTab) {
    setActiveTab(defenseDates[0]);
  }

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
            <TabsList className="mb-4">
              {defenseDates.map((date) => (
                <TabsTrigger key={date} value={date}>
                  {getDate(date)}
                </TabsTrigger>
              ))}
            </TabsList>

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
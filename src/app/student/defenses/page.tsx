"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getDate } from "@/lib/utils";
import { useStudentDefense } from "@/contexts/student/student-defense-context";

export default function DefensesPage() {
  const { defenseCalendar } = useStudentDefense();

  return (
    <Card className="min-h-[calc(100vh-60px)]">
      <CardHeader>
        <CardTitle className="font-semibold tracking-tight text-xl text-primary">Defenses</CardTitle>
        <CardDescription className="mt-2 space-y-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <div className="flex items-start gap-2">
            <CalendarIcon className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-amber-700 text-base">Important Notes:</p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li className="text-amber-600 font-medium">
                  Students must be present at the exam location 30 minutes in advance
                </li>
                <li className="text-amber-600 font-medium">Prepare necessary equipment for the presentation</li>
                <li className="text-amber-600 font-medium">Dress appropriately</li>
              </ul>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.keys(defenseCalendar || {})
            .sort((a, b) => new Date(a).getTime() - new Date(b).getTime()) 
            .map((date) => (
              <div key={date} className="space-y-4">
                <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  {getDate(date)}
                </h2>

                {defenseCalendar[date].map((defense: any) => (
                  <div key={defense.id} className="border rounded-md overflow-hidden">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex-1">
                        <div className="font-medium">{defense.capstoneId}</div>
                        <div className="text-xs text-muted-foreground">Course</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{defense.location}</div>
                        <div className="text-xs text-muted-foreground">Room</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">
                          {defense.defendAttempt === 1 ? "Defense" : "2nd Defense"}
                        </div>
                        <div className="text-xs text-muted-foreground">Type</div>
                      </div>
                      <div className="flex-1 p-2 rounded-md">
                        <div className="font-medium text-primary flex items-center">
                          <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                          {getDate(defense.defenseDate)}
                        </div>
                        <div className="text-xs text-muted-foreground">Date</div>
                      </div>
                      <div className="flex-1">
                        <Badge
                          variant={defense.status === "Finished" ? "outline" : "destructive"}
                          className={
                            defense.status === "Finished"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-red-100 text-red-700 border-red-200"
                          }
                        >
                          {defense.status === "Finished" ? "Finished" : "Not yet"}
                        </Badge>
                        <div className="text-xs text-muted-foreground">Status</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
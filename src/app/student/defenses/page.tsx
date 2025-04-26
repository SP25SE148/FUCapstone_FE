"use client"

import { CalendarIcon, Clock, MapPin, AlertTriangle } from "lucide-react"

import { DefenseCalendarItem } from "@/types/types"
import { useStudentDefense } from "@/contexts/student/student-defense-context"

import { getDateNoTime } from "@/lib/utils"
import { getDefenseCalendarStatus } from "@/utils/statusUtils"

import NoResult from "@/app/student/defenses/components/no-result"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DefensesPage() {
  const { defenseCalendar } = useStudentDefense()

  return (
    <Card className="min-h-[calc(100vh-60px)] shadow-md border-muted/40">
      <CardHeader className="pb-4">
        <CardTitle className="font-semibold tracking-tight text-xl text-primary flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Defense Calendar
        </CardTitle>
        <CardDescription className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200 rounded-lg shadow-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-medium text-amber-800 text-base">Important Notes:</p>
              <ul className="list-disc pl-5 text-sm space-y-2">
                <li className="text-amber-700">
                  Students must be present at the exam location{" "}
                  <span className="font-semibold">30 minutes in advance</span>
                </li>
                <li className="text-amber-700">Prepare necessary equipment for the presentation</li>
                <li className="text-amber-700">Dress appropriately for a professional setting</li>
              </ul>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!defenseCalendar || defenseCalendar.length === 0 ? (
            <NoResult />
          ) : (
            defenseCalendar?.map((defense: DefenseCalendarItem) => (
              <div key={defense.id} className="space-y-1">
                <h2 className="text-lg font-semibold text-primary flex items-center gap-2 px-2 py-1 bg-primary/5 rounded-md">
                  <CalendarIcon className="h-4 w-4" />
                  {getDateNoTime(defense.defenseDate)}
                </h2>

                <div
                  key={defense?.id}
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="bg-gradient-to-r from-primary/5 to-transparent p-5">
                    <div className="grid grid-cols-2 sm:grid-cols-5 justify-between items-center">
                      <div className="flex-1 mx-1 space-y-1">
                        <div className="text-xs text-muted-foreground font-medium capitalize">Location</div>
                        <div className="font-medium flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="truncate">{defense?.location}</span>
                        </div>
                      </div>

                      <div className="flex-1 mx-1 space-y-1">
                        <div className="text-xs text-muted-foreground font-medium capitalize">Type</div>
                        <div className="font-medium flex items-center gap-1.5">
                          <span className="truncate">
                            {defense?.defendAttempt === 1 ? "1st Defense" : "2nd Defense"}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 mx-1 space-y-1">
                        <div className="text-xs text-muted-foreground font-medium capitalize">Date</div>
                        <div className="font-medium flex items-center gap-1.5 text-primary">
                          <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{getDateNoTime(defense.defenseDate)}</span>
                        </div>
                      </div>

                      <div className="flex-1 mx-1 space-y-1">
                        <div className="text-xs text-muted-foreground font-medium capitalize">Time</div>
                        <div className="font-medium flex items-center gap-1.5 text-primary">
                          <Clock className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{defense.time}</span>
                        </div>
                      </div>

                      <div className="flex-1 mx-1 space-y-1">
                        <div className="text-xs text-muted-foreground font-medium capitalize">Status</div>
                        <div>{getDefenseCalendarStatus(defense.status)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}


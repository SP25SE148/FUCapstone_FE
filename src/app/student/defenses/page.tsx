"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarIcon,
  Clock,
  MapPin,
  User,
  AlertTriangle,
  CheckCircle,
  Loader,
  TimerReset,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getDateNoTime } from "@/lib/utils";
import { useStudentDefense } from "@/contexts/student/student-defense-context";
import { Separator } from "@/components/ui/separator";

export default function DefensesPage() {
  const { defenseCalendar } = useStudentDefense();

  // Function to sort council members (President first, then Secretary, then others)
  function getSortedCouncilMembers(councilMembers) {
    if (!councilMembers) return [];
    return [...councilMembers].sort((a, b) => {
      if (a.isPresident) return -1;
      if (b.isPresident) return 1;
      if (a.isSecretary) return -1;
      if (b.isSecretary) return 1;
      return 0;
    });
  }

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
              <p className="font-medium text-amber-800 text-base">
                Important Notes:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-2">
                <li className="text-amber-700">
                  Students must be present at the exam location{" "}
                  <span className="font-semibold">30 minutes in advance</span>
                </li>
                <li className="text-amber-700">
                  Prepare necessary equipment for the presentation
                </li>
                <li className="text-amber-700">
                  Dress appropriately for a professional setting
                </li>
              </ul>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {defenseCalendar?.map((defense: any) => (
            <div key={defense.defenseDate} className="space-y-1">
              <h2 className="text-lg font-semibold text-primary flex items-center gap-2 px-2 py-1 bg-primary/5 rounded-md">
                <CalendarIcon className="h-4 w-4" />
                {getDateNoTime(defense.defenseDate)}
              </h2>

              <div
                key={defense?.id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="bg-gradient-to-r from-primary/5 to-transparent p-5">
                  <div className="flex flex-nowrap justify-between items-center">
                    <div className="flex-1 mx-1 space-y-1">
                      <div className="text-xs text-muted-foreground font-medium capitalize">
                        Location
                      </div>
                      <div className="font-medium flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="truncate">{defense?.location}</span>
                      </div>
                    </div>

                    <div className="flex-1 mx-1 space-y-1">
                      <div className="text-xs text-muted-foreground font-medium capitalize">
                        Type
                      </div>
                      <div className="font-medium flex items-center gap-1.5">
                        <span className="truncate">
                          {defense?.defendAttempt === 1
                            ? "1st Defense"
                            : "2nd Defense"}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 mx-1 space-y-1">
                      <div className="text-xs text-muted-foreground font-medium capitalize">
                        Date
                      </div>
                      <div className="font-medium flex items-center gap-1.5 text-primary">
                        <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">
                          {getDateNoTime(defense.defenseDate)}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 mx-1 space-y-1">
                      <div className="text-xs text-muted-foreground font-medium capitalize">
                        Slot
                      </div>
                      <div className="font-medium flex items-center gap-1.5 text-primary">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{defense.slot}</span>
                      </div>
                    </div>

                    <div className="flex-1 mx-1 space-y-1">
                      <div className="text-xs text-muted-foreground font-medium capitalize">
                        Status
                      </div>
                      <div>
                        {defense?.status === "Done" ? (
                          <div className="flex items-center gap-1.5">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200 font-medium"
                            >
                              Done
                            </Badge>
                          </div>
                        ) : defense?.status === "InProgress" ? (
                          <div className="flex items-center gap-1.5">
                            <Loader className="h-4 w-4 text-blue-600 animate-spin flex-shrink-0" />
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200 font-medium"
                            >
                              In Progress
                            </Badge>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <TimerReset className="h-4 w-4 text-red-600 flex-shrink-0" />
                            <Badge
                              variant="outline"
                              className="bg-red-50 text-red-700 border-red-200 font-medium"
                            >
                              Not Started
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="p-5 bg-muted/5">
                  <h3 className="text-sm font-medium flex items-center gap-1.5 mb-4 text-primary">
                    <User className="h-4 w-4" />
                    Council Members
                  </h3>
                  <div className="flex flex-nowrap justify-between items-center">
                    {getSortedCouncilMembers(defense.councilMembers).map(
                      (member) => (
                        <div
                          key={member.id}
                          className="flex-1 mx-1 flex items-center gap-2 p-3 rounded-md bg-background border border-muted/60 shadow-sm"
                        >
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            <User className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">
                              {member.supervisorName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {member.isPresident ? (
                                <Badge
                                  variant="outline"
                                  className="bg-blue-50 text-blue-700 border-blue-200 mt-1"
                                >
                                  President
                                </Badge>
                              ) : member.isSecretary ? (
                                <Badge
                                  variant="outline"
                                  className="bg-purple-50 text-purple-700 border-purple-200 mt-1"
                                >
                                  Secretary
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="bg-gray-50 text-gray-700 border-gray-200 mt-1"
                                >
                                  Member
                                </Badge>
                              )}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              {/* ))} */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

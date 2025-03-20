"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreVertical, ChevronRight, InfoIcon, CalendarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function DefensesPage() {
  return (
    <Card className="min-h-[calc(100vh-60px)]">
      <CardHeader>
        <CardTitle className="font-semibold tracking-tight text-xl text-primary">Defenses</CardTitle>
        <CardDescription className="mt-2 space-y-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <div className="flex items-start gap-2">
            <InfoIcon className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
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
        <div className="space-y-2">
          <div className="border rounded-md overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div className="flex-1">
                <div className="font-medium">SEP490</div>
                <div className="text-xs text-muted-foreground">Course</div>
              </div>
              <div className="flex-1">
                <div className="font-medium">101</div>
                <div className="text-xs text-muted-foreground">Room</div>
              </div>
              <div className="flex-1">
                <div className="font-medium">Defense</div>
                <div className="text-xs text-muted-foreground">Type</div>
              </div>
              <div className="flex-1 p-2 rounded-md">
                <div className="font-medium text-primary flex items-center">
                  <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                  21/04/2025
                </div>
                <div className="text-xs text-muted-foreground">Date</div>
              </div>
              <div className="flex-1">
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                  Finished
                </Badge>
                <div className="text-xs text-muted-foreground">Status</div>
              </div>
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div className="flex-1">
                <div className="font-medium">SEP490</div>
                <div className="text-xs text-muted-foreground">Course</div>
              </div>
              <div className="flex-1">
                <div className="font-medium">101</div>
                <div className="text-xs text-muted-foreground">Room</div>
              </div>
              <div className="flex-1">
                <div className="font-medium">2nd Defense</div>
                <div className="text-xs text-muted-foreground">Type</div>
              </div>
              <div className="flex-1 p-2 rounded-md">
                <div className="font-medium text-primary flex items-center">
                  <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                  28/04/2025
                </div>
                <div className="text-xs text-muted-foreground">Date</div>
              </div>
              <div className="flex-1">
                <Badge variant="destructive">Not yet</Badge>
                <div className="text-xs text-muted-foreground">Status</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


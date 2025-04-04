"use client"

import { useState } from "react"
import { useStudentTasks } from "@/contexts/student/student-task-context"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  AlertCircle,
  Calendar,
  ChevronDown,
  ClipboardCheck,
  FileText,
  Lightbulb,
  NotebookTabs,
  Send,
  Star,
} from "lucide-react"

interface LeaderEvaluationSheetProps {
  data: {
    projectProgressId: string
    projectProgressWeekId: string
    projectProgressWeek: string
  }
  open: boolean
  onClose: () => void
  refresh: () => void
}

export default function LeaderEvaluationSheet({ data, open, onClose, refresh }: LeaderEvaluationSheetProps) {
  const { submitSummaryWeekForLeader } = useStudentTasks()
  const [summary, setSummary] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const requestBody = {
        ProjectProgressId: data.projectProgressId,
        ProjectProgressWeekId: data.projectProgressWeekId,
        Summary: summary,
      }
      await submitSummaryWeekForLeader(requestBody)
      setOpenConfirm(false)
      onClose()
      refresh()
    } finally {
      setIsLoading(false)
    }
  }

  const minRecommendedLength = 10
  const summaryLength = summary.length
  const isValidLength = summaryLength >= minRecommendedLength

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className="w-full md:w-3/4 lg:w-2/3 sm:max-w-none p-0 overflow-y-auto">
          <div className="h-full flex flex-col">
            <div className="p-6 border-b">
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <SheetTitle className="font-bold text-2xl flex items-center gap-2">
                    <ClipboardCheck className="h-6 w-6 text-primary" />
                    Leader Evaluation
                  </SheetTitle>
                  <Badge variant="outline" className="px-3 py-1">
                    Week {data.projectProgressWeek}
                  </Badge>
                </div>
                <SheetDescription>
                  Provide a comprehensive summary of your team's progress for this week.
                </SheetDescription>
              </SheetHeader>
            </div>

            <div className="flex-1 p-6 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Weekly Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Textarea
                      placeholder="Describe your team's achievements, challenges, and plans for the upcoming week..."
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      className="min-h-[200px] resize-none focus-visible:ring-primary"
                    />

                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                      <Badge variant={summaryLength < minRecommendedLength ? "outline" : "default"} className="h-6">
                        {summaryLength} / {minRecommendedLength}+ characters
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Collapsible
                open={isCollapsibleOpen}
                onOpenChange={setIsCollapsibleOpen}
                className="border rounded-lg overflow-hidden"
              >
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      <span className="font-medium">Writing Tips</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isCollapsibleOpen ? "transform rotate-180" : ""}`}
                    />
                  </div>
                </CollapsibleTrigger>
                <Separator />
                <CollapsibleContent>
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-muted-foreground">Consider including the following in your summary:</p>
                    <ul className="space-y-2 text-sm pl-5 list-disc">
                      <li>Key accomplishments and milestones reached</li>
                      <li>Challenges faced and how they were addressed</li>
                      <li>Team dynamics and collaboration highlights</li>
                      <li>Resource utilization and efficiency</li>
                      <li>Goals and focus areas for the upcoming week</li>
                    </ul>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div className="bg-muted rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Important</p>
                  <p className="text-muted-foreground">
                    Your evaluation will be permanently saved after submission and cannot be modified later.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-2">
                  <NotebookTabs className="h-4 w-4" />
                  <span>Project ID: {data.projectProgressId.substring(0, 8)}...</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Week ID: {data.projectProgressWeekId.substring(0, 8)}...</span>
                </div>
              </div>
            </div>

            <SheetFooter className="p-6 border-t flex justify-between sm:justify-between">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={() => setOpenConfirm(true)}
                disabled={!isValidLength || !summary.trim()}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                Submit Evaluation
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Confirm Submission
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to submit your evaluation?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="my-3 p-4 bg-muted rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4" />
              <span className="font-medium text-sm">Summary Preview</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {summary.length > 100 ? `${summary.substring(0, 100)}...` : summary}
            </p>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isLoading} onClick={handleSubmit}>
              {isLoading ? "Submitting..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}


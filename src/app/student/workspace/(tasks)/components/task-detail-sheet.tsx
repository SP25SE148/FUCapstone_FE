"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Task } from "@/contexts/student/student-task-context"
import UpdateStatus from "@/app/student/workspace/(tasks)/components/update-status"
import AssignTask from "@/app/student/workspace/(tasks)/components/assign-task"
import UpdatePriority from "@/app/student/workspace/(tasks)/components/update-priority"
import UpdateDueDate from "@/app/student/workspace/(tasks)/components/update-duedate"
import { ClipboardList, Info, AlignLeft, Calendar, User, Flag, BarChart, Hash } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface TaskDetailSheetProps {
  task: Task
  open: boolean
  onClose: () => void
}

export default function TaskDetailSheet({ task, open, onClose }: TaskDetailSheetProps) {
  const [keyTask, setKeyTask] = useState(task.keyTask)
  const [description, setDescription] = useState(task.description)
  const [summary, setSummary] = useState(task.summary)
  const [assignee, setAssignee] = useState(task.assignee)
  const [status, setStatus] = useState(task.status)
  const [priority, setPriority] = useState(task.priority)
  const [dueDate, setDueDate] = useState(task.dueDate)

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[40%] p-0 overflow-hidden flex flex-col h-full shadow-lg" side="right">
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <div className="flex items-center gap-3">
            <Hash className="h-5 w-5 text-primary" />
            <Input
              value={keyTask}
              onChange={(e) => setKeyTask(e.target.value)}
              className="font-medium border-0 bg-transparent focus-visible:ring-1 h-9 w-[180px]"
            />
          </div>
        </div>

        <div className="flex h-full overflow-hidden">
          <div className="w-full overflow-y-auto p-5 flex flex-col gap-2">
            <div className="border rounded-lg shadow-sm">
              <div className="flex w-full items-center justify-between p-4 font-medium bg-muted/30 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  <span>Task Details</span>
                </div>
              </div>
              <div className="p-4 space-y-4 border-t">
                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BarChart className="h-4 w-4" />
                    <span>Status</span>
                  </div>
                  <UpdateStatus task={{ ...task, status }} onClose={() => {}} />
                </div>
                <Separator className="my-1" />
                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Assignee</span>
                  </div>
                  <AssignTask task={{ ...task, assignee }} onAssign={setAssignee} />
                </div>
                <Separator className="my-1" />
                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Due date</span>
                  </div>
                  <UpdateDueDate task={{ ...task, dueDate }} onClose={() => {}} />
                </div>
                <Separator className="my-1" />
                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Flag className="h-4 w-4" />
                    <span>Priority</span>
                  </div>
                  <UpdatePriority task={{ ...task, priority }} onClose={() => {}} />
                </div>
              </div>
            </div>

            <div className="border rounded-lg shadow-sm">
              <div className="flex w-full items-center justify-between p-4 font-medium bg-muted/30 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-primary" />
                  <span>Summary</span>
                </div>
              </div>
              <div className="p-4">
                <Textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="min-h-[100px] resize-none focus-visible:ring-1"
                  placeholder="Enter task summary..."
                />
              </div>
            </div>

            <div className="border rounded-lg shadow-sm">
              <div className="flex w-full items-center justify-between p-4 font-medium bg-muted/30 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <AlignLeft className="h-4 w-4 text-primary" />
                  <span>Description</span>
                </div>
              </div>
              <div className="p-4">
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[150px] resize-none focus-visible:ring-1"
                  placeholder="Enter detailed description..."
                />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}


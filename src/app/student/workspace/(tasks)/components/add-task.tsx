"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useStudentTasks } from "@/contexts/student/student-task-context"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function AddTask({ onClose }: { onClose: () => void }) {
  const { groupInfo, getProjectProgressOfGroup, createTask } = useStudentTasks()
  const [keyTask, setKeyTask] = useState("")
  const [description, setDescription] = useState("")
  const [summary, setSummary] = useState("")
  const [assigneeId, setAssigneeId] = useState("")
  const [projectProgressId, setProjectProgressId] = useState("")
  const [priority, setPriority] = useState("1") 
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (groupInfo) {
      getProjectProgressOfGroup(groupInfo.id).then((data) => {
        if (data?.id) {
          setProjectProgressId(data.id) // Automatically set ProjectProgressId
        }
      })
    }
  }, [groupInfo])

  const handleAdd = async () => {
    if (!dueDate) {
      toast("Please select a due date before submitting.");
      return;
    }
    setIsSubmitting(true)
    await createTask({
      KeyTask: keyTask,
      Description: description,
      Summary: summary,
      AssigneeId: assigneeId,
      ProjectProgressId: projectProgressId,
      Priority: Number.parseInt(priority, 10),
      DueDate: dueDate.toISOString(),
    })
    onClose()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[850px] p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-xl">Add Task</DialogTitle>
            <DialogDescription>Fill in the details for the new task.</DialogDescription>
          </DialogHeader>

          <div className="px-6 py-4 flex-1 overflow-y-auto max-h-[65vh]">
            <div className="space-y-5">
              <div>
                <Label htmlFor="keyTask" className="text-sm font-medium">
                  Task Name
                </Label>
                <Input
                  id="keyTask"
                  placeholder="Enter task name"
                  value={keyTask}
                  onChange={(e) => setKeyTask(e.target.value)}
                  className="mt-1.5"
                />
              </div>

              {/* Assignee */}
              <div>
                <Label htmlFor="assignee" className="text-sm font-medium">
                  Assignee
                </Label>
                <Select onValueChange={setAssigneeId} value={assigneeId}>
                  <SelectTrigger id="assignee" className="mt-1.5">
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {groupInfo?.groupMemberList
                      .filter((member) => member.status === "Accepted")
                      .map((member) => (
                        <SelectItem key={member.studentId} value={member.studentId}>
                          {member.studentFullName} - {member.studentId}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="dueDate" className="text-sm font-medium">
                    Due Date
                  </Label>
                  <div className="mt-1.5 border rounded-lg overflow-hidden">
                    <div className="flex items-center gap-2 text-sm p-3 bg-muted/30 border-b">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{dueDate ? format(dueDate, "PPP") : "Pick a date"}</span>
                    </div>
                    <Calendar mode="single" selected={dueDate} onSelect={setDueDate} className="p-3" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="priority" className="text-sm font-medium">
                    Priority
                  </Label>
                  <Select onValueChange={setPriority} value={priority}>
                    <SelectTrigger id="priority" className="mt-1.5">
                      <SelectValue placeholder="Select priority">
                        {priority && (
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                priority === "0" ? "bg-red-500" : priority === "1" ? "bg-yellow-500" : "bg-green-500"
                              }`}
                            ></div>
                            <span>{priority === "0" ? "High" : priority === "1" ? "Medium" : "Low"}</span>
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span>High</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="1">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <span>Medium</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>Low</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Description */}
                  <div className="mt-5">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Enter task description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1.5 min-h-[120px]"
                    />
                  </div>

                  {/* Summary */}
                  <div className="mt-5">
                    <Label htmlFor="summary" className="text-sm font-medium">
                      Summary
                    </Label>
                    <Textarea
                      id="summary"
                      placeholder="Enter task summary"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              disabled={isSubmitting || !keyTask || !description || !summary || !assigneeId || !dueDate}
              className="ml-2"
            >
              {isSubmitting ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}


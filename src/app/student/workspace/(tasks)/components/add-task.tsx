"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useStudentTasks } from "@/contexts/student/student-task-context";
import { Label } from "@/components/ui/label";

export default function AddTask({ onClose }: { onClose: () => void }) {
  const { groupInfo, getProjectProgressOfGroup, createTask } = useStudentTasks();
  const [keyTask, setKeyTask] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [projectProgressId, setProjectProgressId] = useState("");
  const [priority, setPriority] = useState("1"); // Default to Medium
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (groupInfo) {
      getProjectProgressOfGroup(groupInfo.id).then((data) => {
        if (data?.id) {
          setProjectProgressId(data.id); // Automatically set ProjectProgressId
        }
      });
    }
  }, [groupInfo]);

  const handleAdd = async () => {
    if (!keyTask || !description || !summary || !assigneeId || !projectProgressId || !dueDate) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    await createTask({
        KeyTask: keyTask,
        Description: description,
        Summary: summary,
        AssigneeId: assigneeId,
        ProjectProgressId: projectProgressId,
        Priority: Number.parseInt(priority, 10),
        DueDate: dueDate.toISOString(),
      });
      onClose();
   
  };

  return (
    <Sheet open onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Task</SheetTitle>
          <SheetDescription>Fill in the details for the new task.</SheetDescription>
        </SheetHeader>
        <div className="py-4 h-[calc(100vh-180px)] overflow-y-auto pr-1">
          <div>
            <Label htmlFor="keyTask">Task Name</Label>
            <Input
              id="keyTask"
              placeholder="Enter task name"
              value={keyTask}
              onChange={(e) => setKeyTask(e.target.value)}
            />
          </div>

          {/* Assignee */}
          <div>
            <Label htmlFor="assignee">Assignee</Label>
            <Select onValueChange={setAssigneeId} value={assigneeId}>
              <SelectTrigger id="assignee">
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

          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <div>
              <div className="border rounded-md p-2 mb-2">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <CalendarIcon className="" />
                  <span>{dueDate ? format(dueDate, "PPP") : "Pick a date"}</span>
                </div>
                <Calendar mode="single" selected={dueDate} onSelect={setDueDate} />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select onValueChange={setPriority} value={priority}>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">High</SelectItem>
                <SelectItem value="1">Medium</SelectItem>
                <SelectItem value="2">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Summary */}
          <div>
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              placeholder="Enter task summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={isSubmitting || !keyTask || !description || !summary || !assigneeId || !dueDate}
          >
            {isSubmitting ? "Creating..." : "Create Task"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
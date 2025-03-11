"use client";

import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Task } from "@/contexts/student/student-task-context";

interface AssignTaskProps {
  task: Task;
  onAssign: (assignedTo: string) => void;
}

export default function AssignTask({ task, onAssign }: AssignTaskProps) {
  const [assignedTo, setAssignedTo] = useState<string>(task.assignedTo || "");

  const handleAssign = (value: string) => {
    setAssignedTo(value);
    onAssign(value);
  };

  return (
    <Select onValueChange={handleAssign} value={assignedTo}>
      <SelectTrigger>
        <span>{assignedTo || "Select a Student"}</span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Student 1">Student 1</SelectItem>
        <SelectItem value="Student 2">Student 2</SelectItem>
        <SelectItem value="Student 3">Student 3</SelectItem>
      </SelectContent>
    </Select>
  );
}
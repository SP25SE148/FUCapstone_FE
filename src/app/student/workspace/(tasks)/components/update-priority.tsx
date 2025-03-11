"use client";

import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/contexts/student/student-task-context";

interface UpdatePriorityProps {
  task: Task;
  onClose: () => void;
}

export default function UpdatePriority({ task, onClose }: UpdatePriorityProps) {
  const [priority, setPriority] = useState(task.priority);

  const handleUpdate = (newPriority: string) => {
    setPriority(newPriority);
    // Handle update priority logic here
    onClose();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-blue-100 text-blue-600";
      case "Medium":
        return "bg-yellow-100 text-yellow-600";
      case "High":
        return "bg-red-100 text-red-600";
    }
  };

  return (
    <Select onValueChange={handleUpdate} value={priority}>
      <SelectTrigger>
        <Badge className={getPriorityColor(priority)}>
          {priority}
        </Badge>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Low">
          <Badge className={getPriorityColor("Low")}>Low</Badge>
        </SelectItem>
        <SelectItem value="Medium">
          <Badge className={getPriorityColor("Medium")}>Medium</Badge>
        </SelectItem>
        <SelectItem value="High">
          <Badge className={getPriorityColor("High")}>High</Badge>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
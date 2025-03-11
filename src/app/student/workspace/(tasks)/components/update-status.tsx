"use client";

import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/contexts/student/student-task-context";

interface UpdateStatusProps {
  task: Task;
  onClose: () => void;
}

export default function UpdateStatus({ task, onClose }: UpdateStatusProps) {
  const [status, setStatus] = useState(task.status);

  const handleUpdate = (newStatus: string) => {
    setStatus(newStatus);
    // Handle update status logic here
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Inprocess":
        return "bg-blue-100 text-blue-600";
      case "Done":
        return "bg-green-100 text-green-600";
      case "Todo":
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Select onValueChange={handleUpdate} value={status}>
      <SelectTrigger>
        <Badge className={getStatusColor(status)}>
          {status}
        </Badge>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Todo">
          <Badge className={getStatusColor("Todo")}>Todo</Badge>
        </SelectItem>
        <SelectItem value="Inprocess">
          <Badge className={getStatusColor("Inprocess")}>In Process</Badge>
        </SelectItem>
        <SelectItem value="Done">
          <Badge className={getStatusColor("Done")}>Done</Badge>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
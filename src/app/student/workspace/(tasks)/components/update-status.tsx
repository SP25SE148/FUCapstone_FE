"use client";

import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/contexts/student/student-task-context";

interface UpdateStatusProps {
  task: Task;
  onClose: () => void;
}

const statusOptions = [
  { value: "0", label: "Done", color: "bg-green-100 text-green-600" },
  { value: "1", label: "In Progress", color: "bg-blue-100 text-blue-600" },
  { value: "2", label: "To Do", color: "bg-gray-100 text-gray-600" },
];

export default function UpdateStatus({ task, onClose }: UpdateStatusProps) {
  const [status, setStatus] = useState<string>(task.status.toString());

  const handleUpdate = (newStatus: string) => {
    setStatus(newStatus);
    onClose();
  };

  const getStatusLabel = (statusValue: string) => {
    const statusOption = statusOptions.find((option) => option.value === statusValue);
    return statusOption ? statusOption.label : "Unknown";
  };

  const getStatusColor = (statusValue: string) => {
    const statusOption = statusOptions.find((option) => option.value === statusValue);
    return statusOption ? statusOption.color : "bg-gray-100 text-gray-600";
  };

  return (
    <Select onValueChange={handleUpdate} value={status}>
      <SelectTrigger>
        <Badge className={getStatusColor(status)}>{getStatusLabel(status)}</Badge>
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <Badge className={option.color}>{option.label}</Badge>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
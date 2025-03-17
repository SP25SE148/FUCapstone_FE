"use client";

import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Task, useStudentTasks } from "@/contexts/student/student-task-context";

interface UpdatePriorityProps {
  task: Task;
  onClose: () => void;
}

const priorityOptions = [
  { value: "0", label: "High", color: "bg-red-100 text-red-600" },
  { value: "1", label: "Medium", color: "bg-yellow-100 text-yellow-600" },
  { value: "2", label: "Low", color: "bg-blue-100 text-blue-600" },
];

export default function UpdatePriority({ task, onClose }: UpdatePriorityProps) {
  const [priority, setPriority] = useState<string>(task.priority.toString());
  const { updateTask, getProjectProgressOfGroup, groupInfo } = useStudentTasks();

  const handleUpdate = async (newPriority: string) => {
    setPriority(newPriority);

    const projectProgress = groupInfo?.id
      ? await getProjectProgressOfGroup(groupInfo.id)
      : null;

    if (projectProgress?.id) {
      await updateTask({
        ...task,
        projectProgressId: projectProgress.id,
        priority: parseInt(newPriority, 10),
      });
    }

    onClose();
  };

  const getPriorityLabel = (priorityValue: string) => {
    const priorityOption = priorityOptions.find((option) => option.value === priorityValue);
    return priorityOption ? priorityOption.label : "Unknown";
  };

  const getPriorityColor = (priorityValue: string) => {
    const priorityOption = priorityOptions.find((option) => option.value === priorityValue);
    return priorityOption ? priorityOption.color : "bg-gray-100 text-gray-600";
  };

  return (
    <Select onValueChange={handleUpdate} value={priority}>
      <SelectTrigger>
        <Badge className={getPriorityColor(priority)}>{getPriorityLabel(priority)}</Badge>
      </SelectTrigger>
      <SelectContent>
        {priorityOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <Badge className={option.color}>{option.label}</Badge>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
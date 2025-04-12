"use client";

import { useState } from "react";

import { Task } from "@/types/types";
import { useStudentTasks } from "@/contexts/student/student-task-context";

import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

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
        priority: Number(newPriority),
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
      <SelectTrigger className="w-full">
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
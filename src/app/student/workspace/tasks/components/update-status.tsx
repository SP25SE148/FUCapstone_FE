"use client";

import { useEffect, useState } from "react";

import { Task } from "@/types/types";
import { useStudentTasks } from "@/contexts/student/student-task-context";

import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { useAuth } from "@/contexts/auth-context";

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
  const [status, setStatus] = useState<string>("");
  const { updateTask, getProjectProgressOfGroup, groupInfo } = useStudentTasks();
  const { user } = useAuth();
  const [isActive, setIsActive] = useState<boolean>(false);
  const studentCode = user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"];

  useEffect(() => {
      if ((task.assigneeId === studentCode || task.reporterId === studentCode) && task.status !== 0) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }, [task.assigneeId, task.reporterId, studentCode, task]);

    useEffect(() => {
      if (task.status !== null) {
        setStatus(task.status.toString());
      }
    }, [task]);

  const handleUpdate = async (newStatus: string) => {
    setStatus(newStatus);

    const projectProgress = groupInfo?.id
      ? await getProjectProgressOfGroup(groupInfo.id)
      : null;

    if (projectProgress?.id) {
      await updateTask({
        ...task,
        projectProgressId: projectProgress.id,
        status: parseInt(newStatus, 10),
        completionDate: newStatus === "0" ? new Date().toISOString() : null,
      });
    }

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
    <Select onValueChange={handleUpdate} value={status} disabled={!isActive}>
      <SelectTrigger className="w-full">
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
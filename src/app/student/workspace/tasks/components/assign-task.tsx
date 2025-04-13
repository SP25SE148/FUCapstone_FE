"use client";

import { useState, useEffect } from "react";

import { Task } from "@/types/types";
import { useStudentTasks } from "@/contexts/student/student-task-context";

import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

interface AssignTaskProps {
  task: Task;
  onAssign: (assignedTo: string) => void;
}

export default function AssignTask({ task, onAssign }: AssignTaskProps) {
  const { groupInfo, updateTask, getProjectProgressOfGroup } = useStudentTasks();
  const [students, setStudents] = useState<{ studentId: string; studentFullName: string }[]>([]);
  const [assignedTo, setAssignedTo] = useState<string>("");

  useEffect(() => {
    if (groupInfo?.groupMemberList) {
      const acceptedStudents = groupInfo.groupMemberList
        .filter((member) => member.status === "Accepted")
        .map((member) => ({
          studentId: member.studentId,
          studentFullName: member.studentFullName,
        }));
      setStudents(acceptedStudents);
    }
  }, [groupInfo]);

  useEffect(() => {
    if (task.assigneeId) {
      setAssignedTo(task.assigneeId);
    }
  }, [task]);
  

  const handleAssign = async (value: string) => {
    setAssignedTo(value);

    const projectProgress = groupInfo?.id
      ? await getProjectProgressOfGroup(groupInfo.id)
      : null;

    if (projectProgress?.id) {
      await updateTask({
        ...task,
        projectProgressId: projectProgress.id,
        assigneeId: value,
      });
    }

    onAssign(value);
  };

  const getStudentName = (id: string) => {
    const student = students.find((s) => s.studentId === id);
    return student ? student.studentFullName : "Select a Student";
  };

  return (
    <Select onValueChange={handleAssign} value={assignedTo}>
      <SelectTrigger className="w-full">
        <span>{getStudentName(assignedTo)}</span>
      </SelectTrigger>
      <SelectContent>
        {students.map((student) => (
          <SelectItem key={student.studentId} value={student.studentId}>
            {student.studentFullName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
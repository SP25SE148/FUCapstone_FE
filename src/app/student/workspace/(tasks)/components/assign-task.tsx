"use client";

import { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Task } from "@/contexts/student/student-task-context";
import { useStudentTasks } from "@/contexts/student/student-task-context";

interface AssignTaskProps {
  task: Task;
  onAssign: (assignedTo: string) => void;
}

export default function AssignTask({ task, onAssign }: AssignTaskProps) {
  const { groupInfo } = useStudentTasks(); 
  const [students, setStudents] = useState<{ studentId: string; studentFullName: string }[]>([]);
  const [assignedTo, setAssignedTo] = useState<string>(task.assigneeId || "");

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

  const handleAssign = (value: string) => {
    setAssignedTo(value);
    onAssign(value);
  };

  const getStudentName = (id: string) => {
    const student = students.find((s) => s.studentId === id);
    return student ? student.studentFullName : "Select a Student";
  };

  return (
    <Select onValueChange={handleAssign} value={assignedTo}>
      <SelectTrigger>
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
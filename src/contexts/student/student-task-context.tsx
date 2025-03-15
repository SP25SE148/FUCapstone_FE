"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "@/hooks/use-api";
import { useAuth } from "@/contexts/auth-context"; 
import { toast } from "sonner";

export interface Task {
  id: string;
  keyTask: string; 
  summary: string;
  assigneeId: string;
  reporterId: string;
  status: number;
  priority: number;
  dueDate: string;
  // createdDate: string;
}

export interface TaskRequest {
  KeyTask: string;
  Description: string;
  Summary: string;
  AssigneeId: string;
  ProjectProgressId: string;
  Priority: number;
  DueDate: string;
}

export interface Member {
  id: string;
  groupId: string;
  studentId: string;
  studentFullName: string;
  studentEmail: string;
  isLeader: boolean;
  status: string;
}

export interface Group {
  id: string;
  campusName: string;
  semesterName: string;
  majorName: string;
  capstoneName: string;
  groupCode: string;
  topicCode: string;
  groupMemberList: Member[];
  status: string;
}

interface ProjectProgress {
  id: string;
  meetingDate: string;
  projectProgressWeeks: {
    id: string;
    weekNumber: number;
    taskDescription: string;
    status: number;
    meetingLocation: string | null;
    meetingContent: string | null;
  }[];
}

interface StudentTaskContextProps {
  tasks: Task[];
  groupInfo: Group | null;
  createTask: (task: TaskRequest) => Promise<void>;
  fetchGroupInfo: () => Promise<void>;
  // updateTask: (task: Task) => void;
  getProjectProgressOfGroup: (groupId: string) => Promise<ProjectProgress>;
  fetchProgressTask: (projectProgressId: string) => Promise<void>;
  submitSummaryWeekForLeader: (data: { ProjectProgressId: string; ProjectProgressWeekId: string; Summary: string }) => Promise<void>;
}

const StudentTaskContext = createContext<StudentTaskContextProps | undefined>(undefined);

export const useStudentTasks = () => {
  const context = useContext(StudentTaskContext);
  if (!context) {
    throw new Error("useStudentTasks must be used within a StudentTaskProvider");
  }
  return context;
};

export const StudentTaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { callApi } = useApi();
  const { user } = useAuth(); 
  const [groupInfo, setGroupInfo] = useState<Group | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchGroupInfo = async () => {
    const response = await callApi("fuc/Group/information", {
      method: "GET",
    });
    setGroupInfo(response?.value);
  };

  const getProjectProgressOfGroup = async (groupId: string) => {
    const response = await callApi(`fuc/group/${groupId}/progress`);
    return response?.value;
  };

  const fetchProgressTask = async (projectProgressId: string) => {
    const response = await callApi(`fuc/group/progress/${projectProgressId}/tasks`, {
      method: "GET",
    });
    if (response?.isSuccess) {
      setTasks(response.value);
    } else {
      toast.error("Failed to fetch tasks");
    }
    return response?.value;
  };

  const createTask = async (task: TaskRequest) => {
    const response = await callApi("fuc/group/progress/tasks", {
      method: "POST",
      body: task,
    });

    if (response?.isSuccess) {
      toast.success("Task created successfully");

      const newTask: Task = {
        id: response.value.id,
        keyTask: task.KeyTask, // Ensure property names match the Task type
        summary: task.Summary,
        assigneeId: task.AssigneeId,
        priority: task.Priority,
        dueDate: task.DueDate,
        reporterId: user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"] || "",
        status: 2, 
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
    return response;
  };

  // const updateTask = (task: Task) => {
  //   setTasks((prevTasks) => prevTasks.map((t) => (t.TaskId === task.TaskId ? task : t)));
  // };

  const submitSummaryWeekForLeader = async (data: { ProjectProgressId: string; ProjectProgressWeekId: string; Summary: string }) => {
    const response = await callApi("fuc/group/progress/week/summary", {
      method: "POST",
      body: data,
    });
    if (response?.isSuccess) {
      toast.success("Summary submitted successfully");
    } else {
      toast.error("Failed to submit summary");
    }
    return response;
  };

  useEffect(() => {
    fetchGroupInfo();
  }, []);

  return (
    <StudentTaskContext.Provider
      value={{
        tasks,
        createTask,
        // updateTask,
        groupInfo,
        fetchGroupInfo,
        getProjectProgressOfGroup,
        fetchProgressTask,
        submitSummaryWeekForLeader,
      }}
    >
      {children}
    </StudentTaskContext.Provider>
  );
};
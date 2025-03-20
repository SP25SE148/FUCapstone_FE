"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "@/hooks/use-api";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { ProjectProgress } from "@/types/types";

export interface Task {
  id: string;
  keyTask: string;
  description: string;
  summary: string;
  assigneeId: string;
  reporterId: string;
  comment: string | null;
  status: number;
  priority: number;
  dueDate: string;
  createdDate: string;
  projectProgressId: string | null;
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

export interface TaskUpdate {
  TaskId: string;
  ProjectProgressId: string;
  KeyTask: string;
  Description: string;
  Summary: string;
  Comment: string;
  AssigneeId: string;
  Status: number;
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


interface StudentTaskContextProps {
  tasks: Task[];
  groupInfo: Group | null;
  createTask: (task: TaskRequest) => Promise<void>;
  fetchGroupInfo: () => Promise<void>;
  updateTask: (updatedTask: Task) => Promise<void>;
  getProjectProgressOfGroup: (groupId: string) => Promise<ProjectProgress>;
  fetchProgressTask: (projectProgressId: string) => Promise<void>;
  submitSummaryWeekForLeader: (data: { ProjectProgressId: string; ProjectProgressWeekId: string; Summary: string }) => Promise<void>;
  getTaskDetail: (taskId: string) => Promise<Task | null>;
  uploadGroupDocument: (data: any) => Promise<void>;
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
        keyTask: response.value.keyTask,
        summary: response.value.summary,
        comment: null,
        description: response.value.description,
        assigneeId: response.value.assigneeId,
        reporterId: response.value.reporterId,
        status: response.value.status,
        priority: response.value.priority,
        dueDate: response.value.dueDate,
        createdDate: response.value.createdDate,
        projectProgressId: null
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
    } else {
      toast.error("Failed to create task");
    }
    return response;
  };

  const updateTask = async (updatedTask: any) => {
    const response = await callApi("fuc/group/progress/tasks", {
      method: "PUT",
      body: {
        TaskId: updatedTask.id,
        ProjectProgressId: updatedTask.projectProgressId,
        KeyTask: updatedTask.keyTask,
        Description: updatedTask.description,
        Summary: updatedTask.summary,
        Comment: updatedTask.comment || "",
        AssigneeId: updatedTask.assigneeId,
        Status: updatedTask.status,
        Priority: updatedTask.priority,
        DueDate: updatedTask.dueDate,
      },
    });

    if (response?.isSuccess) {
      toast.success("Task updated successfully");
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        )
      );
    }
    return response;
  };

  const submitSummaryWeekForLeader = async (data: { ProjectProgressId: string; ProjectProgressWeekId: string; Summary: string }) => {
    const response = await callApi("fuc/group/progress/week/summary", {
      method: "POST",
      body: data,
    });
    if (response?.isSuccess) {
      toast.success("Summary submitted successfully");

    }

    return response;
  };

  const getTaskDetail = async (taskId: string) => {
    const response = await callApi(`fuc/group/progress/tasks/${taskId}`, {
      method: "GET",
    });

    if (response?.isSuccess) {
      return response.value;
    }
  };

  const uploadGroupDocument = async (data: any) => {
    const response: any = await callApi("fuc/group/documents", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Upload document successfully");
    }
    return response
  };

  useEffect(() => {
    fetchGroupInfo();
  }, []);

  return (
    <StudentTaskContext.Provider
      value={{
        tasks,
        createTask,
        updateTask,
        groupInfo,
        fetchGroupInfo,
        getProjectProgressOfGroup,
        fetchProgressTask,
        submitSummaryWeekForLeader,
        getTaskDetail,
        uploadGroupDocument
      }}
    >
      {children}
    </StudentTaskContext.Provider>
  );
};
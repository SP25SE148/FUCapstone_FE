"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";
import { useAuth } from "@/contexts/auth-context";
import { GroupFullInfo, ProjectProgress, Task, TaskRequest } from "@/types/types";

interface StudentTaskContextProps {
  tasks: Task[];
  groupInfo: GroupFullInfo | null;
  createTask: (task: TaskRequest) => Promise<void>;
  fetchGroupInfo: () => Promise<void>;
  updateTask: (updatedTask: unknown) => Promise<void>;
  getProjectProgressOfGroup: (groupId: string) => Promise<ProjectProgress>;
  fetchProgressTask: (projectProgressId: string) => Promise<void>;
  submitSummaryWeekForLeader: (data: { ProjectProgressId: string; ProjectProgressWeekId: string; Summary: string }) => Promise<void>;
  getTaskDetail: (taskId: string) => Promise<Task | null>;
  uploadGroupDocument: (data: any) => Promise<void>;
  getPresignUrlOfGroupDocument: (groupId: string) => Promise<string>;
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
  const [groupInfo, setGroupInfo] = useState<GroupFullInfo | null>(null);
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
        description: response.value.description,
        assigneeId: response.value.assigneeId,
        reporterId: response.value.reporterId,
        reporterName: user?.name || "",
        status: response.value.status,
        priority: response.value.priority,
        dueDate: response.value.dueDate,
        createdDate: response.value.createdDate,
        projectProgressId: null,
        assigneeName: "",
        lastUpdatedDate: null,
        completionDate: null,
        fucTaskHistories: []
      };

      setTasks((prevTasks) => [newTask, ...prevTasks]);
      console.log("new task: ", newTask);
      console.log("tasks: ", tasks);
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
        // KeyTask: updatedTask.keyTask,
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
      fetchGroupInfo();
      toast.success("Upload document successfully");
    }
    return response
  };

  const getPresignUrlOfGroupDocument = async (groupId: string) => {
    const response = await callApi(`fuc/group/documents/${groupId}`);
    return (response?.value);
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
        uploadGroupDocument,
        getPresignUrlOfGroupDocument
      }}
    >
      {children}
    </StudentTaskContext.Provider>
  );
};
"use client";

import { toast } from "sonner";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/use-api";
import { Decision, DefenseResult, EvaluationStudent, GroupFullInfo, GroupShortInfo, ProjectProgress, ReviewResult, Task } from "@/types/types";

interface SupervisorGroupContextType {
  groupList: GroupShortInfo[];
  coGroupList: GroupShortInfo[];
  getTopicGroupInformation: (groupId: string) => Promise<GroupFullInfo>;
  getPresignedUrlTopicDocument: (id: string) => Promise<string>;
  getProjectProgressOfGroup: (groupId: string) => Promise<ProjectProgress>;
  getProjectProgressTemplate: () => Promise<string>;
  importProjectProgress: (data: any) => Promise<void>;
  updateProjectProgress: (data: any) => Promise<void>;
  updateProjectProgressWeek: (data: any) => Promise<void>;
  dashboardFUCTaskOfGroup: (projectProgressId: string) => Promise<any>;
  getProjectProgressTasks: (projectProgressId: string) => Promise<Task[]>;
  getProjectProgressTaskDetail: (taskId: string) => Promise<Task>;
  evaluationWeeklyProgress: (data: any) => Promise<void>;
  getEvaluationWeeklyProgress: (groupId: string) => Promise<EvaluationStudent[]>;
  exportEvaluationWeeklyProgressFile: (groupId: string) => Promise<any>;
  getReviewResultByGroupId: (groupId: string) => Promise<ReviewResult[]>;
  getGroupDecisionResponse: (groupId: string) => Promise<Decision>;
  updateGroupDecisionStatusBySupervisor: (data: any) => Promise<void>;
  getDefendResultByGroupId: (groupId: string) => Promise<DefenseResult[]>;
}

const SupervisorGroupContext = createContext<
  SupervisorGroupContextType | undefined
>(undefined);

export const SupervisorGroupProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { callApi } = useApi();
  const pathName = usePathname();
  const [groupList, setGroupList] = useState<GroupShortInfo[]>([]);
  const [coGroupList, setCoGroupList] = useState<GroupShortInfo[]>([]);

  const getGroupManageBySupervisor = async () => {
    const response = await callApi("fuc/group/manage");
    setGroupList(response?.value);
  };

  const getGroupOfCoSupervisor = async () => {
    const response = await callApi("fuc/group/co-manage");
    setCoGroupList(response?.value);
  };

  const getTopicGroupInformation = async (groupId: string) => {
    const response = await callApi(`fuc/group/${groupId}`);
    return (response?.value);
  };

  const getPresignedUrlTopicDocument = async (id: string) => {
    const response = await callApi(`fuc/topics/presigned/${id}`);
    return (response?.value);
  };

  const getProjectProgressOfGroup = async (groupId: string) => {
    const response = await callApi(`fuc/group/${groupId}/progress`);
    return (response?.value);
  };

  const getProjectProgressTemplate = async () => {
    const response = await callApi("fuc/Documents/project-progress");
    return (response?.value);
  };

  const importProjectProgress = async (data: any) => {
    const response: any = await callApi("fuc/group/progress/import", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Upload project progress successfully");
    }
    return response
  };

  const updateProjectProgress = async (data: any) => {
    const response: any = await callApi("fuc/group/progress", {
      method: "PUT",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Update project progress successfully");
    }
    return response
  };

  const updateProjectProgressWeek = async (data: any) => {
    const response: any = await callApi("fuc/group/progress/week", {
      method: "PUT",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Update project progress week successfully");
    }
    return response
  };

  const dashboardFUCTaskOfGroup = async (projectProgressId: string) => {
    const response = await callApi(`fuc/group/progress/${projectProgressId}/tasks/dashboard`);
    return response?.value;
  };

  const getProjectProgressTasks = async (projectProgressId: string) => {
    const response = await callApi(`fuc/group/progress/${projectProgressId}/tasks`);
    return response?.value;
  };

  const getProjectProgressTaskDetail = async (taskId: string) => {
    const response = await callApi(`fuc/group/progress/tasks/${taskId}`);
    return response.value;
  };

  const evaluationWeeklyProgress = async (data: any) => {
    const response: any = await callApi("fuc/group/progress/week/evaluations", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Evaluation weekly successfully");
    }
    return response
  };

  const getEvaluationWeeklyProgress = async (groupId: string) => {
    const response = await callApi(`fuc/group/progress/week/evaluation/${groupId}`);
    return (response?.value);
  };

  const exportEvaluationWeeklyProgressFile = async (groupId: string) => {
    const response = await callApi(`fuc/group/progress/week/evaluation/${groupId}/excel`, {
      responseType: "blob"
    });
    return (response);
  };

  const getReviewResultByGroupId = async (groupId: string) => {
    const response = await callApi(`fuc/user/review-calendar-result/${groupId}`);
    return (response?.value);
  };

  const getGroupDecisionResponse = async (groupId: string) => {
    const response = await callApi(`fuc/group/decision/${groupId}`);
    return (response?.value);
  };

  const updateGroupDecisionStatusBySupervisor = async (data: any) => {
    const response: any = await callApi("fuc/user/supervisor/update-group-decision-status", {
      method: "PUT",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Update decision successfully");
    }
    return response
  };

  const getDefendResultByGroupId = async (groupId: string) => {
    const response = await callApi(`fuc/user/defend-calendar/result/${groupId}`);
    return (response?.value);
  };

  useEffect(() => {
    if (pathName === "/supervisor/groups") {
      getGroupManageBySupervisor();
      getGroupOfCoSupervisor();
    }
  }, [pathName]);

  return (
    <SupervisorGroupContext.Provider
      value={{
        groupList,
        coGroupList,
        getTopicGroupInformation,
        getPresignedUrlTopicDocument,
        getProjectProgressOfGroup,
        getProjectProgressTemplate,
        importProjectProgress,
        updateProjectProgress,
        updateProjectProgressWeek,
        dashboardFUCTaskOfGroup,
        getProjectProgressTasks,
        getProjectProgressTaskDetail,
        evaluationWeeklyProgress,
        getEvaluationWeeklyProgress,
        exportEvaluationWeeklyProgressFile,
        getReviewResultByGroupId,
        getGroupDecisionResponse,
        updateGroupDecisionStatusBySupervisor,
        getDefendResultByGroupId
      }}
    >
      {children}
    </SupervisorGroupContext.Provider>
  );
};

export const useSupervisorGroup = () => {
  const context = useContext(SupervisorGroupContext);
  if (context === undefined) {
    throw new Error(
      "useSupervisorGroup must be used within a SupervisorGroupProvider"
    );
  }
  return context;
};

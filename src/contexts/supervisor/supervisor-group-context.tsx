"use client";

import { toast } from "sonner";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/use-api";

export interface Group {
  groupId: string,
  semesterCode: string,
  topicCode: string,
  groupCode: string,
  englishName: string
}

export interface Member {
  id: string;
  groupId: string;
  studentId: string;
  studentFullName: string;
  studentEmail: string;
  isLeader: boolean;
  createdBy: string,
  createdDate: string,
  status: string;
}

export interface Topic {
  id: string;
  code: string;
  campusId: string;
  semesterId: string
  capstoneId: string;
  businessAreaName: string;
  difficultyLevel: string;
  englishName: string;
  vietnameseName: string
  abbreviation: string;
  description: string;
  mainSupervisorEmail: string
  mainSupervisorName: string
  coSupervisors: [];
  fileName: string;
  fileUrl: string
  createdDate: string;
  status: string;
  topicAppraisals: [];
}

export interface GroupTopicInfo {
  id: string,
  semesterName: string,
  majorName: string,
  capstoneName: string,
  campusName: string,
  topicCode: string,
  groupCode: string,
  status: string,
  groupMemberList: Member[];
  topicResponse: Topic
}

export interface ProjectProgressWeek {
  id: string,
  weekNumber: number,
  taskDescription: string,
  status: number,
  meetingLocation: string | null,
  meetingContent: string | null,
  summary: string | null,
}

export interface ProjectProgress {
  id: string,
  meetingDate: string,
  projectProgressWeeks: ProjectProgressWeek[]
}

export interface EvaluationWeek {
  weekNumber: number,
  contributionPercentage: number,
  summary: string | null,
  meetingContent: string,
  comments: string,
  status: string
}

export interface EvaluationStudent {
  studentCode: string,
  studentName: string,
  studentRole: string,
  averageContributionPercentage: number,
  evaluationWeeks: EvaluationWeek[]
}

interface SupervisorGroupContextType {
  groupList: Group[];
  getTopicGroupInformation: (groupId: string) => Promise<GroupTopicInfo>;
  getProjectProgressOfGroup: (groupId: string) => Promise<ProjectProgress>;
  importProjectProgress: (data: any) => Promise<void>;
  evaluationWeeklyProgress: (data: any) => Promise<void>;
  getEvaluationWeeklyProgress: (groupId: string) => Promise<EvaluationStudent[]>;
  exportEvaluationWeeklyProgressFile: (groupId: string) => Promise<any>;
}

const SupervisorGroupContext = createContext<
  SupervisorGroupContextType | undefined
>(undefined);

export const SupervisorGroupProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { callApi } = useApi();
  const pathName = usePathname();
  const [groupList, setGroupList] = useState<Group[]>([]);

  const getGroupManageBySupervisor = async () => {
    const response = await callApi("fuc/group/manage");
    setGroupList(response?.value);
  };

  const getTopicGroupInformation = async (groupId: string) => {
    const response = await callApi(`fuc/group/${groupId}`);
    return (response?.value);
  };

  const getProjectProgressOfGroup = async (groupId: string) => {
    const response = await callApi(`fuc/group/${groupId}/progress`);
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
    const response = await callApi(`fuc/group/progress/week/evaluation/${groupId}/excel`);
    return (response?.value);
  };

  useEffect(() => {
    if (pathName === "/supervisor/groups") {
      getGroupManageBySupervisor();
    }
  }, [pathName]);

  return (
    <SupervisorGroupContext.Provider
      value={{
        groupList,
        getTopicGroupInformation,
        getProjectProgressOfGroup,
        importProjectProgress,
        evaluationWeeklyProgress,
        getEvaluationWeeklyProgress,
        exportEvaluationWeeklyProgressFile
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

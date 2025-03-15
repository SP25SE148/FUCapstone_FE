"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/use-api";
import { useStudentProfile } from "./student-profile-context";
import { ProjectProgress } from "@/types/types";


export interface Member {
  id: string;
  groupId: string;
  studentId: string;
  studentFullName: string;
  studentEmail: string;
  gpa: number;
  isLeader: boolean;
  status: string;
}

export interface Topic {
  id: string;
  code: string;
  mainSupervisorName: string;
  mainSupervisorEmail: string;
  englishName: string;
  vietnameseName: string;
  abbreviation: string;
  description: string;
  fileName: string;
  fileUrl: undefined;
  status: string;
  difficultyLevel: string;
  businessAreaName: string;
  capstoneId: string;
  semesterId: string;
  campusId: string;
  createdDate: string;
  coSupervisors: [],
  topicAppraisals: []
}

export interface Group {
  id: string;
  campusName: string;
  semesterName: string;
  majorName: string;
  capstoneName: string;
  groupCode: string;
  topicCode: string;
  averageGPA: number;
  groupMemberList: Member[];
  status: string;
  topicResponse: Topic;
}

interface StudentGroupContextType {
  groupInfo: Group | null;
  createGroup: () => Promise<void>;
  fetchGroupInfo: () => Promise<void>;
  inviteMember: (data: any) => Promise<void>;
  registerGroup: (groupId: string) => Promise<void>;
  updateStatusInvitation: (data: any) => Promise<void>;
  getPresignedUrlTopicDocument: (id: string) => Promise<string>;
  getProjectProgressOfGroup: (groupId: string) => Promise<ProjectProgress>;
}

const StudentGroupContext = createContext<StudentGroupContextType | undefined>(
  undefined
);

export const StudentGroupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { callApi } = useApi();
  const { fetchStudentProfile } = useStudentProfile();

  const [groupInfo, setGroupInfo] = useState<Group | null>(null);

  const fetchGroupInfo = async () => {
    const response = await callApi("fuc/Group/information", {
      method: "GET",
    });
    setGroupInfo(response?.value);
  };

  const getProjectProgressOfGroup = async (groupId: string) => {
    const response = await callApi(`fuc/group/${groupId}/progress`);
    return (response?.value);
  };

  const createGroup = async () => {
    const response = await callApi("fuc/Group", {
      method: "POST",
    });
    if (response?.isSuccess === true) {
      toast.success("Create group successfully");
      fetchStudentProfile();
      fetchGroupInfo();
    }
    return response;
  };

  const inviteMember = async (data: any) => {
    const response = await callApi("fuc/Group/add-member", {
      method: "POST",
      body: data,
    });
    if (response?.isSuccess === true) {
      toast.success("Send invitation successfully");
      fetchGroupInfo();
    }
    return response;
  };

  const updateStatusInvitation = async (data: any) => {
    const response = await callApi("fuc/Group/update-group-member-status", {
      method: "PUT",
      body: data,
    });
    if (response?.isSuccess === true) {
      toast.success("Update status invitation successfully");
      fetchGroupInfo();
      fetchStudentProfile();
    }
    return response;
  };

  const getPresignedUrlTopicDocument = async (id: string) => {
    const response = await callApi(`fuc/topics/presigned/${id}`, {
      method: "GET",
    });
    return (response?.value);
  };

  const registerGroup = async (groupId: string) => {
    const response = await callApi(`fuc/Group/${groupId}`, {
      method: "PUT",
    });
    if (response?.isSuccess === true) {
      toast.info(response?.value || "Register group successfully");
      fetchGroupInfo();
    }
    return response;
  };

  useEffect(() => {
    fetchGroupInfo();
  }, []);

  return (
    <StudentGroupContext.Provider
      value={{
        groupInfo,
        createGroup,
        inviteMember,
        registerGroup,
        fetchGroupInfo,
        updateStatusInvitation,
        getPresignedUrlTopicDocument,
        getProjectProgressOfGroup,
      }}
    >
      {children}
    </StudentGroupContext.Provider>
  );
};

export const useStudentGroup = () => {
  const context = useContext(StudentGroupContext);
  if (context === undefined) {
    throw new Error(
      "useStudentGroup must be used within a StudentGroupProvider"
    );
  }
  return context;
};

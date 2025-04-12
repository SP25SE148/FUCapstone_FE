"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/use-api";
import { useStudentProfile } from "./student-profile-context";
import { Decision, GroupFullInfo, InviteStudent, ProjectProgress } from "@/types/types";

interface StudentGroupContextType {
  groupInfo: GroupFullInfo | null;
  createGroup: () => Promise<void>;
  fetchGroupInfo: () => Promise<void>;
  getStudentsForInvite: (searchTerm: string) => Promise<InviteStudent[]>;
  inviteMember: (data: any) => Promise<void>;
  registerGroup: () => Promise<void>;
  updateStatusInvitation: (data: any) => Promise<void>;
  getPresignedUrlTopicDocument: (id: string) => Promise<string>;
  getProjectProgressOfGroup: (groupId: string) => Promise<ProjectProgress>;
  getGroupDecisionResponse: (groupId: string) => Promise<Decision>;
}

const StudentGroupContext = createContext<StudentGroupContextType | undefined>(
  undefined
);

export const StudentGroupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { callApi } = useApi();
  const { fetchStudentProfile } = useStudentProfile();

  const [groupInfo, setGroupInfo] = useState<GroupFullInfo | null>(null);

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

  const getStudentsForInvite = async (searchTerm: string) => {
    const response = await callApi(`fuc/User/students/invitation?searchTerm=${searchTerm}`);
    return (response?.value);
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

  const registerGroup = async () => {
    const response = await callApi(`fuc/Group`, {
      method: "PUT",
    });
    if (response?.isSuccess === true) {
      toast.info(response?.value || "Register group successfully");
      fetchGroupInfo();
    }
    return response;
  };

  const getGroupDecisionResponse = async (groupId: string) => {
    const response = await callApi(`fuc/group/decision/${groupId}`);
    return (response?.value);
  };

  useEffect(() => {
    fetchGroupInfo();
  }, []);

  return (
    <StudentGroupContext.Provider
      value={{
        groupInfo,
        createGroup,
        getStudentsForInvite,
        inviteMember,
        registerGroup,
        fetchGroupInfo,
        updateStatusInvitation,
        getPresignedUrlTopicDocument,
        getProjectProgressOfGroup,
        getGroupDecisionResponse
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

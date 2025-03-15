"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/use-api";
import { useStudentProfile } from "./student-profile-context";
import { useStudentGroup } from "./student-group-context";

export interface RequestMember {
  id: string;
  groupId: string;
  studentId: string;
  studentFullName: string;
  studentEmail: string;
  gpa: number;
  isLeader: boolean;
  createdBy: string;
  createdDate: string;
  status: string;
}

export interface Request {
  groupMemberRequestSentByLeader: RequestMember[]; // invitation sent
  groupMemberRequested: RequestMember[]; // invitation received
  joinGroupRequestSentByMember: RequestMember[]; // application sent
  joinGroupRequested: RequestMember[]; // application received
}

interface StudentGroupRequestContextType {
  listRequest: Request | null;
  updateGroupMemberStatus: (data: any) => Promise<void>; // invitation
  updateJoinGroupRequest: (data: any) => Promise<void>; // application
}

const StudentGroupRequestContext = createContext<StudentGroupRequestContextType | undefined>(
  undefined
);

export const StudentGroupRequestProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { callApi } = useApi();
  const { fetchGroupInfo } = useStudentGroup();
  const { fetchStudentProfile } = useStudentProfile();

  const [listRequest, setListRequest] = useState<Request | null>(null);

  const getGroupMemberRequestById = async () => {
    const response = await callApi("fuc/Group/student/get-group-member-request");
    setListRequest(response?.value);
  };

  const updateGroupMemberStatus = async (data: any) => {
    const response = await callApi("fuc/Group/update-group-member-status", {
      method: "PUT",
      body: data,
    });
    if (response?.isSuccess === true) {
      toast.success("Update status invitation successfully");
      fetchGroupInfo();
      getGroupMemberRequestById();
      fetchStudentProfile();
    }
    return response;
  };

  const updateJoinGroupRequest = async (data: any) => {
    const response = await callApi("fuc/Group/update-join-group-request", {
      method: "PUT",
      body: data,
    });
    if (response?.isSuccess === true) {
      toast.success("Update status application successfully");
      fetchGroupInfo();
      getGroupMemberRequestById();
      fetchStudentProfile();
    }
    return response;
  };

  useEffect(() => {
    getGroupMemberRequestById();
  }, []);

  return (
    <StudentGroupRequestContext.Provider
      value={{
        listRequest,
        updateGroupMemberStatus,
        updateJoinGroupRequest,
      }}
    >
      {children}
    </StudentGroupRequestContext.Provider>
  );
};

export const useStudentGroupRequest = () => {
  const context = useContext(StudentGroupRequestContext);
  if (context === undefined) {
    throw new Error(
      "useStudentGroupRequest must be used within a StudentGroupRequestProvider"
    );
  }
  return context;
};

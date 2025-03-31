"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { Member } from "@/types/types";
import { useApi } from "../../hooks/use-api";
import { useStudentGroup } from "./student-group-context";
import { useStudentProfile } from "./student-profile-context";

export interface Request {
  groupMemberRequestSentByLeader: Member[]; // invitation sent
  groupMemberRequested: Member[]; // invitation received
  joinGroupRequestSentByMember: Member[]; // application sent
  joinGroupRequested: Member[]; // application received
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

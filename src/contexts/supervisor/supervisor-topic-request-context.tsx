"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/use-api";
import { usePathname } from "next/navigation";

interface Request {
  topicRequestId: string;
  groupCode: string,
  groupId: string,
  supervisorId: string,
  supervisorFullName: string,
  topicId: string,
  topicCode: string,
  topicEnglishName: string,
  status: string,
  requestedBy: string,
  leaderFullName: string,
  createdDate: string
}

interface Member {
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

interface SupervisorTopicRequestContextType {
  requestList: Request[];
  getGroupById: (id: string) => Promise<any>
  updateTopicRequestStatus: (data: { TopicRequestId: string, Status: number }) => Promise<any>
}

const SupervisorTopicRequestContext = createContext<SupervisorTopicRequestContextType | undefined>(undefined);

export const SupervisorTopicRequestProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { callApi } = useApi();
  const pathName = usePathname();

  const [requestList, setRequestList] = useState<Request[]>([]);

  const getTopicRequest = async () => {
    const response = await callApi(`fuc/Group/get-topic-request`);
    setRequestList(response.value);
  };

  const getGroupById = async (id: string) => {
    const response = await callApi(`fuc/group/${id}`);
    return (response.value);
  }

  const updateTopicRequestStatus = async (data: { TopicRequestId: string, Status: number }) => {
    const response = await callApi(`fuc/User/update-topic-request-status`, {
      method: "PUT",
      body: data,
    });
    if (response?.isSuccess === true) {
      toast.success("Updated topic request status successfully");
      getTopicRequest()
    }
    return response;
  }

  useEffect(() => {
    if (pathName == "/supervisor/topics/my-request") {
      getTopicRequest();
    }
  }, []);

  return (
    <SupervisorTopicRequestContext.Provider
      value={{
        requestList,
        getGroupById,
        updateTopicRequestStatus,
      }}
    >
      {children}
    </SupervisorTopicRequestContext.Provider>
  );
};

export const useSupervisorTopicRequest = () => {
  const context = useContext(SupervisorTopicRequestContext);
  if (context === undefined) {
    throw new Error(
      "useSupervisorTopicRequest must be used within a SupervisorTopicRequestProvider"
    );
  }
  return context;
};

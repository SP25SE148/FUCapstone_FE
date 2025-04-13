"use client";

import { toast } from "sonner";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/use-api";
import { TopicRequest } from "@/types/types";

interface SupervisorTopicRequestContextType {
  requestList: TopicRequest;
  getGroupById: (id: string) => Promise<any>
  updateTopicRequestStatus: (data: { TopicRequestId: string, Status: number, Reason: string }) => Promise<any>
}

const SupervisorTopicRequestContext = createContext<SupervisorTopicRequestContextType | undefined>(undefined);

export const SupervisorTopicRequestProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { callApi } = useApi();
  const pathName = usePathname();

  const [requestList, setRequestList] = useState<TopicRequest>({});

  const getTopicRequest = async () => {
    const response = await callApi(`fuc/Group/get-topic-request`);
    setRequestList(response.value);
  };

  const getGroupById = async (id: string) => {
    const response = await callApi(`fuc/group/${id}`);
    return (response.value);
  }

  const updateTopicRequestStatus = async (data: { TopicRequestId: string, Status: number, Reason: string }) => {
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
  }, [pathName]);

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

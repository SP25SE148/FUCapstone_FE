"use client";

import { toast } from "sonner";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

import { Topic } from "@/types/types";
import { useApi } from "../../hooks/use-api";

interface SupervisorTopicContextType {
  topicsOfSupervisor: Topic[];
  topicsOfCoSupervisor: Topic[];
  fetchTopicsOfSupervisor: () => Promise<void>;
  fetchTopicsById: (id: string) => Promise<Topic>;
  getPresignedUrlTopicDocument: (id: string) => Promise<string>;
  updateTopic: (topicId: string, data: FormData) => Promise<any>;
}

const SupervisorTopicContext = createContext<
  SupervisorTopicContextType | undefined
>(undefined);

export const SupervisorTopicProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { callApi } = useApi();
  const pathName = usePathname();
  const [topicsOfSupervisor, setTopicsOfSupervisor] = useState<Topic[]>([]);
  const [topicsOfCoSupervisor, setTopicsOfCoSupervisor] = useState<Topic[]>([]);

  const fetchTopicsOfSupervisor = async () => {
    const response = await callApi("fuc/topics/supervisor");
    setTopicsOfSupervisor(response?.value);
  };

  const getTopicsByCoSupervisor = async () => {
    const response = await callApi("fuc/topics/cosupervisor");
    setTopicsOfCoSupervisor(response?.value);
  };

  const fetchTopicsById = async (id: string) => {
    const response = await callApi(`fuc/topics/${id}`);
    return (response?.value);
  };

  const getPresignedUrlTopicDocument = async (id: string) => {
    const response = await callApi(`fuc/topics/presigned/${id}`);
    return (response?.value);
  };

  const reAppraisalTopicForMainSupervisor = async (topicId: string) => {
    const response = await callApi(`fuc/topics/re-appraisal/${topicId}`, {
      method: "POST",
    });
    if (response?.isSuccess === true) {
      toast.success("Reappraisal topic successfully");
    }
    return response;
  };

  const updateTopic = async (topicId: string, data: FormData) => {
    const response = await callApi(`fuc/topics/${topicId}`, {
      method: "PUT",
      body: data,
    });
    if (response?.isSuccess === true) {
      toast.success("Update topic successfully");
      await reAppraisalTopicForMainSupervisor(topicId);
    }
    return response;
  };

  useEffect(() => {
    if (pathName === "/supervisor/topics") {
      fetchTopicsOfSupervisor();
      getTopicsByCoSupervisor();
    }
  }, []);

  return (
    <SupervisorTopicContext.Provider
      value={{
        topicsOfSupervisor,
        topicsOfCoSupervisor,
        fetchTopicsById,
        fetchTopicsOfSupervisor,
        getPresignedUrlTopicDocument,
        updateTopic
      }}
    >
      {children}
    </SupervisorTopicContext.Provider>
  );
};

export const useSupervisorTopic = () => {
  const context = useContext(SupervisorTopicContext);
  if (context === undefined) {
    throw new Error(
      "useSupervisorTopic must be used within a SupervisorTopicProvider"
    );
  }
  return context;
};

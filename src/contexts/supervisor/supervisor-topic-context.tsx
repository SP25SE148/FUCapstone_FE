"use client";

import { toast } from "sonner";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/use-api";
import { Statistic, Topic } from "@/types/types";

interface SupervisorTopicContextType {
  topicsOfSupervisor: Topic[];
  topicsOfCoSupervisor: Topic[];
  fetchTopicsOfSupervisor: () => Promise<void>;
  fetchTopicsById: (id: string) => Promise<Topic>;
  getPresignedUrlTopicDocument: (id: string) => Promise<string>;
  updateTopic: (topicId: string, data: FormData) => Promise<any>;
  getStatistics: (id: string) => Promise<Statistic[]>;
  reAppraisalTopicForMainSupervisor: (topicId: string) => Promise<any>;
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

  const semanticTopicForSupervisorCreateTopic = async (topicId: string) => {
    const response = await callApi(`fuc/topics/semantic/${topicId}`, {
      method: "POST",
    });
    if (response?.isSuccess === true) {
      toast.success("Semantic topic successfully");
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
      await semanticTopicForSupervisorCreateTopic(topicId);
    }
    return response;
  };

  const getStatistics = async (id: string) => {
    const response = await callApi(`fuc/topics/statistic/${id}`);
    return (response?.value);
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
        updateTopic,
        getStatistics,
        reAppraisalTopicForMainSupervisor
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

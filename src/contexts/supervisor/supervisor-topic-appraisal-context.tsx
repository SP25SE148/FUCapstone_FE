"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";
import { Statistic, TopicAppraisal } from "@/types/types";

interface SupervisorTopicAppraisalContextType {
  topicAppraisals: TopicAppraisal[];
  getStatistics: (id: string) => Promise<Statistic[]>;
  getTopicAppraisalBySelf: () => Promise<void>;
  submitAppraisalForSupervisor: (data: any) => Promise<any>;
  fetchTopicsById: (id: string) => Promise<any>;
  getPresignedUrlTopicDocument: (id: string) => Promise<string>;
  semanticTopicForAppraisalSupervisor: (topicId: string) => Promise<any>;
}

const SupervisorTopicAppraisalContext = createContext<
  SupervisorTopicAppraisalContextType | undefined
>(undefined);

export const SupervisorTopicAppraisalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { callApi } = useApi();
  const [topicAppraisals, setTopicAppraisals] = useState<TopicAppraisal[]>([]);

  const getTopicAppraisalBySelf = async () => {
    const response = await callApi(
      "fuc/topics/get-topic-appraisal-by-self?Status&SearchTerm&OrderByAppraisalDate",
      {
        method: "GET",
      }
    );
    setTopicAppraisals(response?.value);
  };

  const fetchTopicsById = async (id: string) => {
    const response = await callApi(`fuc/topics/${id}`);
    return response?.value;
  };

  const getPresignedUrlTopicDocument = async (id: string) => {
    const response = await callApi(`fuc/topics/presigned/${id}`);
    return response?.value;
  };

  const submitAppraisalForSupervisor = async (data: any) => {
    const response = await callApi(`fuc/topics/appraisal`, {
      method: "POST",
      body: data,
    });
    if (response?.isSuccess === true) {
      toast.success("Appraisal topic successfully");
    }
    return response;
  };

  const getStatistics = async (id: string) => {
    const response = await callApi(`fuc/topics/statistic/${id}`);
    return (response?.value);
  };

  const semanticTopicForAppraisalSupervisor = async (topicId: string) => {
    const response = await callApi(`fuc/topics/semantic/appraisal/${topicId}`, {
      method: "POST",
    });
    if (response?.isSuccess === true) {
      toast.success("Semantic topic successfully");
    }
    return response;
  };

  useEffect(() => {
    getTopicAppraisalBySelf();
  }, []);

  return (
    <SupervisorTopicAppraisalContext.Provider
      value={{
        topicAppraisals,
        getStatistics,
        getTopicAppraisalBySelf,
        submitAppraisalForSupervisor,
        fetchTopicsById,
        getPresignedUrlTopicDocument,
        semanticTopicForAppraisalSupervisor,
      }}
    >
      {children}
    </SupervisorTopicAppraisalContext.Provider>
  );
};

export const useSupervisorTopicAppraisal = () => {
  const context = useContext(SupervisorTopicAppraisalContext);
  if (context === undefined) {
    throw new Error(
      "useSupervisorTopicAppraisal must be used within a SupervisorTopicAppraisalProvider"
    );
  }
  return context;
};

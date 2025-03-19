"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useState, useEffect } from "react";

import { useApi } from "@/hooks/use-api";

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
  fileUrl: string;
  status: string;
  difficultyLevel: string;
  businessAreaName: string;
  capstoneId: string;
  semesterId: string;
  campusId: string;
  createdDate: string;
  coSupervisors: any[];
  topicAppraisals: any[];
}

interface TopicContextProps {
  topics: Topic[];
  fetchTopics: () => Promise<void>;
  submitAppraisal: (data: any) => Promise<any>;
  getPresignedUrlTopicDocument: (id: string) => Promise<string>;
  fetchAssignSupervisor: () => Promise<any>;
  assignTopicAppraisalForSpecificSupervisor: (data: { TopicId: string; SupervisorId: string }) => Promise<any>;
}

const ManagerTopicContext = createContext<TopicContextProps | undefined>(
  undefined
);

export const ManagerTopicProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { callApi } = useApi();
  const [topics, setTopics] = useState<Topic[]>([]);

  const fetchTopics = async () => {
    const response = await callApi("fuc/topics/manager");
    setTopics(response.value || []);
  };

  const fetchAssignSupervisor = async () => {
    const response = await callApi("fuc/User/get-all-supervisor");
    return response?.value;
  };

  const getPresignedUrlTopicDocument = async (id: string) => {
    const response = await callApi(`fuc/topics/presigned/${id}`);
    return response?.value;
  };

  const submitAppraisal = async (data: any) => {
    const response = await callApi("fuc/topics/appraisal/final", {
      method: "POST",
      body: data,
    });
    if (response?.isSuccess === true) {
      toast.success("Appraisal submitted successfully");
      fetchTopics();
    }
    return response;
  };

  const assignTopicAppraisalForSpecificSupervisor = async (data: { TopicId: string; SupervisorId: string }) => {
    const response = await callApi("fuc/topics/assign-topic-appraisal/supervisor", {
      method: "POST",
      body: data,
    });
    if (response?.isSuccess) {
      toast.success("Supervisor assigned successfully!");
      fetchTopics();
    }
    return response;
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <ManagerTopicContext.Provider
      value={{
        topics,
        fetchTopics,
        submitAppraisal,
        fetchAssignSupervisor,
        getPresignedUrlTopicDocument,
        assignTopicAppraisalForSpecificSupervisor
      }}
    >
      {children}
    </ManagerTopicContext.Provider>
  );
};

export const useManagerTopics = () => {
  const context = useContext(ManagerTopicContext);
  if (!context) {
    throw new Error("useManagerTopics must be used within a ManagerTopicProvider");
  }
  return context;
};

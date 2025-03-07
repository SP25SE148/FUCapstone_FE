"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";

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
  status: number;
  difficultyLevel: number;
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
  loading: boolean;
  fetchTopics: () => Promise<void>;
  submitAppraisal: (data: any) => Promise<any>;
  getPresignedUrlTopicDocument: (id: string) => Promise<string>;
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
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const response = await callApi("fuc/topics/manager", {
        method: "GET",
      });

      setTimeout(() => {
        setTopics(response.value || []);
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Error fetching topics", {
        description: `${error}`,
      });
      console.error("Error fetching topics:", error);
      setLoading(false);
    }
  };

  const getPresignedUrlTopicDocument = async (id: string) => {
    const response = await callApi(`fuc/topics/presigned/${id}`, {
      method: "GET",
    });
    return (response?.value);
  };

  const submitAppraisal = async (data: any) => {
    const response =  await callApi("fuc/topics/appraisal/final", {
        method: "POST",
        body: data,
      });
      if(response?.isSuccess === true) {
        toast.success("Appraisal submitted successfully");
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
        loading,
        fetchTopics,
        submitAppraisal,
        getPresignedUrlTopicDocument,
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

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/use-api";
import { usePathname } from "next/navigation";

export interface Topic {
  id: string;
  code: string;
  campusId: string;
  semesterId: string
  capstoneId: string;
  businessAreaName: string;
  difficultyLevel: string;
  englishName: string;
  vietnameseName: string
  abbreviation: string;
  description: string;
  mainSupervisorEmail: string
  mainSupervisorName: string
  coSupervisors: [];
  fileName: string;
  fileUrl: string
  createdDate: string;
  status: string;
  topicAppraisals: [];
}

interface SupervisorTopicContextType {
  topicsOfSupervisor: Topic[];
  fetchTopicsOfSupervisor: () => Promise<void>;
  fetchTopicsById: (id: string) => Promise<Topic>;
  getPresignedUrlTopicDocument: (id: string) => Promise<string>;
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

  const fetchTopicsOfSupervisor = async () => {
    const response = await callApi("fuc/topics/supervisor");
    setTopicsOfSupervisor(response?.value);
  };

  const fetchTopicsById = async (id: string) => {
    const response = await callApi(`fuc/topics/${id}`);
    return (response?.value);
  };

  const getPresignedUrlTopicDocument = async (id: string) => {
    const response = await callApi(`fuc/topics/presigned/${id}`);
    return (response?.value);
  };

  useEffect(() => {
    if (pathName === "/supervisor/topics") {
      fetchTopicsOfSupervisor();
    }
  }, []);

  return (
    <SupervisorTopicContext.Provider
      value={{
        topicsOfSupervisor,
        fetchTopicsById,
        fetchTopicsOfSupervisor,
        getPresignedUrlTopicDocument,
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

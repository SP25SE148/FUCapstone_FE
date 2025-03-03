"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/use-api";

interface BusinessArea {
  id: string;
  name: string;
  description: string;
}

interface Topic {
  id: string;
  code: string;
  campusId: string;
  semesterId: string
  capstoneId: string;
  businessAreaName: string;
  difficultyLevel: number;
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
  status: number
}

interface SupervisorTopicContextType {
  isLoading: boolean;
  topicsOfSupervisor: any;
  businessAreas: BusinessArea[];
  fetchCampusList: () => Promise<[]>;
  fetchSemesterList: () => Promise<[]>;
  fetchBusinessArea: () => Promise<void>;
  fetchCapstoneListByMajor: (majorId: string) => Promise<[]>;
  fetchTopicsOfSupervisor: () => Promise<void>
  registerTopic: (data: FormData) => Promise<void>;
}

const SupervisorTopicContext = createContext<
  SupervisorTopicContextType | undefined
>(undefined);

export const SupervisorTopicProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { callApi } = useApi();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [businessAreas, setBusinessAreas] = useState<BusinessArea[]>([]);
  const [topicsOfSupervisor, setTopicsOfSupervisor] = useState<Topic[]>([]);

  const fetchTopicsOfSupervisor = async () => {
    setIsLoading(true);
    try {
      const response = await callApi("fuc/topics/supervisor", {
        method: "GET",
      });
      setTopicsOfSupervisor(response?.value);
    } finally {
      setIsLoading(false)
    }
  };

  const fetchBusinessArea = async () => {
    try {
      const response = await callApi(`fuc/topics/business`);
      if (response?.isSuccess) {
        setBusinessAreas(response.value);
      } else {
        throw new Error(
          response?.error?.message || "Failed to fetch business areas"
        );
      }
    } catch (error) {
      toast.error("Error getting business areas", {
        description: `${error}`,
      });
      console.error("Error fetching business areas:", error);
    }
  };

  const fetchCapstoneListByMajor = async (majorId: string) => {
    const response = await callApi(`fuc/AcademicManagement/capstone/by-major/${majorId}`, {
      method: "GET",
    });
    return (response?.value);
  };

  const registerTopic = async (data: FormData) => {
    const response = await callApi(`fuc/topics`, {
      method: "POST",
      body: data,
    });
    if (response?.isSuccess === true) {
      toast.success("Topic registered successfully");
      // fetchCTopicList();
    }
    return response;
  };

  const fetchCampusList = async () => {
    const response = await callApi("fuc/AcademicManagement/campus", {
      method: "GET",
    });
    return (response?.value);
  };

  const fetchSemesterList = async () => {
    const response = await callApi("fuc/AcademicManagement/semester", {
      method: "GET",
    });
    return (response?.value);
  };

  useEffect(() => {
    fetchTopicsOfSupervisor();
    fetchBusinessArea();
  }, []);

  return (
    <SupervisorTopicContext.Provider
      value={{
        isLoading,
        businessAreas,
        topicsOfSupervisor,
        registerTopic,
        fetchCampusList,
        fetchSemesterList,
        fetchBusinessArea,
        fetchCapstoneListByMajor,
        fetchTopicsOfSupervisor,
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

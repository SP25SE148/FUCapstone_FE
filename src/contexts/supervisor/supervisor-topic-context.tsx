"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/use-api";

interface BusinessArea {
  id: string;
  name: string;
  description: string;
}

export interface LookupProp {
  mainSupervisorEmail: string,
  searchTerm: string,
  status: string,
  difficultyLevel: string,
  businessAreaId: string,
  capstoneId: string,
  semesterId: string,
  campusId: string,
  pageNumber: string,
}

export interface Topic {
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
  lookupTopics: any;
  topicsOfSupervisor: any;
  businessAreas: BusinessArea[];
  fetchCampusList: () => Promise<[]>;
  fetchSemesterList: () => Promise<[]>;
  fetchCapstoneList: () => Promise<[]>;
  fetchBusinessArea: () => Promise<void>;
  fetchCapstoneListByMajor: (majorId: string) => Promise<[]>;

  fetchTopicsOfSupervisor: () => Promise<void>;
  fetchTopicsById: (id: string) => Promise<Topic>;
  lookupTopic: (data: LookupProp) => Promise<any>;
  registerTopic: (data: FormData) => Promise<void>;
  getPresignedUrlTopicDocument: (id: string) => Promise<string>;

  fetchTopicAppraisalAssigned: () => Promise<[]>;
  submitAppraisalForSupervisor: (data: any) => Promise<any>;
}

const SupervisorTopicContext = createContext<
  SupervisorTopicContextType | undefined
>(undefined);

export const SupervisorTopicProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { callApi } = useApi();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lookupTopics, setLookupTopics] = useState<any>({});
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

  const fetchTopicsById = async (id: string) => {
    const response = await callApi(`fuc/topics/${id}`, {
      method: "GET",
    });
    return (response?.value);
  };

  const getPresignedUrlTopicDocument = async (id: string) => {
    const response = await callApi(`fuc/topics/presigned/${id}`, {
      method: "GET",
    });
    return (response?.value);
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

  const fetchCapstoneList = async () => {
    const response = await callApi("fuc/AcademicManagement/capstone", {
      method: "GET",
    });
    return (response?.value);
  };

  const lookupTopic = async (data: LookupProp) => {
    const response = await callApi(`fuc/topics?MainSupervisorEmail=${data?.mainSupervisorEmail}&SearchTerm=${data?.searchTerm}&Status=${data?.status}&DifficultyLevel=${data?.difficultyLevel}&BusinessAreaId=${data?.businessAreaId}&CapstoneId=${data?.capstoneId}&SemesterId=${data?.semesterId}&CampusId=${data?.campusId}&PageNumber=${data?.pageNumber}&PageSize=5`, {
      method: "GET",
    });
    setLookupTopics(response?.value);
    return response;
  };

  const fetchTopicAppraisalAssigned = async () => {
    const response = await callApi("fuc/topics/get-topic-appraisal-by-self?Status&SearchTerm&OrderByAppraisalDate", {
      method: "GET",
    });
    return (response?.value);
  };

  const submitAppraisalForSupervisor = async (data: any) => {
    const response = await callApi(`fuc/topics/appraisal`, {
      method: "POST",
      body: data,
    });
    if (response?.isSuccess === true) {
      toast.success("Topic registered successfully");
    }
    return response;
  };

  useEffect(() => {
    fetchTopicsOfSupervisor();
    fetchBusinessArea();
  }, []);

  return (
    <SupervisorTopicContext.Provider
      value={{
        isLoading,
        lookupTopics,
        businessAreas,
        topicsOfSupervisor,
        lookupTopic,
        registerTopic,
        fetchTopicsById,
        fetchCampusList,
        fetchSemesterList,
        fetchCapstoneList,
        fetchBusinessArea,
        fetchTopicsOfSupervisor,
        fetchCapstoneListByMajor,
        fetchTopicAppraisalAssigned,
        getPresignedUrlTopicDocument,
        submitAppraisalForSupervisor,
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

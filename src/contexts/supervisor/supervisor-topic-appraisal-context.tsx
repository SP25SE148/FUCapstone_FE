"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";

export interface TopicAppraisal {
    topicAppraisalId: string,
    topicId: string,
    supervisorId: string | null,
    managerId: string | null,
    topicEnglishName: string,
    appraisalContent: string | null,
    appraisalComment: string | null,
    status: string,
    appraisalDate: string | null
}

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

interface SupervisorTopicAppraisalContextType {
    topicAppraisals: TopicAppraisal[];
    getTopicAppraisalBySelf: () => Promise<void>;
    submitAppraisalForSupervisor: (data: any) => Promise<any>;
    fetchTopicsById: (id: string) => Promise<any>;
    getPresignedUrlTopicDocument: (id: string) => Promise<string>;
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
        const response = await callApi("fuc/topics/get-topic-appraisal-by-self?Status&SearchTerm&OrderByAppraisalDate", {
            method: "GET",
        });
        setTopicAppraisals(response?.value);
    };

    const fetchTopicsById = async (id: string) => {
        const response = await callApi(`fuc/topics/${id}`);
        return (response?.value);
      };

      const getPresignedUrlTopicDocument = async (id: string) => {
        const response = await callApi(`fuc/topics/presigned/${id}`);
        return (response?.value);
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

    useEffect(() => {
        getTopicAppraisalBySelf()
    }, []);

    return (
        <SupervisorTopicAppraisalContext.Provider
            value={{
                topicAppraisals,
                getTopicAppraisalBySelf,
                submitAppraisalForSupervisor,
                fetchTopicsById,
                getPresignedUrlTopicDocument
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
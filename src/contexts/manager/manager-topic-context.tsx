"use client";

import { toast } from "sonner";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";

import { useApi } from "@/hooks/use-api";
import { Supervisor, Topic } from "@/types/types";

interface TopicContextProps {
  topics: Topic[] | [];
  supervisors: Supervisor[] | [];
  fetchTopics: () => Promise<void>;
  fetchTopicsById: (id: string) => Promise<Topic>;
  getPresignedUrlTopicDocument: (id: string) => Promise<string>;
  assignTopicAppraisalForSpecificSupervisor: (data: { TopicId: string; SupervisorId: string }) => Promise<any>;
  fetchSupervisorList: () => Promise<void>;
  assignNewSupervisorForTopic: (data: { TopicId: string; SupervisorId: string }) => Promise<any>;
  addNewCoSupervisorForTopicByManager: (data: { TopicId: string; SupervisorId: string }) => Promise<any>;
  removeCosupervisorForTopic: (data: { TopicId: string; SupervisorId: string }) => Promise<any>;
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
  const pathName = usePathname();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);

  const fetchTopics = async () => {
    const response = await callApi("fuc/topics/manager");
    setTopics(response.value || []);
  };

  const fetchTopicsById = async (id: string) => {
    const response = await callApi(`fuc/topics/${id}`);
    return (response?.value);
  };

  const getPresignedUrlTopicDocument = async (id: string) => {
    const response = await callApi(`fuc/topics/presigned/${id}`);
    return response?.value;
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

  const fetchSupervisorList = async () => {
    const response = await callApi("fuc/User/get-all-supervisor");
    setSupervisors(response?.value);
  };

  const assignNewSupervisorForTopic = async (data: { TopicId: string; SupervisorId: string }) => {
    const response = await callApi("fuc/topics/assign/supervisor", {
      method: "PUT",
      body: data,
    });
    if (response?.isSuccess) {
      toast.success("Change supervisor successfully!");
    }
    return response;
  };

  const addNewCoSupervisorForTopicByManager = async (data: { TopicId: string; SupervisorId: string }) => {
    const response = await callApi("fuc/topics/cosupervisor", {
      method: "POST",
      body: data,
    });
    if (response?.isSuccess) {
      toast.success("Add cosupervisor successfully!");
    }
    return response;
  };

  const removeCosupervisorForTopic = async (data: { TopicId: string; SupervisorId: string }) => {
    const response = await callApi("fuc/topics/cosupervisor", {
      method: "DELETE",
      body: data,
    });
    if (response?.isSuccess === true) {
      toast.success("Remove cosupervisor successfully");
    }
    return response;
  };

  useEffect(() => {
    if (pathName == "/manager/topics") {
      fetchTopics();
    }
  }, [pathName]);

  return (
    <ManagerTopicContext.Provider
      value={{
        topics,
        supervisors,
        fetchTopics,
        fetchTopicsById,
        getPresignedUrlTopicDocument,
        assignTopicAppraisalForSpecificSupervisor,
        fetchSupervisorList,
        assignNewSupervisorForTopic,
        addNewCoSupervisorForTopicByManager,
        removeCosupervisorForTopic,
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

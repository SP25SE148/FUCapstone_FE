"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useState, useEffect } from "react";

import { useApi } from "../../hooks/use-api";
import { GroupFullInfo, Topic, TopicRequest } from "@/types/types";

interface StudentTopicContextProps {
  topics: Topic[];
  topicRequest: TopicRequest | null;
  groupInfo: GroupFullInfo | null;
  fetchPassedTopic: () => Promise<void>;
  getPresignedUrlTopicDocument: (id: string) => Promise<string>;
  getGroupInfoByStudentId: () => Promise<any>;
  createTopicRequest: (topicId: string, groupId: string) => Promise<void>;
  fetchTopicRequest: () => Promise<void>;
}

const StudentTopicContext = createContext<StudentTopicContextProps | undefined>(undefined);

export const useStudentTopics = () => {
  const context = useContext(StudentTopicContext);
  if (!context) {
    throw new Error("useStudentTopics must be used within a StudentTopicProvider");
  }
  return context;
};

export const StudentTopicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { callApi } = useApi();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [groupInfo, setGroupInfo] = useState<GroupFullInfo | null>(null);
  const [topicRequest, setTopicRequest] = useState<TopicRequest | null>(null);

  const fetchPassedTopic = async () => {
    const response = await callApi("fuc/group/get-available-topics");
    if (response?.isSuccess) {
      setTopics(response?.value?.items);
    }
  };

  const getPresignedUrlTopicDocument = async (id: string) => {
    const response = await callApi(`fuc/topics/presigned/${id}`);
    return response?.value;
  };

  const getGroupInfoByStudentId = async () => {
    const response = await callApi("fuc/Group/information");
    setGroupInfo(response.value);
  };

  const createTopicRequest = async (topicId: string, groupId: string) => {
    const response = await callApi("fuc/group/create-topic-request", {
      method: "POST",
      body: { TopicId: topicId, GroupId: groupId },
    });
    if (response?.isSuccess === true) {
      toast.success("Register Topic successfully");
      fetchPassedTopic();
      fetchTopicRequest();
    }
  };

  const fetchTopicRequest = async () => {
    const response = await callApi("fuc/Group/get-topic-request");
    if (response?.isSuccess) {
      setTopicRequest(response.value);
    } else {
      setTopicRequest(null);
    }
  }

  useEffect(() => {
    fetchPassedTopic();
    fetchTopicRequest();
    getGroupInfoByStudentId();
  }, []);

  return (
    <StudentTopicContext.Provider
      value={{
        topics,
        topicRequest,
        groupInfo,
        fetchPassedTopic,
        getPresignedUrlTopicDocument,
        getGroupInfoByStudentId,
        createTopicRequest,
        fetchTopicRequest,
      }}
    >
      {children}
    </StudentTopicContext.Provider>
  );
};

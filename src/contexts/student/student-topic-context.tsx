"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useApi } from "../../hooks/use-api";

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

interface GroupInfo {
  id: string;
  semesterName: string;
  majorName: string;
  capstoneName: string;
  campusName: string;
  topicCode: string | null;
  groupCode: string;
  status: string;
  groupMemberList: {
    id: string;
    groupId: string;
    studentId: string;
    studentEmail: string;
    studentFullName: string;
    isLeader: boolean;
    createdBy: string | null;
    createdDate: string;
    status: string;
  }[];
}

interface TopicRequest {
  groupCode: string;
  groupId: string;
  supervisorId: string;
  supervisorFullName: string;
  topicId: string;
  topicCode: string;
  topicEnglishName: string;
  status: string;
  requestedBy: string;
  leaderFullName: string | null;
  createdDate: string;
}

interface StudentTopicContextProps {
  topics: Topic[];
  topicRequest: TopicRequest | null;
  groupInfo: GroupInfo | null;
  fetchPassedTopic: () => Promise<void>;
  getPresignedUrlTopicDocument: (id: string) => Promise<string>;
  getGroupInfoByStudentId: () => Promise<GroupInfo>;
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
  const [topicRequest, setTopicRequest] = useState<TopicRequest | null>(null);
  const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null);

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
    // if (response?.isSuccess) {
      setGroupInfo(response.value);
      // return response.value;
    // } 
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
    setTopicRequest(response.value[response.value.length - 1]);
  };

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

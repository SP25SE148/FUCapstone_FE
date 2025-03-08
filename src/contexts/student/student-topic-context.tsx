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

interface StudentTopicContextProps {
  topics: Topic[];
  fetchPassedTopic: () => Promise<void>;
  getPresignedUrlTopicDocument: (id: string) => Promise<string>;
  getGroupInfoByStudentId: () => Promise<GroupInfo>;
  createTopicRequest: (topicId: string, groupId: string) => Promise<void>;
}

const StudentTopicContext = createContext<StudentTopicContextProps | undefined>(
  undefined
);

export const useStudentTopics = () => {
  const context = useContext(StudentTopicContext);
  if (!context) {
    throw new Error(
      "useStudentTopics must be used within a StudentTopicProvider"
    );
  }
  return context;
};

export const StudentTopicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { callApi } = useApi();
  const [topics, setTopics] = useState<Topic[]>([]);

  const fetchPassedTopic = async () => {
    try {
      const response = await callApi("fuc/group/get-available-topics");
      if (response?.isSuccess) {
        setTopics(response?.value?.items);
      } else {
        throw new Error(response?.error?.message || "Failed to fetch topics");
      }
    } catch (error) {
      toast.error("Error getting topics", {
        description: `${error}`,
      });
      console.error("Failed to fetch topics", error);
    }
  };

  const getPresignedUrlTopicDocument = async (id: string) => {
    const response = await callApi(`fuc/topics/presigned/${id}`);
    return response?.value;
  };

  const getGroupInfoByStudentId = async () => {
    const response = await callApi("fuc/Group/get-by-student-id");
    if (response?.isSuccess) {
      return response.value;
    } else {
      throw new Error(response?.error?.message || "Failed to fetch group info");
    }
  };

  const createTopicRequest = async (topicId: string, groupId: string) => {
    const response = await callApi("fuc/group/create-topic-request", {
      method: "POST",
      body: { TopicId: topicId, GroupId: groupId },
    });
    if (response?.isSuccess === true) {
      toast.success("Register Topic successfully");
      fetchPassedTopic();
    }
  };

  useEffect(() => {
    fetchPassedTopic();
  }, []);

  return (
    <StudentTopicContext.Provider
      value={{
        topics,
        fetchPassedTopic,
        getPresignedUrlTopicDocument,
        getGroupInfoByStudentId,
        createTopicRequest,
      }}
    >
      {children}
    </StudentTopicContext.Provider>
  );
};

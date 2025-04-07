"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useState, useEffect } from "react";

import { useApi } from "../../hooks/use-api";
import { BusinessArea, GroupFullInfo, PassedTopic, PassedTopicProp, Topic, TopicRequest } from "@/types/types";



interface StudentTopicContextProps {
  passedTopicList: PassedTopic;
  businessAreaList: BusinessArea[];
  topicRequest: TopicRequest | null;
  groupInfo: GroupFullInfo | null;
  fetchPassedTopic: (data: PassedTopicProp) => Promise<void>;
  getPresignedUrlTopicDocument: (id: string) => Promise<string>;
  getGroupInfoByStudentId: () => Promise<any>;
  createTopicRequest: (topicId: string, groupId: string) => Promise<void>;
  fetchTopicRequest: () => Promise<void>;
  fetchBusinessArea: () => Promise<void>;
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
  const [passedTopicList, setPassedTopicList] = useState<PassedTopic>({
    items: [],
    totalNumberOfItems: 0,
    currentPage: 0,
    totalNumberOfPages: 0,
  });
  const [groupInfo, setGroupInfo] = useState<GroupFullInfo | null>(null);
  const [topicRequest, setTopicRequest] = useState<TopicRequest | null>(null);
  const [businessAreaList, setBusinessAreaList] = useState<BusinessArea[]>([]);

  const fetchPassedTopic = async (data: PassedTopicProp) => {
    const response = await callApi(`fuc/group/get-available-topics?MainSupervisorEmail=${data?.mainSupervisorEmail}&SearchTerm=${data?.searchTerm}&DifficultyLevel=${data?.difficultyLevel}&BusinessAreaId=${data?.businessAreaId}&PageNumber=${data?.pageNumber}&PageSize=10`);
    if (response?.isSuccess) {
      setPassedTopicList(response?.value);
      return response
    }
  };

  const fetchBusinessArea = async () => {
    const response = await callApi(`fuc/topics/business`);
    setBusinessAreaList(response.value);
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
      fetchPassedTopic({
        mainSupervisorEmail: "all",
        searchTerm: "",
        difficultyLevel: "all",
        businessAreaId: "all",
        pageNumber: "1",
      });
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
    fetchTopicRequest();
    fetchBusinessArea();
    getGroupInfoByStudentId();
  }, []);

  return (
    <StudentTopicContext.Provider
      value={{
        passedTopicList,
        topicRequest,
        groupInfo,
        businessAreaList,
        fetchPassedTopic,
        fetchBusinessArea,
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

"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "../auth-context";
import { useApi } from "../../hooks/use-api";
import { BusinessArea, Capstone } from "@/types/types";

interface SupervisorTopicRegisterContextType {
  capstoneList: Capstone[];
  businessAreaList: BusinessArea[];
  getTopicRegistrationTemplate: () => Promise<string>;
  registerTopic: (data: FormData) => Promise<any>;
}

const SupervisorTopicRegisterContext = createContext<SupervisorTopicRegisterContextType | undefined>(undefined);

export const SupervisorTopicRegisterProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { user } = useAuth();
  const { callApi } = useApi();

  const [capstoneList, setCapstoneList] = useState<Capstone[]>([]);
  const [businessAreaList, setBusinessAreaList] = useState<BusinessArea[]>([]);

  const fetchBusinessArea = async () => {
    const response = await callApi(`fuc/topics/business`);
    setBusinessAreaList(response.value);
  };

  const fetchCapstoneListByMajor = async () => {
    const response = await callApi(`fuc/AcademicManagement/capstone/by-major/${user?.MajorId}`);
    setCapstoneList(response.value);
  };

  const getTopicRegistrationTemplate = async () => {
    const response = await callApi("fuc/Documents/topic-registration");
    return (response?.value);
  };

  const registerTopic = async (data: FormData) => {
    const response = await callApi(`fuc/topics`, {
      method: "POST",
      body: data,
    });
    if (response?.isSuccess === true) {
      toast.success("Topic registered successfully");
    }
    return response;
  };

  useEffect(() => {
    fetchBusinessArea();
  }, []);

  useEffect(() => {
    fetchCapstoneListByMajor();
  }, [user]);

  return (
    <SupervisorTopicRegisterContext.Provider
      value={{
        capstoneList,
        businessAreaList,
        getTopicRegistrationTemplate,
        registerTopic,
      }}
    >
      {children}
    </SupervisorTopicRegisterContext.Provider>
  );
};

export const useSupervisorTopicRegister = () => {
  const context = useContext(SupervisorTopicRegisterContext);
  if (context === undefined) {
    throw new Error(
      "useSupervisorTopicRegister must be used within a SupervisorTopicRegisterProvider"
    );
  }
  return context;
};

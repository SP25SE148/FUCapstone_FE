"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "../../hooks/use-api";
import { toast } from "sonner";

interface BusinessArea {
  id: string;
  name: string;
  description: string;
}

interface SupervisorTopicContextType {
  fetchBusinessArea: () => Promise<void>;
  businessAreas: BusinessArea[];
  registerTopic: (data: FormData) => Promise<void>;
}

const SupervisorTopicContext = createContext<
  SupervisorTopicContextType | undefined
>(undefined);

export const SupervisorTopicProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { callApi } = useApi();
  const [businessAreas, setBusinessAreas] = useState<BusinessArea[]>([]);

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

  useEffect(() => {
    fetchBusinessArea();
  }, []);

  return (
    <SupervisorTopicContext.Provider
      value={{
        fetchBusinessArea,
        businessAreas,
        registerTopic,
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

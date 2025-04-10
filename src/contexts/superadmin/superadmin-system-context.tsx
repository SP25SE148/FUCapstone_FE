"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";
import { SystemConfig } from "@/types/types";

interface SuperadminSystemContextProps {
  systemConfig: SystemConfig | null;
  fetchSystemConfig: () => Promise<void>;
  updateMaxTopicsForCoSupervisors: (data: any) => Promise<void>;
  updateMaxTopicAppraisalsForTopic: (data: any) => Promise<void>;
  updateExpirationTopicRequestDuration: (data: any) => Promise<void>;
  updateExpirationTeamUpDuration: (data: any) => Promise<void>;
  updateMaxAttemptTimesToDefendCapstone: (data: any) => Promise<void>;
  updateMaxAttemptTimesToReviewTopic: (data: any) => Promise<void>;
}

const SuperadminSystemContext = createContext<SuperadminSystemContextProps | undefined>(undefined);

export const useSuperadminSystem = () => {
  const context = useContext(SuperadminSystemContext);
  if (!context) {
    throw new Error("useSuperadminSystem must be used within a SuperadminSystemProvider");
  }
  return context;
};

export const SuperadminSystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { callApi } = useApi();
  const [systemConfig, setSystemConfig] = useState<SystemConfig | null>(null);

  const fetchSystemConfig = async () => {
    const response = await callApi("fuc/configuration/system", {
      method: "GET",
    });
    setSystemConfig(response?.value);
  };

  const updateMaxTopicsForCoSupervisors = async (data: any) => {
    const response: any = await callApi("fuc/configuration/system/MaxTopicsForCoSupervisors", {
      method: "PATCH",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Update max topics for co-supervisors successfully");
    }
    return response
  };

  const updateMaxTopicAppraisalsForTopic = async (data: any) => {
    const response: any = await callApi("/fuc/configuration/system/MaxTopicAppraisalsForTopic", {
      method: "PATCH",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Update max topic appraisals successfully");
    }
    return response
  };

  const updateExpirationTopicRequestDuration = async (data: any) => {
    const response: any = await callApi("fuc/configuration/system/ExpirationTopicRequestDuration", {
      method: "PATCH",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Update expiration topic request duration successfully");
    }
    return response
  };

  const updateExpirationTeamUpDuration = async (data: any) => {
    const response: any = await callApi("fuc/configuration/system/ExpirationTeamUpDuration", {
      method: "PATCH",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Update expiration team up duration successfully");
    }
    return response
  };

  const updateMaxAttemptTimesToDefendCapstone = async (data: any) => {
    const response: any = await callApi("fuc/configuration/system/MaxAttemptTimesToDefendCapstone", {
      method: "PATCH",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Update max attempt times to defend capstone successfully");
    }
    return response
  };

  const updateMaxAttemptTimesToReviewTopic = async (data: any) => {
    const response: any = await callApi("fuc/configuration/system/MaxAttemptTimesToReviewTopic", {
      method: "PATCH",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Update max attempt times to review topic successfully");
    }
    return response
  };

  useEffect(() => {
    fetchSystemConfig();
  }, []);

  return (
    <SuperadminSystemContext.Provider
      value={{
        systemConfig,
        fetchSystemConfig,
        updateMaxTopicsForCoSupervisors,
        updateMaxTopicAppraisalsForTopic,
        updateExpirationTopicRequestDuration,
        updateExpirationTeamUpDuration,
        updateMaxAttemptTimesToDefendCapstone,
        updateMaxAttemptTimesToReviewTopic
      }}
    >
      {children}
    </SuperadminSystemContext.Provider>
  );
};
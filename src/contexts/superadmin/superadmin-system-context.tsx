"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";
import { SystemConfig } from "@/types/types";

interface SuperadminSystemContextProps {
  systemConfig: SystemConfig | null;
  fetchSystemConfig: () => Promise<void>;
  updateMaxTopicsForCoSupervisors: (data: number) => Promise<void>;
  updateMaxTopicAppraisalsForTopic: (data: number) => Promise<void>;
  updateExpirationTopicRequestDuration: (data: number) => Promise<void>;
  updateExpirationTeamUpDuration: (data: number) => Promise<void>;
  updateMaxAttemptTimesToDefendCapstone: (data: number) => Promise<void>;
  updateMaxAttemptTimesToReviewTopic: (data: number) => Promise<void>;
  updateSemanticTopicThroughSemesters: (data: number) => Promise<void>;
  updateProjectProgressRemindInDaysBeforeDueDate: (
    data: number
  ) => Promise<void>;
  updateTimeConfigurationRemindInDaysBeforeDueDate: (
    data: number
  ) => Promise<void>;
  updateMinimumPercentageOfStudentsDefend: (data: number) => Promise<void>;
}

const SuperadminSystemContext = createContext<
  SuperadminSystemContextProps | undefined
>(undefined);

export const useSuperadminSystem = () => {
  const context = useContext(SuperadminSystemContext);
  if (!context) {
    throw new Error(
      "useSuperadminSystem must be used within a SuperadminSystemProvider"
    );
  }
  return context;
};

export const SuperadminSystemProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { callApi } = useApi();
  const [systemConfig, setSystemConfig] = useState<SystemConfig | null>(null);

  const fetchSystemConfig = async () => {
    const response = await callApi("fuc/configuration/system", {
      method: "GET",
    });
    setSystemConfig(response?.value);
  };

  const updateMaxTopicsForCoSupervisors = async (data: number) => {
    const response = await callApi(
      "fuc/configuration/system/MaxTopicsForCoSupervisors",
      {
        method: "PATCH",
        body: data,
      }
    );

    if (response?.isSuccess === true) {
      fetchSystemConfig();
      toast.success("Update successfully");
    }
    return response;
  };

  const updateMaxTopicAppraisalsForTopic = async (data: number) => {
    const response = await callApi(
      "/fuc/configuration/system/MaxTopicAppraisalsForTopic",
      {
        method: "PATCH",
        body: data,
      }
    );

    if (response?.isSuccess === true) {
      fetchSystemConfig();
      toast.success("Update successfully");
    }
    return response;
  };

  const updateExpirationTopicRequestDuration = async (data: number) => {
    const response = await callApi(
      "fuc/configuration/system/ExpirationTopicRequestDuration",
      {
        method: "PATCH",
        body: data,
      }
    );

    if (response?.isSuccess === true) {
      fetchSystemConfig();
      toast.success("Update successfully");
    }
    return response;
  };

  const updateExpirationTeamUpDuration = async (data: number) => {
    const response = await callApi(
      "fuc/configuration/system/ExpirationTeamUpDuration",
      {
        method: "PATCH",
        body: data,
      }
    );

    if (response?.isSuccess === true) {
      fetchSystemConfig();
      toast.success("Update successfully");
    }
    return response;
  };

  const updateMaxAttemptTimesToDefendCapstone = async (data: number) => {
    const response = await callApi(
      "fuc/configuration/system/MaxAttemptTimesToDefendCapstone",
      {
        method: "PATCH",
        body: data,
      }
    );

    if (response?.isSuccess === true) {
      fetchSystemConfig();
      toast.success("Update successfully");
    }
    return response;
  };

  const updateMaxAttemptTimesToReviewTopic = async (data: number) => {
    const response = await callApi(
      "fuc/configuration/system/MaxAttemptTimesToReviewTopic",
      {
        method: "PATCH",
        body: data,
      }
    );

    if (response?.isSuccess === true) {
      fetchSystemConfig();
      toast.success("Update successfully");
    }
    return response;
  };

  const updateSemanticTopicThroughSemesters = async (data: number) => {
    const response = await callApi(
      "fuc/configuration/system/SemanticTopicThroughSemesters",
      {
        method: "PATCH",
        body: data,
      }
    );

    if (response?.isSuccess === true) {
      fetchSystemConfig();
      toast.success("Update successfully");
    }
    return response;
  };

  const updateTimeConfigurationRemindInDaysBeforeDueDate = async (
    data: number
  ) => {
    const response = await callApi(
      "fuc/configuration/system/TimeConfigurationRemindInDaysBeforeDueDate",
      {
        method: "PATCH",
        body: data,
      }
    );

    if (response?.isSuccess === true) {
      fetchSystemConfig();
      toast.success("Update successfully");
    }
    return response;
  };

  const updateProjectProgressRemindInDaysBeforeDueDate = async (
    data: number
  ) => {
    const response = await callApi(
      "fuc/configuration/system/ProjectProgressRemindInDaysBeforeDueDate",
      {
        method: "PATCH",
        body: data,
      }
    );

    if (response?.isSuccess === true) {
      fetchSystemConfig();
      toast.success("Update successfully");
    }
    return response;
  };

  const updateMinimumPercentageOfStudentsDefend = async (
    data: number
  ) => {
    const response = await callApi(
      "fuc/configuration/system/MinimumPercentageOfStudentsDefend",
      {
        method: "PATCH",
        body: data,
      }
    );

    if (response?.isSuccess === true) {
      fetchSystemConfig();
      toast.success("Update successfully");
    }
    return response;
  };

  useEffect(() => {
    fetchSystemConfig();
  }, []);

  return (
    <SuperadminSystemContext.Provider
      value={{
        systemConfig,
        fetchSystemConfig,
        updateExpirationTeamUpDuration,
        updateMaxTopicsForCoSupervisors,
        updateMaxTopicAppraisalsForTopic,
        updateMaxAttemptTimesToReviewTopic,
        updateSemanticTopicThroughSemesters,
        updateExpirationTopicRequestDuration,
        updateMaxAttemptTimesToDefendCapstone,
        updateMinimumPercentageOfStudentsDefend,
        updateProjectProgressRemindInDaysBeforeDueDate,
        updateTimeConfigurationRemindInDaysBeforeDueDate,
      }}
    >
      {children}
    </SuperadminSystemContext.Provider>
  );
};

"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";
import { DefenseCalendar, ReviewResult } from "@/types/types";

interface SupervisorDefenseContextProps {
  defenseCalendar: DefenseCalendar;
  getDefenseThesisTemplate: () => Promise<string>;
  getThesisPresignedUrl: (calendarId: string) => Promise<string>;
  getReviewResultByGroupId: (groupId: string) => Promise<ReviewResult[]>;
  importThesisDefendCapstoneMinute: (data: any) => Promise<void>;
  getDefendCapstoneCalendarById: (id: string) => Promise<any>;
  getPresignUrlOfGroupDocument: (groupId: string) => Promise<string>;
  updatePresidentDecisionForGroupStatus: (data: {
    IsReDefendCapstoneProject: boolean;
    CalendarId: string;
  }) => Promise<void>;
}

const SupervisorDefenseContext = createContext<
  SupervisorDefenseContextProps | undefined
>(undefined);

export const SupervisorDefenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { callApi } = useApi();
  const [defenseCalendar, setDefenseCalendar] = useState<DefenseCalendar>({});

  const getThesisPresignedUrl = async (calendarId: string) => {
    const response = await callApi(`fuc/user/defend/thesis/${calendarId}`);
    return response?.value;
  };

  const getDefenseCalendar = async () => {
    const response = await callApi("fuc/user/defend/calendar");
    setDefenseCalendar(response?.value);
  };

  const updatePresidentDecisionForGroupStatus = async (data: {
    IsReDefendCapstoneProject: boolean;
    CalendarId: string;
  }): Promise<void> => {
    const response = await callApi(
      `fuc/user/defend/president-decision-status`,
      {
        method: "PUT",
        body: data,
      }
    );
    if (response?.isSuccess === true) {
      toast.success("Update President Decision For Group Status successfully");
      getDefenseCalendar();
    }
    return response;
  };

  const getDefendCapstoneCalendarById = async (id: string): Promise<any> => {
    const response = await callApi(`fuc/user/defend/calendar/${id}`, {
      method: "GET",
    });
    return response?.value;
  };

  const getDefenseThesisTemplate = async () => {
    const response = await callApi("fuc/Documents/thesis-minutes");
    return (response?.value);
};

  const importThesisDefendCapstoneMinute = async (data: any) => {
    const response: any = await callApi("fuc/user/defend/thesis", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Import Thesis Defend Capstone Minute successfully");
    }
    return response;
  };

  const getPresignUrlOfGroupDocument = async (groupId: string) => {
    const response = await callApi(`fuc/group/documents/${groupId}`);
    return (response?.value);
  };

  const getReviewResultByGroupId = async (groupId: string) => {
    const response = await callApi(`fuc/user/review-calendar-result/${groupId}`);
    return (response?.value);
};

  useEffect(() => {
    getDefenseCalendar();
  }, []);

  return (
    <SupervisorDefenseContext.Provider
      value={{
        defenseCalendar,
        getThesisPresignedUrl,
        getDefenseThesisTemplate,
        getReviewResultByGroupId,
        getPresignUrlOfGroupDocument,
        getDefendCapstoneCalendarById,
        importThesisDefendCapstoneMinute,
        updatePresidentDecisionForGroupStatus,
      }}
    >
      {children}
    </SupervisorDefenseContext.Provider>
  );
};

export const useSupervisorDefense = () => {
  const context = useContext(SupervisorDefenseContext);
  if (!context) {
    throw new Error(
      "useSupervisorDefense must be used within a SupervisorDefenseProvider"
    );
  }
  return context;
};

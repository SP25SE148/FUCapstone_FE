"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "@/hooks/use-api";
import { DefenseCalendar } from "@/types/types";

interface SupervisorDefenseContextProps {
  defenseCalendar: DefenseCalendar[] | [];
  getThesisPresignedUrl: (calendarId: string) => Promise<string>;
  importThesisDefendCapstoneMinute: (data: any) => Promise<void>;
  getDefendCapstoneCalendarById: (id: string) => Promise<any>;
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
  const [defenseCalendar, setDefenseCalendar] = useState<DefenseCalendar[]>([]);

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
      
    }
    return response;
  };

  const getDefendCapstoneCalendarById = async (id: string): Promise<any> => {
    const response = await callApi(`fuc/user/defend/calendar/${id}`, {
      method: "GET",
    });
    return response?.value;
  };

  const importThesisDefendCapstoneMinute = async (data: any) => {
    const response: any = await callApi("fuc/user/defend/thesis", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Import Thesis Defend Capstone Minute successfully");
      getDefenseCalendar();
    }
    return response;
  };

  useEffect(() => {
    getDefenseCalendar();
  }, []);

  return (
    <SupervisorDefenseContext.Provider
      value={{
        defenseCalendar,
        getThesisPresignedUrl,
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

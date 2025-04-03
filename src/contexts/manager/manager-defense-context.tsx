"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";
import { Decision } from "@/types/types";
// import { DefenseCalendar } from "@/types/types";

export interface CouncilMember {
  id: string;
  supervisorId: string;
  supervisorName: string;
  isPresident: boolean;
  isSecretary: boolean;
}

export interface DefenseCalendarItem {
  id: string;
  topicId: string;
  topicCode: string;
  groupId: string;
  groupCode: string;
  campusId: string;
  semesterId: string;
  defendAttempt: number;
  location: string;
  slot: number;
  defenseDate: string;
  councilMembers: CouncilMember[];
}

export interface DefenseCalendar {
  defenseDate: string;
  calendars: DefenseCalendarItem[];
}

interface ManagerDefenseContextProps {
  defenseCalendar: DefenseCalendar[] | [];
  getGroupDecisionByManager: (status: any) => Promise<Decision[]>;
  getDefensesCalendarTemplate: () => Promise<string>;
  importDefenseCalendar: (data: any) => Promise<void>;
}

const ManagerDefenseContext = createContext<
  ManagerDefenseContextProps | undefined
>(undefined);

export const ManagerDefenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { callApi } = useApi();
  const [defenseCalendar, setDefenseCalendar] = useState<DefenseCalendar[]>([]);

  const getGroupDecisionByManager = async (status: any) => {
    const response = await callApi(`fuc/group/group-decision/${status}`);
    return response?.value;
  };

  const getDefensesCalendarTemplate = async () => {
    const response = await callApi("fuc/Documents/defense-calendar");
    return response?.value;
  };

  const getDefenseCalendar = async () => {
    const response = await callApi("fuc/user/defend/calendar/manager");
    setDefenseCalendar(response?.value);
  };

  const importDefenseCalendar = async (data: any) => {
    const response: any = await callApi("fuc/user/defend/calendar", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      getDefenseCalendar();
      toast.success("Import denfense calendar successfully");
    }
    return response;
  };

  useEffect(() => {
    getDefenseCalendar();
  }, []);

  return (
    <ManagerDefenseContext.Provider
      value={{
        defenseCalendar,
        getGroupDecisionByManager,
        getDefensesCalendarTemplate,
        importDefenseCalendar,
      }}
    >
      {children}
    </ManagerDefenseContext.Provider>
  );
};

export const useManagerDefense = () => {
  const context = useContext(ManagerDefenseContext);
  if (!context) {
    throw new Error(
      "useManagerDefense must be used within a ManagerDefenseProvider"
    );
  }
  return context;
};

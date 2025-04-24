"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";
import { Decision, DefenseCalendar, Semester } from "@/types/types";


interface ManagerDefenseContextProps {
  semesters: Semester[];
  defenseCalendar: DefenseCalendar;
  getGroupDecisionByManager: (status: any) => Promise<Decision[]>;
  exportGroupDecisionByStatus: (status: any) => Promise<any>;
  getDefensesCalendarTemplate: () => Promise<string>;
  getSemestersBetweenCurrentDate: () => Promise<void>
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
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [defenseCalendar, setDefenseCalendar] = useState<DefenseCalendar>({});

  const getGroupDecisionByManager = async (status: any) => {
    const response = await callApi(`fuc/group/group-decision?status=${status}`);
    return response?.value;
  };

  const exportGroupDecisionByStatus = async (status: any) => {
    const response = await callApi(`fuc/user/export/defend-calendar/${status}`, {
      responseType: "blob"
    }
    );
    return (response);
  };

  const getDefensesCalendarTemplate = async () => {
    const response = await callApi("fuc/Documents/defense-calendar");
    return response?.value;
  };

  const getDefenseCalendar = async () => {
    const response = await callApi("fuc/user/defend/calendar/manager");
    setDefenseCalendar(response?.value);
  };

  const getSemestersBetweenCurrentDate = async () => {
    const response = await callApi("fuc/AcademicManagement/semester/get-semesters-between-current-date");
    setSemesters(response?.value || []);
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
        semesters,
        defenseCalendar,
        getGroupDecisionByManager,
        exportGroupDecisionByStatus,
        getDefensesCalendarTemplate,
        getSemestersBetweenCurrentDate,
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

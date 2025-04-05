"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";
import { DefenseCalendarItem, DefenseResult } from "@/types/types";

interface StudentDefenseContextProps {
  defenseCalendar: DefenseCalendarItem[] | [];
  getDefendResultByGroupId: (groupId: string) => Promise<DefenseResult[]>;
}

const StudentDefenseContext = createContext<
  StudentDefenseContextProps | undefined
>(undefined);

export const StudentDefenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { callApi } = useApi();
  const pathName = usePathname();
  const [defenseCalendar, setDefenseCalendar] = useState<DefenseCalendarItem[]>([]);

  const getDefenseCalendar = async () => {
    const response = await callApi("fuc/user/student/defend-calendar");
    setDefenseCalendar(response?.value);
  };

  const getDefendResultByGroupId = async (groupId: string) => {
    const response = await callApi(`fuc/user/defend-calendar/result/${groupId}`);
    return (response?.value);
  };

  useEffect(() => {
    if (pathName == "/student/defenses") {
      getDefenseCalendar();
    }
  }, [pathName]);

  return (
    <StudentDefenseContext.Provider
      value={{
        defenseCalendar,
        getDefendResultByGroupId
      }}
    >
      {children}
    </StudentDefenseContext.Provider>
  );
};

export const useStudentDefense = () => {
  const context = useContext(StudentDefenseContext);
  if (!context) {
    throw new Error(
      "useStudentDefense must be used within a StudentDefenseProvider"
    );
  }
  return context;
};

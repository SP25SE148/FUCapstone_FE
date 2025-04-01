"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "@/hooks/use-api";
// import { DefenseCalendar } from "@/types/types";

export interface CouncilMember {
  id: string;
  supervisorId: string;
  defendCapstoneProjectInformationCalendarId: string;
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
  defenseDate: string;
  location: string;
  slot: number;
  councilMembers: CouncilMember[];
}

export interface DefenseCalendar {
  [key: string]: DefenseCalendarItem[]
}

interface StudentDefenseContextProps {
  defenseCalendar: DefenseCalendar[] | [];
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
  const [defenseCalendar, setDefenseCalendar] = useState<DefenseCalendar[]>([]);

  const getDefenseCalendar = async () => {
    const response = await callApi("fuc/user/defend/calendar");
    setDefenseCalendar(response?.value);
  };

  
  useEffect(() => {
    getDefenseCalendar();
  }, []);

  return (
    <StudentDefenseContext.Provider
      value={{
        defenseCalendar
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

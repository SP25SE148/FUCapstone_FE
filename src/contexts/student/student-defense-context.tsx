"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "@/hooks/use-api";


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
  status: string;
  councilMembers: CouncilMember[];
}

interface StudentDefenseContextProps {
  defenseCalendar: DefenseCalendarItem;
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
  const [defenseCalendar, setDefenseCalendar] = useState<DefenseCalendarItem>({});
  

  const getDefenseCalendar = async () => {
    const response = await callApi("fuc/user/student/defend-calendar");
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

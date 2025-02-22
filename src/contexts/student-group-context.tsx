"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-context";
import { useApi } from "../hooks/use-api";
import { toast } from "sonner";

interface Group {
  id: string;
  fullName: string;
  majorId: string;
  majorName: string;
  capstoneId: string;
  capstoneName: string;
  campusId: string;
  campusName: string;
  email: string;
  isEligible: boolean;
  status: string;
  businessArea: string;
  studentExpertises: string[];
  isHaveBeenJoinGroup: boolean;
}

interface StudentGroupContextType {
  groupInfo: Group | null;
  fetchGroupInfo: () => Promise<void>;
  createGroup: (data: any) => Promise<void>;
}

const StudentGroupContext = createContext<StudentGroupContextType | undefined>(undefined);

export const StudentGroupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { callApi } = useApi();
  const [groupInfo, setGroupInfo] = useState<Group | null>(null);

  const fetchGroupInfo = async () => {
    try {
      const response = await callApi("fuc/Group", {
        method: "GET",
      });
      setGroupInfo(response?.value);
    } catch (error) {
      toast.error("Error fetching group info", {
        description: `${error}`
      });
    }
  };

  const createGroup = async (data: any) => {
    const response = await callApi("fuc/Group", {
      method: "POST",
      body: data,
    });
    if (response?.isSuccess === true) {
      toast.success("Create group successfully")
      fetchGroupInfo();
    }
    return response;
  };

  return (
    <StudentGroupContext.Provider value={{ groupInfo, fetchGroupInfo, createGroup }}>
      {children}
    </StudentGroupContext.Provider>
  );
};

export const useStudentGroup = () => {
  const context = useContext(StudentGroupContext);
  if (context === undefined) {
    throw new Error("useStudentGroup must be used within a StudentGroupProvider");
  }
  return context;
};
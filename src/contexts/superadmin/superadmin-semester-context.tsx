"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";

interface Semester {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string | null;
  createdBy: string;
  updatedBy: string | null;
  deletedAt: string | null;
}

interface SemesterContextProps {
  semesters: Semester[];
  loading: boolean;
  fetchSemesterList: () => Promise<void>;
}

const SuperadminSemesterContext = createContext<SemesterContextProps | undefined>(undefined);

export const SuperadminSemesterProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSemesterList = async () => {
    setLoading(true);
    try {
      const response = await callApi("fuc/AcademicManagement/semester", {
        method: "GET",
      });

      setTimeout(() => {
        setSemesters(response || []);
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Error fetching semester data", {
        description: `${error}`,
      });
      console.error("Error fetching semester data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSemesterList();
  }, []);

  return (
    <SuperadminSemesterContext.Provider
      value={{
        semesters,
        loading,
        fetchSemesterList,
      }}
    >
      {children}
    </SuperadminSemesterContext.Provider>
  );
};

export const useSemester = () => {
  const context = useContext(SuperadminSemesterContext);
  if (!context) {
    throw new Error("useSemester must be used within a SuperadminSemesterProvider");
  }
  return context;
};
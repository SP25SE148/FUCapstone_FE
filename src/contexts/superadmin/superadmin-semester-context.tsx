"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useApi } from "@/hooks/use-api";
import { Semester } from "@/types/types";


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
      const response = await callApi("fuc/AcademicManagement/semester", {
        method: "GET",
      });

      setTimeout(() => {
        setSemesters(response?.value || []);
        setLoading(false);
      }, 1000);
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
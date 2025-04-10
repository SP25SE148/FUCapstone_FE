"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useState, useEffect } from "react";

import { useApi } from "@/hooks/use-api";
import { Semester } from "@/types/types";

interface SemesterContextProps {
  semesters: Semester[];
  loading: boolean;
  createSemester: (semester: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
  }) => Promise<void>;
  updateSemester: (semester: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
  }) => Promise<void>;
  fetchSemesterList: () => Promise<void>;
}

const SuperadminSemesterContext = createContext<SemesterContextProps | undefined>(undefined);

export const SuperadminSemesterProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [loading, setLoading] = useState<boolean>(false);
  const [semesters, setSemesters] = useState<Semester[]>([]);

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

  const createSemester = async (semester: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
  }) => {
    const response = await callApi("fuc/AcademicManagement/semester", {
      method: "POST",
      body: semester,
    });

    if (response?.isSuccess) {
      toast.success("Semester created successfully!");
      fetchSemesterList();
    }
  };

  const updateSemester = async (semester: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
  }) => {
    const response = await callApi("fuc/AcademicManagement/semester", {
      method: "PUT",
      body: semester,
    });

    if (response?.isSuccess) {
      toast.success("Semester updated successfully!");
      fetchSemesterList(); // Refresh the semester list after updating
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
        updateSemester,
        createSemester,
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
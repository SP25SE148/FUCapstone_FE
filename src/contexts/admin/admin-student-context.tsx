"use client"

import { toast } from 'sonner';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { useApi } from '@/hooks/use-api';

interface Student {
  id: string,
  fullName: string,
  majorId: string,
  majorName: string,
  capstoneId: string,
  capstoneName: string,
  campusId: string,
  campusName: string,
  email: string,
  isEligible: boolean,
  status: string
}

interface AdminStudentContextProps {
  isLoading: boolean;
  students: Student[];
  fetchMajorList: () => Promise<[]>;
  fetchStudentList: () => Promise<void>;
  addStudent: (data: any) => Promise<void>;
  importStudent: (data: any) => Promise<void>;
  fetchCapstoneListByMajor: (majorId: string) => Promise<[]>;
}

const AdminStudentContext = createContext<AdminStudentContextProps | undefined>(undefined);

export const AdminStudentProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchStudentList = async () => {
    const response = await callApi("fuc/User/get-all-student");
    setStudents(response?.value);
  };

  const addStudent = async (data: any) => {
    const response: any = await callApi("identity/Users/students", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Add student successfully");
      setTimeout(() => {
        fetchStudentList();
      }, 10000);
    }
    return response
  };

  const importStudent = async (data: any) => {
    const response: any = await callApi("identity/Users/import/students", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Import student successfully");
      setTimeout(() => {
        fetchStudentList();
      }, 10000);
    }
    return response
  };

  const fetchMajorList = async () => {
    const response = await callApi("fuc/AcademicManagement/major");
    return (response?.value);
  };

  const fetchCapstoneListByMajor = async (majorId: string) => {
    const response = await callApi(`fuc/AcademicManagement/capstone/by-major/${majorId}`);
    return (response?.value);
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      fetchStudentList();
    } finally {
      setIsLoading(false)
    }
  }, []);

  return (
    <AdminStudentContext.Provider
      value={{ students, isLoading, fetchStudentList, addStudent, importStudent, fetchMajorList, fetchCapstoneListByMajor }}
    >
      {children}
    </AdminStudentContext.Provider>
  );
};

export const useAdminStudent = () => {
  const context = useContext(AdminStudentContext);
  if (!context) {
    throw new Error("useAdminStudent must be used within a AdminStudentProvider");
  }
  return context;
};
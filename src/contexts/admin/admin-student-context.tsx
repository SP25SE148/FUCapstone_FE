"use client"

import { toast } from 'sonner';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { useApi } from '@/hooks/use-api';
import { Capstone, Major, Student } from '@/types/types';

interface AdminStudentContextProps {
  students: Student[];
  fetchStudentList: () => Promise<void>;
  fetchMajorList: () => Promise<Major[]>;
  addStudent: (data: any) => Promise<void>;
  getStudentsTemplate: () => Promise<string>;
  importStudent: (data: any) => Promise<void>;
  fetchCapstoneListByMajor: (majorId: string) => Promise<Capstone[]>;
}

const AdminStudentContext = createContext<AdminStudentContextProps | undefined>(undefined);

export const AdminStudentProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [students, setStudents] = useState<Student[]>([]);

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

  const getStudentsTemplate = async () => {
    const response = await callApi("fuc/Documents/students");
    return (response?.value);
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
    fetchStudentList();
  }, []);

  return (
    <AdminStudentContext.Provider
      value={{ students, fetchStudentList, addStudent, getStudentsTemplate, importStudent, fetchMajorList, fetchCapstoneListByMajor }}
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
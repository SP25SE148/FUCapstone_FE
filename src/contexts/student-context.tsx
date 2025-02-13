"use client"

import { toast } from 'sonner';
import React, { createContext, useContext } from 'react';

import { useApi } from '@/hooks/use-api';

interface Student {
  studentCode: string,
  email: string,
  userName: string,
  majorId: string,
  capstoneId: string,
  campusId: string,
}

interface StudentContextProps {
  addStudent: (data: Student) => Promise<void>;
  importStudent: (data: any) => Promise<void>;
}

const StudentContext = createContext<StudentContextProps | undefined>(undefined);

export const StudentProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();

  const addStudent = async (data: Student) => {
    const response: any = await callApi("identity/Users/students", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Add student successfully")
    }
    return response
  };

  const importStudent = async (data: any) => {
    const response: any = await callApi("identity/Users/import/students", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Import student successfully")
    }
    return response
  };

  return (
    <StudentContext.Provider
      value={{ addStudent, importStudent }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
};
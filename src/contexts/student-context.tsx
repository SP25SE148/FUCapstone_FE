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

interface StudentContextProps {
  isLoading: boolean;
  students: Student[];
  fetchMajorList: () => Promise<[]>;
  fetchStudentList: () => Promise<void>;
  addStudent: (data: any) => Promise<void>;
  importStudent: (data: any) => Promise<void>;
  fetchCapstoneListByMajor: (majorId: string) => Promise<[]>;
}

const StudentContext = createContext<StudentContextProps | undefined>(undefined);

export const StudentProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchStudentList = async () => {
    setIsLoading(true);
    try {
      const response = await callApi("fuc/User/get-all-student", {
        method: "GET",
      });
      setStudents(response?.value);
    } finally {
      setIsLoading(false)
    }
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
    const response = await callApi("fuc/AcademicManagement/major", {
      method: "GET",
    });
    return (response?.value);
  };

  const fetchCapstoneListByMajor = async (majorId: string) => {
    const response = await callApi(`fuc/AcademicManagement/capstone/by-major/${majorId}`, {
      method: "GET",
    });
    return (response?.value);
  };

  useEffect(() => {
    fetchStudentList();
  }, []);

  return (
    <StudentContext.Provider
      value={{ students, isLoading, fetchStudentList, addStudent, importStudent, fetchMajorList, fetchCapstoneListByMajor }}
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
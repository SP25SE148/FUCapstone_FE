"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from '@/hooks/use-api';
import { toast } from 'sonner';

interface Student {
  studentCode: string,
  email: string,
  userName: string,
  majorId: string,
  capstoneId: string,
  campusId: string,
}

interface StudentContextProps {
  // campuses: Student[];
  // fetchCampusList: () => Promise<void>;
  addStudent: (data: Student) => Promise<void>;
  // updateCampus: (data: Student) => Promise<void>;
  // removeCampus: (id: string) => Promise<void>;
}

const StudentContext = createContext<StudentContextProps | undefined>(undefined);

export const StudentProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [campuses, setCampuses] = useState<Student[]>([]);

  // const fetchStudentList = async () => {
  //   try {
  //     const response = await callApi("fuc/AcademicManagement/campus", {
  //       method: "GET",
  //     });

  //     if (!Array.isArray(response)) {
  //       throw new Error("Invalid response format");
  //     }

  //     setCampuses(response);
  //   } catch (error) {
  //     console.error("Error fetching campus data:", error);
  //   }
  // };

  const addStudent = async (data: Student) => {
    try {
      const response = await callApi("identity/Users/students", {
        method: "POST",
        body: data,
      });

      if (response.status == 200) {
        // setCampuses((prev) => [...prev, response]);
        // alert("Campus added successfully");
        toast.success(response.detail)
      } else {
        // alert("Failed to add campus");
        toast.error(response.detail)
      }
    } catch (error) {
      console.error("Error adding campus:", error);
      alert("Failed to add campus");
    }
  };

  // const updateCampus = async (data: Campus) => {
  //   try {
  //     const response = await callApi("fuc/AcademicManagement/campus", {
  //       method: "PUT",
  //       body: data,
  //     });

  //     if (response && response.id) {
  //       setCampuses((prev) =>
  //         prev.map((campus) => (campus.id === data.id ? response : campus))
  //       );
  //       alert("Campus updated successfully");
  //     } else {
  //       throw new Error("Failed to update campus");
  //     }
  //   } catch (error) {
  //     console.error("Error updating campus:", error);
  //     alert("Failed to update campus");
  //   }
  // };

  // const removeCampus = async (id: string) => {
  //   try {
  //     await callApi(`fuc/AcademicManagement/campus/${id}`, {
  //       method: "DELETE",
  //     });
  //     setCampuses((prev) => prev.filter((campus) => campus.id !== id));
  //     alert("Campus removed successfully");
  //   } catch (error) {
  //     console.error("Error removing campus:", error);
  //     alert("Failed to remove campus");
  //   }
  // };

  // useEffect(() => {
  //   fetchCampusList();
  // }, []);

  return (
    <StudentContext.Provider
      value={{ addStudent }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useCampus must be used within a CampusProvider");
  }
  return context;
};
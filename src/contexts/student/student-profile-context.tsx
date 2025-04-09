"use client";

import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "../auth-context";
import { useApi } from "../../hooks/use-api";
import { BusinessArea, Student } from "@/types/types";

interface StudentProfileContextType {
  studentProfile: Student | null;
  businessAreas: BusinessArea[];
  loading: boolean;
  fetchStudentProfile: () => Promise<void>;
  fetchBusinessArea: () => Promise<void>;
  updateStudentProfile: (data: {
    businessAreaId: string;
    GPA: number;
  }) => Promise<void>;
}

const StudentProfileContext = createContext<
  StudentProfileContextType | undefined
>(undefined);

export const StudentProfileProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const router = useRouter();
  const { user } = useAuth();
  const { callApi } = useApi();
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(false);
  const [businessAreas, setBusinessAreas] = useState<BusinessArea[]>([]);
  const [studentProfile, setStudentProfile] = useState<Student | null>(null);

  const fetchStudentProfile = async () => {
    if (user) {
      const response = await callApi(`fuc/User/student/${user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"]}`);
      setStudentProfile(response?.value);
    }
  };

  const fetchBusinessArea = async () => {
    const response = await callApi(`fuc/topics/business`);
    setBusinessAreas(response?.value);
  };

  const updateStudentProfile = async (data: {
    businessAreaId: string;
    GPA: number;
  }) => {
    const response = await callApi(`fuc/User/student`, {
      method: "PUT",
      body: data,
    });

    if (response?.isSuccess) {
      toast.success("Profile updated successfully");
      router.push("/student/home");
      fetchStudentProfile();
    }
    return response;
  };

  useEffect(() => {
    fetchStudentProfile();
  }, [user]);

  useEffect(() => {
    if (studentProfile) {
      if (studentProfile?.businessArea === "" && studentProfile?.gpa === 0) {
        router.push("/student/home");
      }
    }
  }, [studentProfile, router, pathname]);

  return (
    <StudentProfileContext.Provider
      value={{
        loading,
        businessAreas,
        studentProfile,
        fetchBusinessArea,
        fetchStudentProfile,
        updateStudentProfile,
      }}
    >
      {children}
    </StudentProfileContext.Provider>
  );
};

export const useStudentProfile = () => {
  const context = useContext(StudentProfileContext);
  if (context === undefined) {
    throw new Error(
      "useStudentProfile must be used within a StudentProfileProvider"
    );
  }
  return context;
};
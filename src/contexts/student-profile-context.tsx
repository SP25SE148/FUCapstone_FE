"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-context";
import { useApi } from "../hooks/use-api";
import { toast } from "sonner";

interface StudentProfile {
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

interface StudentProfileContextType {
  studentProfile: StudentProfile | null;
  fetchStudentProfile: () => Promise<void>;
  updateStudentProfile: (data: Partial<StudentProfile>) => void;
}

const StudentProfileContext = createContext<StudentProfileContextType | undefined>(undefined);

export const StudentProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { callApi } = useApi();
  const router = useRouter();
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStudentProfile = async () => {
    setLoading(true);
    try {
      if (user) {
        const response = await callApi(
          `fuc/User/student/${user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}`
        );

        if (response?.isSuccess) {
          setStudentProfile(response.value);
          if (!response.value.businessArea || response.value.studentExpertises.length === 0) {
            router.push("/student/update-information");
          } else {
            router.push("/student/home");
          }
        } else {
          throw new Error(response?.error?.message || "Failed to fetch student profile");
        }
      }
    } catch (error) {
      toast.error("Error getting student profile", {
        description: `${error}`,
      });
      console.error("Error fetching student profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStudentProfile = (data: Partial<StudentProfile>) => {
    setStudentProfile((prevProfile) => {
      if (prevProfile) {
        return { ...prevProfile, ...data };
      }
      return prevProfile;
    });
  };

  useEffect(() => {
    fetchStudentProfile();
  }, [user]);

  return (
    <StudentProfileContext.Provider value={{ studentProfile, fetchStudentProfile, updateStudentProfile }}>
      {children}
    </StudentProfileContext.Provider>
  );
};

export const useStudentProfile = () => {
  const context = useContext(StudentProfileContext);
  if (context === undefined) {
    throw new Error("useStudentProfile must be used within a StudentProfileProvider");
  }
  return context;
};
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
  mark: number;
  businessArea: string;
  isHaveBeenJoinGroup: boolean;
}

interface BusinessArea {
  id: string;
  name: string;
  description: string;
}

interface StudentProfileContextType {
  studentProfile: StudentProfile | null;
  businessAreas: BusinessArea[];
  fetchStudentProfile: () => Promise<void>;
  fetchBusinessArea: () => Promise<void>;
  updateStudentProfile: (data: {
    businessAreaId: string;
    mark: number;
  }) => Promise<void>;
}

const StudentProfileContext = createContext<
  StudentProfileContextType | undefined
>(undefined);

export const StudentProfileProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { user } = useAuth();
  const { callApi } = useApi();
  const router = useRouter();
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(
    null
  );
  const [businessAreas, setBusinessAreas] = useState<BusinessArea[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStudentProfile = async () => {
    setLoading(true);
    try {
      if (user) {
        const response = await callApi(
          `fuc/User/student/${user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"]}`
        );

        if (response?.isSuccess) {
          setStudentProfile(response.value);
          if (!response.value.businessArea) {
            router.push("/student/update-information");
          } else {
            router.push("/student/home");
          }
        } else {
          throw new Error(
            response?.error?.message || "Failed to fetch student profile"
          );
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

  const fetchBusinessArea = async () => {
    try {
      const response = await callApi(`fuc/topics/business`);
      if (response?.isSuccess) {
        setBusinessAreas(response.value);
      } else {
        throw new Error(
          response?.error?.message || "Failed to fetch business areas"
        );
      }
    } catch (error) {
      toast.error("Error getting business areas", {
        description: `${error}`,
      });
      console.error("Error fetching business areas:", error);
    }
  };

  const updateStudentProfile = async (data: {
    businessAreaId: string;
    mark: number;
  }) => {
    setLoading(true);
    const response = await callApi(`fuc/User/student`, {
      method: "PUT",
      body: data,
    });

    if (response?.isSuccess) {
      toast.success("Profile updated successfully");
      router.push("/student/home");
    }
    return response;
  };

  useEffect(() => {
    fetchStudentProfile();
  }, [user]);

  return (
    <StudentProfileContext.Provider
      value={{
        studentProfile,
        businessAreas,
        fetchStudentProfile,
        fetchBusinessArea,
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

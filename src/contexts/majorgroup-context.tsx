"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from '@/hooks/use-api';
import { toast } from 'sonner';

interface MajorGroup {
  id: string;
  name: string;
  description: string;
  isDeleted: boolean;
  deletedAt: string | null;
} 

interface Major {
  id: string;
  majorGroupId: string;
  name: string;
  description: string;
  isDeleted: boolean;
  deletedAt: string | null;
}
 
interface MajorGroupContextProps {
  majorGroups: MajorGroup[];
  fetchMajorGroupList: () => Promise<void>;
  addMajorGroup: (data: MajorGroup) => Promise<void>;
  updateMajorGroup: (data: MajorGroup) => Promise<void>;
  removeMajorGroup: (id: string) => Promise<void>;
  getMajorsByMajorGroupId: (majorGroupId: string) => Promise<Major[]>;
}

const MajorGroupContext = createContext<MajorGroupContextProps | undefined>(undefined);

export const MajorGroupProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [majorGroups, setMajorGroups] = useState<MajorGroup[]>([]);

  const fetchMajorGroupList = async () => {
    try {
      const response = await callApi("fuc/AcademicManagement/majorgroup", {
        method: "GET",
      });

      if (!Array.isArray(response)) {
        throw new Error("Invalid response format");
      }

      setMajorGroups(response);
    } catch (error) {
      console.error("Error fetching major group data:", error);
    }
  };

  const addMajorGroup = async (data: MajorGroup) => {
    try {
      await callApi("fuc/AcademicManagement/majorgroup", {
        method: "POST",
        body: data,
      });
      setMajorGroups((prev) => [...prev, data]);
      toast.success("Major group added successfully");
    } catch (error) {
      console.error("Error adding major group:", error);
    }
  };

  const updateMajorGroup = async (data: MajorGroup) => {
    try {
      await callApi("fuc/AcademicManagement/majorgroup", {
        method: "PUT",
        body: data,
      });
      setMajorGroups((prev) =>
        prev.map((majorGroup) => (majorGroup.id === data.id ? data : majorGroup))
      );
      toast.success("Major group updated successfully");
    } catch (error) {
      console.error("Error updating major group:", error);
    }
  };

  const removeMajorGroup = async (id: string) => {
    try {
      await callApi(`fuc/AcademicManagement/majorgroup/${id}`, {
        method: "DELETE",
      });
      setMajorGroups((prev) => prev.filter((majorGroup) => majorGroup.id !== id));
      toast.success("Major group removed successfully");
    } catch (error) {
      console.error("Error removing major group:", error);
    }
  };

  const getMajorsByMajorGroupId = async (majorGroupId: string) => {
    try {
      const response = await callApi(`fuc/AcademicManagement/major/by-major-group/${majorGroupId}`, {
        method: "GET",
      });

      if (!Array.isArray(response)) {
        throw new Error("Invalid response format");
      }

      return response;
    } catch (error) {
      console.error("Error fetching majors by major group ID:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchMajorGroupList();
  }, []);

  return (
    <MajorGroupContext.Provider
      value={{ majorGroups, fetchMajorGroupList, addMajorGroup, updateMajorGroup, removeMajorGroup, getMajorsByMajorGroupId }}
    >
      {children}
    </MajorGroupContext.Provider>
  );
};

export const useMajorGroup = () => {
  const context = useContext(MajorGroupContext);
  if (!context) {
    throw new Error("useMajorGroup must be used within a MajorGroupProvider");
  }
  return context;
};
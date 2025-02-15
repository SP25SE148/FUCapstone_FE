"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";

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

const MajorGroupContext = createContext<MajorGroupContextProps | undefined>(
  undefined
);

export const MajorGroupProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { callApi } = useApi();
  const [majorGroups, setMajorGroups] = useState<MajorGroup[]>([]);

  const fetchMajorGroupList = async () => {
    try {
      const response = await callApi("fuc/AcademicManagement/majorgroup", {
        method: "GET",
      });
      setMajorGroups(response?.value);
    } catch (error) {
      console.error("Error fetching major group data:", error);
    }
  };

  const addMajorGroup = async (data: MajorGroup) => {
    const response = await callApi("fuc/AcademicManagement/majorgroup", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      // setMajorGroups((prev) => [...prev, data]);
      toast.success("Major group added successfully");
      fetchMajorGroupList();
    }
    return response;
  };

  const updateMajorGroup = async (data: MajorGroup) => {
    const response = await callApi("fuc/AcademicManagement/majorgroup", {
      method: "PUT",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Major group updated successfully");
      fetchMajorGroupList();
    }
    return response;
  };

  const removeMajorGroup = async (id: string) => {
    const response = await callApi(`fuc/AcademicManagement/majorgroup/${id}`, {
      method: "DELETE",
    });

    if (response?.isSuccess === true) {
      toast.success("Major group removed successfully");
      fetchMajorGroupList();
    }
    return response;
  };

  const getMajorsByMajorGroupId = async (majorGroupId: string) => {
    try {
      const response = await callApi(
        `fuc/AcademicManagement/major/by-major-group/${majorGroupId}`,
        {
          method: "GET",
        }
      );

      return response?.value;
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
      value={{
        majorGroups,
        fetchMajorGroupList,
        addMajorGroup,
        updateMajorGroup,
        removeMajorGroup,
        getMajorsByMajorGroupId,
      }}
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

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
  loading: boolean;
  fetchMajorGroupList: () => Promise<void>;
  addMajorGroup: (data: MajorGroup) => Promise<void>;
  addMajor: (data: Major) => Promise<void>;
  updateMajorGroup: (data: MajorGroup) => Promise<void>;
  updateMajor: (data: Major) => Promise<void>;
  removeMajorGroup: (id: string) => Promise<void>;
  removeMajor: (id: string) => Promise<void>;
  getMajorsByMajorGroupId: (majorGroupId: string) => Promise<Major[]>;
}

const SuperadminMajorGroupContext = createContext<MajorGroupContextProps | undefined>(
  undefined
);

export const SuperadminMajorGroupProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { callApi } = useApi();
  const [majorGroups, setMajorGroups] = useState<MajorGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMajorGroupList = async () => {
    setLoading(true);
    try {
      const response = await callApi("fuc/AcademicManagement/majorgroup", {
        method: "GET",
      });
      setTimeout(() => {
        setMajorGroups(response?.value || []);
        setLoading(false);
      }, 1000); 
    } catch (error) {
      console.error("Error fetching major group data:", error);
      setLoading(false);
    }
  };

  const addMajorGroup = async (data: MajorGroup) => {
    const response = await callApi("fuc/AcademicManagement/majorgroup", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Major group added successfully");
      fetchMajorGroupList();
    }
    return response;
  };

  const addMajor = async (data: Major) => {
    const response = await callApi("fuc/AcademicManagement/major", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Major added successfully");
      getMajorsByMajorGroupId(data.majorGroupId);
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

  const updateMajor = async (data: Major) => {
    const response = await callApi("fuc/AcademicManagement/major", {
      method: "PUT",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Major updated successfully");
      getMajorsByMajorGroupId( data.majorGroupId);
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

  const removeMajor = async (id: string) => {
    const response = await callApi(`fuc/AcademicManagement/major/${id}`, {
      method: "DELETE",
    });

    if (response?.isSuccess === true) {
      toast.success("Major removed successfully");
      getMajorsByMajorGroupId(response.value.majorGroupId);
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
    <SuperadminMajorGroupContext.Provider
      value={{
        majorGroups,
        loading,
        fetchMajorGroupList,
        addMajorGroup,
        addMajor,
        updateMajorGroup,
        updateMajor,
        removeMajorGroup,
        removeMajor,
        getMajorsByMajorGroupId,
      }}
    >
      {children}
    </SuperadminMajorGroupContext.Provider>
  );
};

export const useMajorGroup = () => {
  const context = useContext(SuperadminMajorGroupContext);
  if (!context) {
    throw new Error("useMajorGroup must be used within a MajorGroupProvider");
  }
  return context;
};
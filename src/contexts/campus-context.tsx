"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";

interface Campus {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string | null;
  createdBy: string;
  updatedBy: string | null;
  deletedAt: string | null;
}

interface CampusContextProps {
  campuses: Campus[];
  loading: boolean;
  fetchCampusList: () => Promise<void>;
  addCampus: (data: Campus) => Promise<void>;
  updateCampus: (data: Campus) => Promise<void>;
  removeCampus: (id: string) => Promise<void>;
}

const CampusContext = createContext<CampusContextProps | undefined>(undefined);

export const CampusProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCampusList = async () => {
    setLoading(true);
    try {
      const response = await callApi("fuc/AcademicManagement/campus", {
        method: "GET",
      });

      setTimeout(() => {
        setCampuses(response?.value || []);
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Error fetching campus data", {
        description: `${error}`,
      });
      console.error("Error fetching campus data:", error);
      setLoading(false);
    }
  };

  const addCampus = async (data: Campus) => {
    const response = await callApi("fuc/AcademicManagement/campus", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Campus added successfully");
      fetchCampusList();
    }
    return response;
  };

  const updateCampus = async (data: Campus) => {
    const response = await callApi("fuc/AcademicManagement/campus", {
      method: "PUT",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Campus updated successfully");
      fetchCampusList();
    }
    return response;
  };

  const removeCampus = async (id: string) => {
    const response = await callApi(`fuc/AcademicManagement/campus/${id}`, {
      method: "DELETE",
    });

    if (response?.isSuccess === true) {
      toast.success("Campus removed successfully");
      fetchCampusList();
    }
    return response;
  };

  useEffect(() => {
    fetchCampusList();
  }, []);

  return (
    <CampusContext.Provider
      value={{
        campuses,
        loading,
        fetchCampusList,
        addCampus,
        updateCampus,
        removeCampus,
      }}
    >
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error("useCampus must be used within a CampusProvider");
  }
  return context;
};
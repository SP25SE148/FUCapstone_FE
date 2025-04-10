"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useState, useEffect } from "react";

import { Campus } from "@/types/types";
import { useApi } from "@/hooks/use-api";

interface CampusContextProps {
  campuses: Campus[];
  loading: boolean;
  fetchCampusList: () => Promise<void>;
  addCampus: (data: Campus) => Promise<void>;
  updateCampus: (data: Campus) => Promise<void>;
  removeCampus: (id: string) => Promise<void>;
}

const SuperadminCampusContext = createContext<CampusContextProps | undefined>(undefined);

export const SuperadminCampusProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [loading, setLoading] = useState<boolean>(false);
  const [campuses, setCampuses] = useState<Campus[]>([]);

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
    <SuperadminCampusContext.Provider
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
    </SuperadminCampusContext.Provider>
  );
};

export const useCampus = () => {
  const context = useContext(SuperadminCampusContext);
  if (!context) {
    throw new Error("useCampus must be used within a CampusProvider");
  }
  return context;
};
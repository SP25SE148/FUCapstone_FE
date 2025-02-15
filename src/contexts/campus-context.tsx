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
  fetchCampusList: () => Promise<void>;
  addCampus: (data: Campus) => Promise<void>;
  updateCampus: (data: Campus) => Promise<void>;
  removeCampus: (id: string) => Promise<void>;
}

const CampusContext = createContext<CampusContextProps | undefined>(undefined);

export const CampusProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [campuses, setCampuses] = useState<Campus[]>([]);

  const fetchCampusList = async () => {
    try {
      const response = await callApi("fuc/AcademicManagement/campus", {
        method: "GET",
      });

      setCampuses(response?.value || []);
    } catch (error) {
      toast.error("Error fetching supervisor data", {
        description: `${error}`,
      });
      console.error("Error fetching campus data:", error);
    }
  };

  const addCampus = async (data: Campus) => {
    const response = await callApi("fuc/AcademicManagement/campus", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      // setCampuses((prev) => [...prev, response]);
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
      // setCampuses((prev) =>
      //   prev.map((campus) => (campus.id === data.id ? response : campus))
      // );
      toast.success("Campus updated successfully");
      fetchCampusList();
    }
    return response;
  };

  const removeCampus = async (id: string) => {
    const respone = await callApi(`fuc/AcademicManagement/campus/${id}`, {
      method: "DELETE",
    });

    if (respone?.isSuccess === true) {
      // setCampuses((prev) => prev.filter((campus) => campus.id !== id));
      toast.success("Campus removed successfully");
      fetchCampusList();
    }
    return respone;
  };

  useEffect(() => {
    fetchCampusList();
  }, []);

  return (
    <CampusContext.Provider
      value={{
        campuses,
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

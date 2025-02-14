"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from '@/hooks/use-api';
import { toast } from 'sonner';

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

      if (!Array.isArray(response)) {
        throw new Error("Invalid response format");
      }

      setCampuses(response);
    } catch (error) {
      console.error("Error fetching campus data:", error);
    }
  };

  const addCampus = async (data: Campus) => {
    try {
      const response = await callApi("fuc/AcademicManagement/campus", {
        method: "POST",
        body: data,
      });

      if (response && response.id) {
        setCampuses((prev) => [...prev, response]);
        toast.success("Campus added successfully");
      } else {
        throw new Error("Failed to add campus");
      }
    } catch (error) {
      console.error("Error adding campus:", error);
    }
  };

  const updateCampus = async (data: Campus) => {
    try {
      const response = await callApi("fuc/AcademicManagement/campus", {
        method: "PUT",
        body: data,
      });

      if (response && response.id) {
        setCampuses((prev) =>
          prev.map((campus) => (campus.id === data.id ? response : campus))
        );
        toast.success("Campus updated successfully");
      } else {
        throw new Error("Failed to update campus");
      }
    } catch (error) {
      console.error("Error updating campus:", error);
    }
  };

  const removeCampus = async (id: string) => {
    try {
      await callApi(`fuc/AcademicManagement/campus/${id}`, {
        method: "DELETE",
      });
      setCampuses((prev) => prev.filter((campus) => campus.id !== id));
      toast.success("Campus removed successfully");
    } catch (error) {
      console.error("Error removing campus:", error);
    }
  };

  useEffect(() => {
    fetchCampusList();
  }, []);

  return (
    <CampusContext.Provider
      value={{ campuses, fetchCampusList, addCampus, updateCampus, removeCampus }}
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
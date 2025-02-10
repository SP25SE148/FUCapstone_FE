"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from '@/hooks/use-api';

interface Capstone {
  id: string;
  majorId: string;
  name: string;
  minMember: number;
  maxMember: number;
  reviewCount: number;
  isDeleted: boolean;
  deletedAt: string | null;
}

interface CapstoneContextProps {
  capstones: Capstone[];
  fetchCapstoneList: () => Promise<void>;
  addCapstone: (data: Capstone) => Promise<void>;
  updateCapstone: (data: Capstone) => Promise<void>;
  removeCapstone: (id: string) => Promise<void>;
}

const CapstoneContext = createContext<CapstoneContextProps | undefined>(undefined);

export const CapstoneProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [capstones, setCapstones] = useState<Capstone[]>([]);

  const fetchCapstoneList = async () => {
    try {
      const response = await callApi("fuc/AcademicManagement/capstone", {
        method: "GET",
      });

      if (!Array.isArray(response?.value)) {
        throw new Error("Invalid response format");
      }

      setCapstones(response.value);
    } catch (error) {
      console.error("Error fetching capstone data:", error);
    }
  };

  const addCapstone = async (data: Capstone) => {
    try {
      await callApi("fuc/AcademicManagement/capstone", {
        method: "POST",
        body: data,
      });
      setCapstones((prev) => [...prev, data]);
      alert("Capstone added successfully");
    } catch (error) {
      console.error("Error adding capstone:", error);
      alert("Failed to add capstone");
    }
  };

  const updateCapstone = async (data: Capstone) => {
    try {
      await callApi("fuc/AcademicManagement/capstone", {
        method: "PUT",
        body: data,
      });
      setCapstones((prev) =>
        prev.map((capstone) => (capstone.id === data.id ? data : capstone))
      );
      alert("Capstone updated successfully");
    } catch (error) {
      console.error("Error updating capstone:", error);
      alert("Failed to update capstone");
    }
  };

  const removeCapstone = async (id: string) => {
    try {
      await callApi(`fuc/AcademicManagement/capstone/${id}`, {
        method: "DELETE",
      });
      setCapstones((prev) => prev.filter((capstone) => capstone.id !== id));
      alert("Capstone removed successfully");
    } catch (error) {
      console.error("Error removing capstone:", error);
      alert("Failed to remove capstone");
    }
  };

  useEffect(() => {
    fetchCapstoneList();
  }, []);

  return (
    <CapstoneContext.Provider
      value={{ capstones, fetchCapstoneList, addCapstone, updateCapstone, removeCapstone }}
    >
      {children}
    </CapstoneContext.Provider>
  );
};

export const useCapstone = () => {
  const context = useContext(CapstoneContext);
  if (!context) {
    throw new Error("useCapstone must be used within a CapstoneProvider");
  }
  return context;
};
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from '@/hooks/use-api';
import { toast } from 'sonner';

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

      setCapstones(response?.value || []);
    } catch (error) {
      toast.error("Error fetching capstone data", {
        description: `${error}`,
      });
      console.error("Error fetching capstone data:", error);
    }
  };

  const addCapstone = async (data: Capstone) => {
    const response = await callApi("fuc/AcademicManagement/capstone", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Capstone added successfully");
      fetchCapstoneList();
    }
    return response;
  };

  const updateCapstone = async (data: Capstone) => {
    const response = await callApi("fuc/AcademicManagement/capstone", {
      method: "PUT",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Capstone updated successfully");
      fetchCapstoneList();
    }
    return response;
  };

  const removeCapstone = async (id: string) => {
    const response = await callApi(`fuc/AcademicManagement/capstone/${id}`, {
      method: "DELETE",
    });

    if (response?.isSuccess === true) {
      toast.success("Capstone removed successfully");
      fetchCapstoneList();
    }
    return response;
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
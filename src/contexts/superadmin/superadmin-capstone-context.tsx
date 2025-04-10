"use client";

import { toast } from 'sonner';
import React, { createContext, useContext, useState, useEffect } from 'react';

import { useApi } from '@/hooks/use-api';
import { Capstone } from '@/types/types';

interface CapstoneContextProps {
  capstones: Capstone[];
  loading: boolean;
  fetchCapstoneList: () => Promise<void>;
  addCapstone: (data: Capstone) => Promise<void>;
  updateCapstone: (data: any) => Promise<void>;
  removeCapstone: (id: string) => Promise<void>;
}

const SuperadminCapstoneContext = createContext<CapstoneContextProps | undefined>(undefined);

export const SuperadminCapstoneProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [loading, setLoading] = useState<boolean>(false);
  const [capstones, setCapstones] = useState<Capstone[]>([]);

  const fetchCapstoneList = async () => {
    setLoading(true);
    try {
      const response = await callApi("fuc/AcademicManagement/capstone", {
        method: "GET",
      });

      setTimeout(() => {
        setCapstones(response?.value || []);
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Error fetching capstone data", {
        description: `${error}`,
      });
      console.error("Error fetching capstone data:", error);
      setLoading(false);
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

  const updateCapstone = async (data: any) => {
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
    <SuperadminCapstoneContext.Provider
      value={{ capstones, loading, fetchCapstoneList, addCapstone, updateCapstone, removeCapstone }}
    >
      {children}
    </SuperadminCapstoneContext.Provider>
  );
};

export const useCapstone = () => {
  const context = useContext(SuperadminCapstoneContext);
  if (!context) {
    throw new Error("useCapstone must be used within a CapstoneProvider");
  }
  return context;
};
"use client"

import { toast } from 'sonner';
import React, { createContext, useContext, useState, useEffect } from 'react';

import { useApi } from '@/hooks/use-api';

interface Manager {
  userId: string
  fullName: string
  userCode: string
  email: string
  campusId: string
  majorId: string
  capstoneId: string
}

interface ManagerContextProps {
  managers: Manager[];
  fetchManagerList: () => Promise<void>;
  addManager: (data: any) => Promise<void>;
}

const ManagerContext = createContext<ManagerContextProps | undefined>(undefined);

export const ManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [managers, setManagers] = useState<Manager[]>([]);

  const fetchManagerList = async () => {
    try {
      const response = await callApi("identity/Users/get-all-manager", {
        method: "GET",
      });
      setManagers(response?.value);
    } catch (error) {
      toast.error("Error fetching manager data", {
        description: `${error}`
      });
    }
  };

  const addManager = async (data: any) => {
    const response = await callApi("identity/Users/Managers", {
      method: "POST",
      body: data,
    });
    if (response?.isSuccess === true) {
      toast.success("Add manager successfully")
      fetchManagerList();
    }
    return response;
  };

  useEffect(() => {
    fetchManagerList();
  }, []);

  return (
    <ManagerContext.Provider
      value={{ managers, fetchManagerList, addManager }}
    >
      {children}
    </ManagerContext.Provider>
  );
};

export const useManager = () => {
  const context = useContext(ManagerContext);
  if (!context) {
    throw new Error("useManager must be used within a ManagerProvider");
  }
  return context;
};
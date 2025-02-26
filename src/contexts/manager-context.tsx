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
  isLoading: boolean;
  managers: Manager[];
  fetchCapstoneList: () => Promise<[]>;
  fetchManagerList: () => Promise<void>;
  addManager: (data: any) => Promise<void>;
}

const ManagerContext = createContext<ManagerContextProps | undefined>(undefined);

export const ManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [managers, setManagers] = useState<Manager[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchManagerList = async () => {
    setIsLoading(true);
    try {
      const response = await callApi("identity/Users/get-all-manager", {
        method: "GET",
      });
      setManagers(response?.value);
    } finally {
      setIsLoading(false)
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

  const fetchCapstoneList = async () => {
    const response = await callApi("fuc/AcademicManagement/capstone", {
      method: "GET",
    });
    return (response?.value);
  };

  useEffect(() => {
    fetchManagerList();
  }, []);

  return (
    <ManagerContext.Provider
      value={{ managers, isLoading, fetchManagerList, addManager, fetchCapstoneList }}
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
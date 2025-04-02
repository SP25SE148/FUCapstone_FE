"use client"

import { toast } from 'sonner';
import React, { createContext, useContext, useState, useEffect } from 'react';

import { useApi } from '@/hooks/use-api';
import { Capstone, Manager } from '@/types/types';

interface AdminManagerContextProps {
  managers: Manager[];
  fetchCapstoneList: () => Promise<Capstone[]>;
  fetchManagerList: () => Promise<void>;
  addManager: (data: any) => Promise<void>;
}

const AdminManagerContext = createContext<AdminManagerContextProps | undefined>(undefined);

export const AdminManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [managers, setManagers] = useState<Manager[]>([]);

  const fetchManagerList = async () => {
    const response = await callApi("identity/Users/get-all-manager");
    setManagers(response?.value);
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
    const response = await callApi("fuc/AcademicManagement/capstone");
    return (response?.value);
  };

  useEffect(() => {
    fetchManagerList();
  }, []);

  return (
    <AdminManagerContext.Provider
      value={{ managers, fetchManagerList, addManager, fetchCapstoneList }}
    >
      {children}
    </AdminManagerContext.Provider>
  );
};

export const useAdminManager = () => {
  const context = useContext(AdminManagerContext);
  if (!context) {
    throw new Error("useAdminManager must be used within a AdminManagerProvider");
  }
  return context;
};
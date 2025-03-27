"use client"

import { toast } from 'sonner';
import React, { createContext, useContext, useState, useEffect } from 'react';

import { useApi } from '@/hooks/use-api';

interface TimeConfig {
  id: string,
  teamUpDate: string,
  teamUpExpirationDate: string,
  registTopicDate: string,
  registTopicExpiredDate: string,
  isActived: boolean,
  campusId: string
}

interface AdminConfigContextProps {
  timeConfigs: TimeConfig[],
  updateTimeConfig: (data: any) => Promise<any>
}

const AdminConfigContext = createContext<AdminConfigContextProps | undefined>(undefined);

export const AdminConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [timeConfigs, setTimeConfigs] = useState<TimeConfig[]>([]);

  const getTimeConfig = async () => {
    const response = await callApi("fuc/configuration/time");
    setTimeConfigs(response?.value);
  };

  const updateTimeConfig = async (data: any) => {
    const response: any = await callApi("fuc/configuration/time", {
      method: "PUT",
      body: data,
    });

    if (response?.isSuccess === true) {
      getTimeConfig();
      toast.success("Update time config successfully");
    }
    return response
  };

  useEffect(() => {
    getTimeConfig();
  }, []);

  return (
    <AdminConfigContext.Provider
      value={{
        timeConfigs,
        updateTimeConfig
      }}
    >
      {children}
    </AdminConfigContext.Provider>
  );
};

export const useAdminConfig = () => {
  const context = useContext(AdminConfigContext);
  if (!context) {
    throw new Error("useAdminConfig must be used within a AdminConfigProvider");
  }
  return context;
};
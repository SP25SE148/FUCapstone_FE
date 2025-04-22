"use client"

import { toast } from 'sonner';
import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect } from 'react';

import { useApi } from '@/hooks/use-api';
import { Semester, TimeConfig } from '@/types/types';

interface AdminConfigContextProps {
  timeConfigs: TimeConfig[];
  nextSemester: Semester | undefined;
  createTimeConfig: (data: any) => Promise<any>
  getTimeConfigBySemesterId: (semesterId: string) => Promise<TimeConfig>;
  updateTimeConfig: (data: any) => Promise<any>;
}

const AdminConfigContext = createContext<AdminConfigContextProps | undefined>(undefined);

export const AdminConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const pathName = usePathname();
  const [nextSemester, setNextSemester] = useState<Semester>();
  const [timeConfigs, setTimeConfigs] = useState<TimeConfig[]>([]);

  const getTimeConfig = async () => {
    const response = await callApi("fuc/configuration/time");
    setTimeConfigs(response?.value);
  };

  const getNextSemester = async () => {
    const response = await callApi("fuc/AcademicManagement/next-semester");
    setNextSemester(response?.value);
  };

  const createTimeConfig = async (data: any) => {
    const response: any = await callApi("fuc/configuration/time", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      getTimeConfig();
      toast.success("Create time config successfully");
    }
    return response
  };

  const getTimeConfigBySemesterId = async (semesterId: string) => {
    const response = await callApi(`fuc/configuration/time-by-semester-id/${semesterId}`);
    return (response?.value);
  };

  const updateTimeConfig = async (data: any) => {
    const response: any = await callApi("fuc/configuration/time", {
      method: "PUT",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Update time config successfully");
    }
    return response
  };

  useEffect(() => {
    if (pathName === "/admin/configurations") {
      getTimeConfig();
    }
    if (pathName === "/admin/configurations" || pathName === "/admin/configurations/create") {
      getNextSemester();
    }
  }, [pathName]);

  return (
    <AdminConfigContext.Provider
      value={{
        timeConfigs,
        nextSemester,
        createTimeConfig,
        getTimeConfigBySemesterId,
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
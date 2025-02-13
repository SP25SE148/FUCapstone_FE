"use client"

import { toast } from 'sonner';
import React, { createContext, useContext } from 'react';

import { useApi } from '@/hooks/use-api';

interface Supervisor {
  email: string,
  userName: string,
  majorId: string,
  campusId: string,
}

interface SupervisorContextProps {
  addSupervisor: (data: Supervisor) => Promise<void>;
  importSupervisor: (data: any) => Promise<void>;
}

const SupervisorContext = createContext<SupervisorContextProps | undefined>(undefined);

export const SupervisorProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();

  const addSupervisor = async (data: Supervisor) => {
    const response: any = await callApi("identity/Users/supervisors", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Add supervisor successfully")
    }
    return response
  };

  const importSupervisor = async (data: any) => {
    const response: any = await callApi("identity/Users/import/supervisors", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Import supervisor successfully")
    }
    return response
  };

  return (
    <SupervisorContext.Provider
      value={{ addSupervisor, importSupervisor }}
    >
      {children}
    </SupervisorContext.Provider>
  );
};

export const useSupervisor = () => {
  const context = useContext(SupervisorContext);
  if (!context) {
    throw new Error("useSupervisor must be used within a SupervisorProvider");
  }
  return context;
};
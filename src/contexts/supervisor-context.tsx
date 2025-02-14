"use client"

import { toast } from 'sonner';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { useApi } from '@/hooks/use-api';

interface Supervisor {
  id: string
  fullName: string
  email: string
  majorId: string
  majorName: string
  campusId: string
  campusName: string
}

interface SupervisorContextProps {
  supervisors: Supervisor[]
  fetchSupervisorList: () => Promise<void>;
  addSupervisor: (data: any) => Promise<void>;
  importSupervisor: (data: any) => Promise<void>;
}

const SupervisorContext = createContext<SupervisorContextProps | undefined>(undefined);

export const SupervisorProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);

  const fetchSupervisorList = async () => {
    try {
      const response = await callApi("fuc/User/get-all-supervisor", {
        method: "GET",
      });
      setSupervisors(response?.value);
    } catch (error) {
      toast.error("Error fetching supervisor data", {
        description: `${error}`
      });
    }
  };

  const addSupervisor = async (data: Supervisor) => {
    const response: any = await callApi("identity/Users/supervisors", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Add supervisor successfully");
      fetchSupervisorList();
    }
    return response
  };

  const importSupervisor = async (data: any) => {
    const response: any = await callApi("identity/Users/import/supervisors", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Import supervisor successfully");
      fetchSupervisorList();
    }
    return response
  };

  useEffect(() => {
    fetchSupervisorList();
  }, []);

  return (
    <SupervisorContext.Provider
      value={{ supervisors, fetchSupervisorList, addSupervisor, importSupervisor }}
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
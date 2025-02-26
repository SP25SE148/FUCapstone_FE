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
  isLoading: boolean;
  supervisors: Supervisor[];
  fetchMajorList: () => Promise<[]>;
  fetchSupervisorList: () => Promise<void>;
  addSupervisor: (data: any) => Promise<void>;
  importSupervisor: (data: any) => Promise<void>;
}

const SupervisorContext = createContext<SupervisorContextProps | undefined>(undefined);

export const SupervisorProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);

  const fetchSupervisorList = async () => {
    setIsLoading(true);
    try {
      const response = await callApi("fuc/User/get-all-supervisor", {
        method: "GET",
      });
      setSupervisors(response?.value);
    } finally {
      setIsLoading(false)
    }
  };

  const addSupervisor = async (data: Supervisor) => {
    const response: any = await callApi("identity/Users/supervisors", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Add supervisor successfully");
      setTimeout(() => {
        fetchSupervisorList();
      }, 10000);
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
      setTimeout(() => {
        fetchSupervisorList();
      }, 10000);
    }
    return response
  };

  const fetchMajorList = async () => {
    const response = await callApi("fuc/AcademicManagement/major", {
      method: "GET",
    });
    return (response?.value);
  };

  useEffect(() => {
    fetchSupervisorList();
  }, []);

  return (
    <SupervisorContext.Provider
      value={{ supervisors, isLoading, fetchSupervisorList, addSupervisor, importSupervisor, fetchMajorList }}
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
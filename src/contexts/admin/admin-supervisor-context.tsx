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

interface AdminSupervisorContextProps {
  isLoading: boolean;
  supervisors: Supervisor[];
  fetchMajorList: () => Promise<[]>;
  fetchSupervisorList: () => Promise<void>;
  addSupervisor: (data: any) => Promise<void>;
  getSupervisorsTemplate: () => Promise<string>;
  importSupervisor: (data: any) => Promise<void>;
}

const AdminSupervisorContext = createContext<AdminSupervisorContextProps | undefined>(undefined);

export const AdminSupervisorProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);

  const fetchSupervisorList = async () => {
    const response = await callApi("fuc/User/get-all-supervisor");
    setSupervisors(response?.value);
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

  const getSupervisorsTemplate = async () => {
    const response = await callApi("fuc/Documents/supervisors");
    return (response?.value);
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
    const response = await callApi("fuc/AcademicManagement/major");
    return (response?.value);
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      fetchSupervisorList();
    } finally {
      setIsLoading(false)
    }
  }, []);

  return (
    <AdminSupervisorContext.Provider
      value={{ supervisors, isLoading, fetchSupervisorList, addSupervisor, getSupervisorsTemplate, importSupervisor, fetchMajorList }}
    >
      {children}
    </AdminSupervisorContext.Provider>
  );
};

export const useAdminSupervisor = () => {
  const context = useContext(AdminSupervisorContext);
  if (!context) {
    throw new Error("useAdminSupervisor must be used within a AdminSupervisorProvider");
  }
  return context;
};
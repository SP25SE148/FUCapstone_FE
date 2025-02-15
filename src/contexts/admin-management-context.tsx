"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from '@/hooks/use-api';
import { toast } from 'sonner';

interface Admin {
  userId: string;
  userCode: string;
  fullName: string;
  email: string;
  majorId: string;
  campusId: string;
  capstoneId: string;
  fullName: string;
}

interface AdminContextProps {
  admins: Admin[];
  fetchAdminList: () => Promise<void>;
  addAdmin: (data: { email: string; fullName: string; campusId: string }) => Promise<void>;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [admins, setAdmins] = useState<Admin[]>([]);

  const fetchAdminList = async () => {
    try {
      const response = await callApi("identity/Users/get-all-admin", {
        method: "GET",
      });

      if (!response.isSuccess) {
        toast.error("Error fetching admin data", { description: response.error.message });
      }

      setAdmins(response?.value);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  const addAdmin = async (data: { email: string; fullName: string; campusId: string }) => {
    try {
      const response = await callApi("identity/Users/admins", {
        method: "POST",
        body: data,
      });

      if (!response.isSuccess) {
        throw new Error(response.error.message || "Failed to add admin");
      }

      setAdmins((prev) => [...prev, response.value]);
      toast.success("Admin added successfully");
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  useEffect(() => {
    fetchAdminList();
  }, []);

  return (
    <AdminContext.Provider value={{ admins, fetchAdminList, addAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
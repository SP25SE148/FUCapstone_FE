"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useState, useEffect } from "react";

import { Admin, Campus } from "@/types/types";
import { useApi } from "@/hooks/use-api";

interface AdminContextProps {
  admins: Admin[];
  loading: boolean;
  fetchAdminList: () => Promise<void>;
  fetchCampusList: () => Promise<Campus[]>;
  addAdmin: (data: Admin) => Promise<void>;
}

const SuperadminAdminContext = createContext<AdminContextProps | undefined>(undefined);

export const SuperadminAdminProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAdminList = async () => {
    setLoading(true);
    try {
      const response = await callApi("identity/Users/get-all-admin", {
        method: "GET",
      });
      setTimeout(() => {
        setAdmins(response?.value || []);
        setLoading(false);
      }, 4000);
    } catch (error) {
      toast.error("Error fetching admin data", {
        description: `${error}`,
      });
      setLoading(false);
    }
  };

  const addAdmin = async (data: Admin) => {
    const response = await callApi("identity/Users/admins", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Admin added successfully");
      fetchAdminList();
    }
    return response;
  };

  const fetchCampusList = async () => {
    const response = await callApi("fuc/AcademicManagement/campus");
    return response?.value;
  };

  useEffect(() => {
    fetchAdminList();
  }, []);

  return (
    <SuperadminAdminContext.Provider value={{ admins, loading, fetchAdminList, addAdmin, fetchCampusList }}>
      {children}
    </SuperadminAdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(SuperadminAdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
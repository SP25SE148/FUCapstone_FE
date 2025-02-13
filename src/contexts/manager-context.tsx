"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from '@/hooks/use-api';
import { toast } from 'sonner';

interface Manager {
  ManagerCode: string,
  email: string,
  userName: string,
  majorId: string,
  capstoneId: string,
  campusId: string,
}

interface ManagerContextProps {
  managers: Manager[];
  fetchManagerList: () => Promise<void>;
  addManager: (data: Manager) => Promise<void>;
  // updateCampus: (data: Manager) => Promise<void>;
  // removeCampus: (id: string) => Promise<void>;
}

const ManagerContext = createContext<ManagerContextProps | undefined>(undefined);

export const ManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [managers, setManagers] = useState<Manager[]>([]);

  const fetchManagerList = async () => {
    try {
      const response = await callApi("identity/Users/get-all-manager", {
        method: "GET",
      });

      if (!Array.isArray(response)) {
        throw new Error("Invalid response format");
      }

      setManagers(response);
    } catch (error) {
      console.error("Error fetching campus data:", error);
    }
  };

  const addManager = async (data: Manager) => {
    try {
      const response = await callApi("identity/Users/Managers", {
        method: "POST",
        body: data,
      });

      if (response.status == 200) {
        // setCampuses((prev) => [...prev, response]);
        // alert("Campus added successfully");
        toast.success(response.detail)
      } else {
        // alert("Failed to add campus");
        toast.error(response.detail)
      }
    } catch (error) {
      console.error("Error adding campus:", error);
      alert("Failed to add campus");
    }
  };

  // const updateCampus = async (data: Campus) => {
  //   try {
  //     const response = await callApi("fuc/AcademicManagement/campus", {
  //       method: "PUT",
  //       body: data,
  //     });

  //     if (response && response.id) {
  //       setCampuses((prev) =>
  //         prev.map((campus) => (campus.id === data.id ? response : campus))
  //       );
  //       alert("Campus updated successfully");
  //     } else {
  //       throw new Error("Failed to update campus");
  //     }
  //   } catch (error) {
  //     console.error("Error updating campus:", error);
  //     alert("Failed to update campus");
  //   }
  // };

  // const removeCampus = async (id: string) => {
  //   try {
  //     await callApi(`fuc/AcademicManagement/campus/${id}`, {
  //       method: "DELETE",
  //     });
  //     setCampuses((prev) => prev.filter((campus) => campus.id !== id));
  //     alert("Campus removed successfully");
  //   } catch (error) {
  //     console.error("Error removing campus:", error);
  //     alert("Failed to remove campus");
  //   }
  // };

  useEffect(() => {
    fetchManagerList();
  }, []);

  return (
    <ManagerContext.Provider
      value={{ managers, fetchManagerList, addManager }}
    >
      {children}
    </ManagerContext.Provider>
  );
};

export const useManager = () => {
  const context = useContext(ManagerContext);
  if (!context) {
    throw new Error("useCampus must be used within a CampusProvider");
  }
  return context;
};
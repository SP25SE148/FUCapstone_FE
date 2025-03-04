"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useApi } from "@/hooks/use-api";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

interface Supervisor {
  id: string;
  fullName: string;
  majorId: string;
  majorName: string;
  campusId: string;
  campusName: string;
  email: string;
}

interface AssignAppraisalContextProps {
  supervisors: Supervisor[];
  selectedSupervisors: string[];
  loading: boolean;
  fetchAssignSupervisor: () => Promise<void>;
  assignAppraisalTopic: () => Promise<void>;
  toggleSupervisorSelection: (email: string) => void;
  clearSelectedSupervisors: () => void;
}

const ManagerAssignAppraisalContext = createContext<AssignAppraisalContextProps | undefined>(undefined);

export const ManagerAssignAppraisalProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const { user } = useAuth();
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [selectedSupervisors, setSelectedSupervisors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAssignSupervisor = async () => {
    setLoading(true);
    try {
      const response = await callApi("fuc/User/get-all-supervisor", {
        method: "GET",
      });

      const filteredSupervisors = response.value.filter((supervisor: Supervisor) => supervisor.majorId === user?.MajorId);

      setTimeout(() => {
        setSupervisors(filteredSupervisors);
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Error fetching supervisors", {
        description: `${error}`,
      });
      console.error("Error fetching supervisors:", error);
      setLoading(false);
    }
  };

  const assignAppraisalTopic = async () => {
    try {
      await callApi("fuc/topics/assign-topic-appraisal", {
        method: "POST",
        body: selectedSupervisors,
      });
      toast.success("Supervisors assigned successfully");
      clearSelectedSupervisors();
    } catch (error) {
      toast.error("Error assigning supervisors", {
        description: `${error}`,
      });
      console.error("Error assigning supervisors:", error);
    }
  };

  const toggleSupervisorSelection = (email: string) => {
    setSelectedSupervisors((prev) =>
      prev.includes(email) ? prev.filter((supervisor) => supervisor !== email) : [...prev, email]
    );
  };

  const clearSelectedSupervisors = () => {
    setSelectedSupervisors([]);
  };

  useEffect(() => {
    fetchAssignSupervisor();
  }, []);

  return (
    <ManagerAssignAppraisalContext.Provider
      value={{
        supervisors,
        selectedSupervisors,
        loading,
        fetchAssignSupervisor,
        assignAppraisalTopic,
        toggleSupervisorSelection,
        clearSelectedSupervisors,
      }}
    >
      {children}
    </ManagerAssignAppraisalContext.Provider>
  );
};

export const useAssignAppraisal = () => {
  const context = useContext(ManagerAssignAppraisalContext);
  if (!context) {
    throw new Error("useAssignAppraisal must be used within a ManagerAssignAppraisalProvider");
  }
  return context;
};
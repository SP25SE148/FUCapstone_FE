"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useState, useEffect } from "react";

import { useApi } from "@/hooks/use-api";
import { Supervisor } from "@/types/types";
import { useAuth } from "@/contexts/auth-context";

interface AssignAppraisalContextProps {
  supervisors: Supervisor[];
  selectedSupervisors: string[];
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

  const fetchAssignSupervisor = async () => {
    const response = await callApi("fuc/User/get-all-supervisor");
    if (response?.isSuccess === true) {
      const filteredSupervisors = response.value.filter((supervisor: Supervisor) => supervisor.majorId === user?.MajorId);
      setSupervisors(filteredSupervisors);
    }
  };

  const assignAppraisalTopic = async () => {
    const response = await callApi("fuc/topics/assign-topic-appraisal", {
      method: "POST",
      body: selectedSupervisors,
    });
    if (response?.isSuccess === true) {
      toast.success("Supervisors assigned successfully");
      clearSelectedSupervisors();
    }
    return response;
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
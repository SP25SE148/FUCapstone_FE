"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";
import { Semester } from "@/types/types";

interface ManagerDashboardContextProps {
    dashboard: any;
    semesters: Semester[];
    getDashboard: (semesterId: string) => Promise<void>;
    archiveData: () => Promise<any>;
}

const ManagerDashboardContext = createContext<ManagerDashboardContextProps | undefined>(undefined);

export const ManagerDashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const { callApi } = useApi();
    const [dashboard, setDashboard] = useState<any>();
    const [semesters, setSemesters] = useState<Semester[]>([]);

    const getAllSemester = async () => {
        const response = await callApi("fuc/AcademicManagement/semester");
        setSemesters(response?.value || []);
    };

    const getDashboard = async (semesterId: string) => {
        const response = await callApi(`fuc/AcademicManagement/dashboard/${semesterId}`);
        setDashboard(response?.value);
    };

    const archiveData = async () => {
        const response: any = await callApi("fuc/AcademicManagement/archive", {
            method: "POST",
            responseType: "blob"
        });
        return response
    };

    useEffect(() => {
        getAllSemester();
    }, []);

    return (
        <ManagerDashboardContext.Provider
            value={{
                dashboard,
                semesters,
                getDashboard,
                archiveData
            }}
        >
            {children}
        </ManagerDashboardContext.Provider>
    );
};

export const useManagerDashboard = () => {
    const context = useContext(ManagerDashboardContext);
    if (!context) {
        throw new Error("useManagerDashboard must be used within a ManagerDashboardProvider");
    }
    return context;
};
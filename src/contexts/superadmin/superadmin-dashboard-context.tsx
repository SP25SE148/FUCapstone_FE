"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";
import { Semester } from "@/types/types";

interface SuperadminDashboardContextProps {
    dashboard: any;
    semesters: Semester[];
    getDashboard: (semesterId: string) => Promise<void>;
}

const SuperadminDashboardContext = createContext<SuperadminDashboardContextProps | undefined>(undefined);

export const SuperadminDashboardProvider = ({ children }: { children: React.ReactNode }) => {
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

    useEffect(() => {
        getAllSemester();
    }, []);

    return (
        <SuperadminDashboardContext.Provider
            value={{
                dashboard,
                semesters,
                getDashboard,
            }}
        >
            {children}
        </SuperadminDashboardContext.Provider>
    );
};

export const useSuperadminDashboard = () => {
    const context = useContext(SuperadminDashboardContext);
    if (!context) {
        throw new Error("useSuperadminDashboard must be used within a SuperadminDashboardProvider");
    }
    return context;
};
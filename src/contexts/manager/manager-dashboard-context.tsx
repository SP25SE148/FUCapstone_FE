"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";

interface ManagerDashboardContextProps {
    dashboard: any;
    archiveData: () => Promise<any>;
}

const ManagerDashboardContext = createContext<ManagerDashboardContextProps | undefined>(undefined);

export const ManagerDashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const { callApi } = useApi();
    const [dashboard, setDashboard] = useState<any>();

    const getDashboard = async () => {
        const response = await callApi("fuc/AcademicManagement/dashboard");
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
        getDashboard();
    }, []);

    return (
        <ManagerDashboardContext.Provider
            value={{
                dashboard,
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
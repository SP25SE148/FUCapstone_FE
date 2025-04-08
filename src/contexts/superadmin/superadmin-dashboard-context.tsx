"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";

interface SuperadminDashboardContextProps {
    dashboard: any;
}

const SuperadminDashboardContext = createContext<SuperadminDashboardContextProps | undefined>(undefined);

export const SuperadminDashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const { callApi } = useApi();
    const [dashboard, setDashboard] = useState<any>();

    const getDashboard = async () => {
        const response = await callApi("fuc/AcademicManagement/dashboard");
        setDashboard(response?.value);
    };

    useEffect(() => {
        getDashboard();
    }, []);

    return (
        <SuperadminDashboardContext.Provider
            value={{
                dashboard,
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
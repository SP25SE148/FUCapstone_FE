"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";

interface SupervisorDashboardContextProps {
    dashboard: any;
}

const SupervisorDashboardContext = createContext<SupervisorDashboardContextProps | undefined>(undefined);

export const SupervisorDashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const { callApi } = useApi();
    const [dashboard, setDashboard] = useState<any>();

    const getDashboard = async () => {
        const response = await callApi("fuc/user/dash-board/groups");
        setDashboard(response?.value);
    };


    useEffect(() => {
        getDashboard();
    }, []);

    return (
        <SupervisorDashboardContext.Provider
            value={{
                dashboard,
            }}
        >
            {children}
        </SupervisorDashboardContext.Provider>
    );
};

export const useSupervisorDashboard = () => {
    const context = useContext(SupervisorDashboardContext);
    if (!context) {
        throw new Error("useSupervisorDashboard must be used within a SupervisorDashboardProvider");
    }
    return context;
};
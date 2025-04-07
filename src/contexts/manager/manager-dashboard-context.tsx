"use client";

import React, { createContext, useContext } from "react";

import { useApi } from "@/hooks/use-api";

interface ManagerDashboardContextProps {
    archiveData: () => Promise<any>;
}

const ManagerDashboardContext = createContext<ManagerDashboardContextProps | undefined>(undefined);

export const ManagerDashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const { callApi } = useApi();

    const archiveData = async () => {
        const response: any = await callApi("fuc/AcademicManagement/archive", {
            method: "POST",
            responseType: "blob"
        });
        return response
    };

    return (
        <ManagerDashboardContext.Provider
            value={{
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
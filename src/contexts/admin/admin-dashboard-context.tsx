"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";

interface AdminDashboardContextProps {
    dashboard: any;
}

const AdminDashboardContext = createContext<AdminDashboardContextProps | undefined>(undefined);

export const AdminDashboardProvider = ({ children }: { children: React.ReactNode }) => {
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
        <AdminDashboardContext.Provider
            value={{
                dashboard,
            }}
        >
            {children}
        </AdminDashboardContext.Provider>
    );
};

export const useAdminDashboard = () => {
    const context = useContext(AdminDashboardContext);
    if (!context) {
        throw new Error("useAdminDashboard must be used within a AdminDashboardProvider");
    }
    return context;
};
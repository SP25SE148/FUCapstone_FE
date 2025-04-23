"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";
import { Semester } from "@/types/types";

interface AdminDashboardContextProps {
    dashboard: any;
    semesters: Semester[];
    getDashboard: (semesterId: string) => Promise<void>;
}

const AdminDashboardContext = createContext<AdminDashboardContextProps | undefined>(undefined);

export const AdminDashboardProvider = ({ children }: { children: React.ReactNode }) => {
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
        <AdminDashboardContext.Provider
            value={{
                dashboard,
                semesters,
                getDashboard,
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
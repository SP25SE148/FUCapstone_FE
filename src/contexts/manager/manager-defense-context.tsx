"use client";

import { toast } from "sonner";
import React, { createContext, useContext } from "react";

import { useApi } from "@/hooks/use-api";

interface ManagerDefenseContextProps {
    getDefensesCalendarTemplate: () => Promise<string>;
}

const ManagerDefenseContext = createContext<ManagerDefenseContextProps | undefined>(undefined);

export const ManagerDefenseProvider = ({ children }: { children: React.ReactNode }) => {
    const { callApi } = useApi();

    const getDefensesCalendarTemplate = async () => {
        const response = await callApi("fuc/Documents/defense-calendar");
        return (response?.value);
    };

    return (
        <ManagerDefenseContext.Provider
            value={{
                getDefensesCalendarTemplate,
            }}
        >
            {children}
        </ManagerDefenseContext.Provider>
    );
};

export const useManagerDefense = () => {
    const context = useContext(ManagerDefenseContext);
    if (!context) {
        throw new Error("useManagerDefense must be used within a ManagerDefenseProvider");
    }
    return context;
};
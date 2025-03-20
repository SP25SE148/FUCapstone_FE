"use client";

import { toast } from "sonner";
import React, { createContext, useContext } from "react";

import { useApi } from "@/hooks/use-api";

interface ManagerReviewContextProps {
    getReviewsCalendarTemplate: () => Promise<string>;
    importReview: (data: any) => Promise<void>;
}

const ManagerReviewContext = createContext<ManagerReviewContextProps | undefined>(undefined);

export const ManagerReviewProvider = ({ children }: { children: React.ReactNode }) => {
    const { callApi } = useApi();

    const getReviewsCalendarTemplate = async () => {
        const response = await callApi("fuc/Documents/reviews-calendars");
        return (response?.value);
    };

    const importReview = async (data: any) => {
        const response: any = await callApi("fuc/user/import-review", {
            method: "POST",
            body: data,
        });

        if (response?.isSuccess === true) {
            toast.success("Import review calendar successfully");
        }
        return response
    };

    return (
        <ManagerReviewContext.Provider
            value={{
                getReviewsCalendarTemplate,
                importReview
            }}
        >
            {children}
        </ManagerReviewContext.Provider>
    );
};

export const useManagerReview = () => {
    const context = useContext(ManagerReviewContext);
    if (!context) {
        throw new Error("useManagerReview must be used within a ManagerReviewProvider");
    }
    return context;
};
"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";
import { ReviewCalendar } from "@/types/types";

interface ManagerReviewContextProps {
    reviewCalendar: ReviewCalendar[] | []
    getReviewsCalendarTemplate: () => Promise<string>;
    importReview: (data: any) => Promise<void>;
    updateReviewCalendarStatus: (id: string, status: number) => Promise<void>;
}

const ManagerReviewContext = createContext<ManagerReviewContextProps | undefined>(undefined);

export const ManagerReviewProvider = ({ children }: { children: React.ReactNode }) => {
    const { callApi } = useApi();
    const [reviewCalendar, setReviewCalendar] = useState<ReviewCalendar[]>([]);

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
            getReviewCalendar();
            toast.success("Import review calendar successfully");
        }
        return response
    };

    const getReviewCalendar = async () => {
        const response = await callApi("fuc/user/manager/get-review-calendar");
        setReviewCalendar(response?.value);
    };

    const updateReviewCalendarStatus = async (id: string, status: number) => {
        const response: any = await callApi(`fuc/user/review-calendar/status`, {
            method: "PUT",
            body: { Id: id, Status: status },
        });
        if (response?.isSuccess === true) {
            getReviewCalendar();
            toast.success("Update review calendar status successfully");
        }
        return response
    };

    useEffect(() => {
        getReviewCalendar();
    }, []);

    return (
        <ManagerReviewContext.Provider
            value={{
                reviewCalendar,
                getReviewsCalendarTemplate,
                importReview,
                updateReviewCalendarStatus
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
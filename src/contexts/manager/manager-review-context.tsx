"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";

export interface ReviewCalendar {
    id: string,
    topicId: string,
    topicCode: string,
    groupId: string,
    groupCode: string,
    topicEnglishName: string,
    mainSupervisorCode: string,
    coSupervisorsCode: [],
    attempt: number,
    slot: number,
    room: string,
    date: string,
    reviewersCode: string[]
}

interface ManagerReviewContextProps {
    reviewCalendar: ReviewCalendar[] | []
    getReviewsCalendarTemplate: () => Promise<string>;
    importReview: (data: any) => Promise<void>;
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

    useEffect(() => {
        getReviewCalendar();
    }, []);

    return (
        <ManagerReviewContext.Provider
            value={{
                reviewCalendar,
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
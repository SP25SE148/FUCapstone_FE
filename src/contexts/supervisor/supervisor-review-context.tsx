"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/use-api";

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

interface SupervisorReviewContextType {
    reviewCalendar: ReviewCalendar[] | []
}

const SupervisorReviewContext = createContext<SupervisorReviewContextType | undefined>(
    undefined
);

export const SupervisorReviewProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { callApi } = useApi();
    const [reviewCalendar, setReviewCalendar] = useState<ReviewCalendar[]>([]);

    const getReviewCalendar = async () => {
        const response = await callApi("fuc/user/supervisor/get-review-calendar");
        setReviewCalendar(response?.value);
    };

    useEffect(() => {
        getReviewCalendar();
    }, []);

    return (
        <SupervisorReviewContext.Provider
            value={{
                reviewCalendar
            }}
        >
            {children}
        </SupervisorReviewContext.Provider>
    );
};

export const useSupervisorReview = () => {
    const context = useContext(SupervisorReviewContext);
    if (context === undefined) {
        throw new Error(
            "useSupervisorReview must be used within a SupervisorReviewProvider"
        );
    }
    return context;
};

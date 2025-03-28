"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/use-api";
import { GroupFullInfo, ReviewCalendar } from "@/types/types";

interface SupervisorReviewContextType {
    reviewCalendar: ReviewCalendar[] | []
    getGroupById: (groupId: string) => Promise<GroupFullInfo>;
    updateReviewSuggestionAndComment: (data: any) => Promise<any>;
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

    const getGroupById = async (groupId: string) => {
        const response = await callApi(`fuc/group/${groupId}`);
        return (response?.value);
    };

    const updateReviewSuggestionAndComment = async (data: any) => {
        const response = await callApi(`fuc/user/supervisor/update-reviewer-suggestion-and-comment`, {
            method: "PUT",
            body: data,
        });
        if (response?.isSuccess === true) {
            getReviewCalendar()
            toast.success("Update review successfully");
        }
        return response;
    };

    useEffect(() => {
        getReviewCalendar();
    }, []);

    return (
        <SupervisorReviewContext.Provider
            value={{
                reviewCalendar,
                getGroupById,
                updateReviewSuggestionAndComment
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

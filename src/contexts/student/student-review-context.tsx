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

interface StudentReviewContextType {
    reviewCalendar: ReviewCalendar[] | []
}

const StudentReviewContext = createContext<StudentReviewContextType | undefined>(
    undefined
);

export const StudentReviewProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { callApi } = useApi();
    const [reviewCalendar, setReviewCalendar] = useState<ReviewCalendar[]>([]);

    const getReviewCalendar = async () => {
        const response = await callApi("fuc/user/student/get-review-calendar");
        setReviewCalendar(response?.value);
    };

    useEffect(() => {
        getReviewCalendar();
    }, []);

    return (
        <StudentReviewContext.Provider
            value={{
                reviewCalendar
            }}
        >
            {children}
        </StudentReviewContext.Provider>
    );
};

export const useStudentReview = () => {
    const context = useContext(StudentReviewContext);
    if (context === undefined) {
        throw new Error(
            "useStudentReview must be used within a StudentReviewProvider"
        );
    }
    return context;
};

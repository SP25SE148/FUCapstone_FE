"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/use-api";
import { usePathname } from "next/navigation";

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
    reviewersCode: string[],
    status: string
}

export interface ResultDetail {
    suggestion: string | undefined,
    comment: string | undefined,
    author: string
}

export interface ReviewResult {
    attempt: number,
    reviewCalendarResultDetailList: ResultDetail[]
}

interface StudentReviewContextType {
    reviewCalendar: ReviewCalendar[] | []
    getReviewResult: () => Promise<ReviewResult[]>
}

const StudentReviewContext = createContext<StudentReviewContextType | undefined>(
    undefined
);

export const StudentReviewProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { callApi } = useApi();
    const pathName = usePathname();
    const [reviewCalendar, setReviewCalendar] = useState<ReviewCalendar[]>([]);

    const getReviewCalendar = async () => {
        const response = await callApi("fuc/user/student/get-review-calendar");
        setReviewCalendar(response?.value);
    };

    const getReviewResult = async () => {
        const response = await callApi("fuc/user/review-calendar-result/student");
        return (response?.value);
    };

    useEffect(() => {
        if (pathName === "/student/reviews") {
            getReviewCalendar();
        }
    }, [pathName]);

    return (
        <StudentReviewContext.Provider
            value={{
                reviewCalendar,
                getReviewResult
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

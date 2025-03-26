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

export interface Member {
    id: string;
    groupId: string;
    studentId: string;
    studentFullName: string;
    studentEmail: string;
    isLeader: boolean;
    createdBy: string,
    createdDate: string,
    status: string;
}

export interface Topic {
    id: string;
    code: string;
    campusId: string;
    semesterId: string
    capstoneId: string;
    businessAreaName: string;
    difficultyLevel: string;
    englishName: string;
    vietnameseName: string
    abbreviation: string;
    description: string;
    mainSupervisorEmail: string
    mainSupervisorName: string
    coSupervisors: [];
    fileName: string;
    fileUrl: string
    createdDate: string;
    status: string;
    topicAppraisals: [];
}

export interface GroupTopicInfo {
    id: string,
    semesterName: string,
    majorName: string,
    capstoneName: string,
    campusName: string,
    topicCode: string,
    groupCode: string,
    status: string,
    groupMemberList: Member[];
    topicResponse: Topic
}

interface SupervisorReviewContextType {
    reviewCalendar: ReviewCalendar[] | []
    getGroupById: (groupId: string) => Promise<GroupTopicInfo>;
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

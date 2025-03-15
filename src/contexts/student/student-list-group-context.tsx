"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/use-api";

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

interface StudentListGroupContextType {
    listGroup: GroupTopicInfo[] | null;
    createJoinGroupRequest: (data: { GroupId: string }) => Promise<any>
}

const StudentListGroupContext = createContext<StudentListGroupContextType | undefined>(
    undefined
);

export const StudentListGroupProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { callApi } = useApi();
    const [listGroup, setListGroup] = useState<GroupTopicInfo[]>([]);

    const fetchGroupList = async () => {
        const response = await callApi("fuc/group/pending");
        setListGroup(response?.value);
    };

    const createJoinGroupRequest = async (data: { GroupId: string }) => {
        const response = await callApi(`fuc/Group/join-group-request`, {
            method: "POST",
            body: data
        });

        if (response?.isSuccess) {
            toast.success("Apply successfully");
        }
        return response;
    }


    useEffect(() => {
        fetchGroupList();
    }, []);

    return (
        <StudentListGroupContext.Provider
            value={{
                listGroup,
                createJoinGroupRequest
            }}
        >
            {children}
        </StudentListGroupContext.Provider>
    );
};

export const useStudentListGroup = () => {
    const context = useContext(StudentListGroupContext);
    if (context === undefined) {
        throw new Error(
            "useStudentListGroup must be used within a StudentListGroupProvider"
        );
    }
    return context;
};

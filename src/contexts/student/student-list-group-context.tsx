"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/use-api";
import { GroupFullInfo } from "@/types/types";

interface StudentListGroupContextType {
    listGroup: GroupFullInfo[] | null;
    createJoinGroupRequest: (data: { GroupId: string }) => Promise<any>
}

const StudentListGroupContext = createContext<StudentListGroupContextType | undefined>(
    undefined
);

export const StudentListGroupProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { callApi } = useApi();
    const [listGroup, setListGroup] = useState<GroupFullInfo[]>([]);

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

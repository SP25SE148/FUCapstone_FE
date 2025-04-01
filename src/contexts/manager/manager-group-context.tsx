"use client";

import { toast } from "sonner";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";
import { useAuth } from "../auth-context";
import { GroupFullInfo, Student } from "@/types/types";

interface ManagerGroupContextProps {
    groupList: GroupFullInfo[] | [],
    remainStudentList: Student[] | [],
    mergeRemainStudentsIntoGroup: () => Promise<void>,
    assignRemainStudentForGroup: (data: { GroupId: string, StudentId: string }) => Promise<void>
}

const ManagerGroupContext = createContext<ManagerGroupContextProps | undefined>(undefined);

export const ManagerGroupProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const { callApi } = useApi();
    const pathName = usePathname();
    const [groupList, setGroupList] = useState<GroupFullInfo[]>([]);
    const [remainStudentList, setRemainStudentList] = useState<Student[]>([]);

    const getAllGroupByCapstone = async () => {
        const response = await callApi(`fuc/group/get-by-capstone-id/${user?.CapstoneId}`);
        setGroupList(response?.value);
    };

    const getRemainStudents = async () => {
        const response = await callApi(`fuc/User/get-remain-students`);
        setRemainStudentList(response?.value);
    };

    const mergeRemainStudentsIntoGroup = async () => {
        const response: any = await callApi("fuc/Group/merge/remain", {
            method: "POST",
        });

        if (response?.isSuccess === true) {
            getRemainStudents();
            toast.success("Random group successfully");
        }
        return response
    };

    const assignRemainStudentForGroup = async (data: { GroupId: string, StudentId: string }) => {
        const response: any = await callApi("fuc/Group/assign/remain", {
            method: "POST",
            body: data
        });

        if (response?.isSuccess === true) {
            getAllGroupByCapstone();
            getRemainStudents();
            toast.success("Add member to group successfully");
        }
        return response
    };

    useEffect(() => {
        if (pathName === "/manager/groups") {
            getAllGroupByCapstone();
        }
    }, [pathName, user]);

    useEffect(() => {
        getRemainStudents();
    }, []);

    return (
        <ManagerGroupContext.Provider
            value={{
                groupList,
                remainStudentList,
                mergeRemainStudentsIntoGroup,
                assignRemainStudentForGroup
            }}
        >
            {children}
        </ManagerGroupContext.Provider>
    );
};

export const useManagerGroup = () => {
    const context = useContext(ManagerGroupContext);
    if (!context) {
        throw new Error("useManagerGroup must be used within a ManagerGroupProvider");
    }
    return context;
};
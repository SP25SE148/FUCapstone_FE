"use client";

import { toast } from "sonner";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/use-api";
import { useAuth } from "../auth-context";
import { GroupFullInfo, Student, Topic } from "@/types/types";

interface ManagerGroupContextProps {
    groupList: GroupFullInfo[] | [],
    remainStudentList: Student[] | [],
    topics: Topic[] | [];
    fetchTopics: () => Promise<any>,
    mergeRemainStudentsIntoGroup: () => Promise<void>,
    assignPendingTopicForGroup: (data: { TopicId: string; GroupId: string }) => Promise<void>;
    assignRemainStudentForGroup: (data: { GroupId: string, StudentId: string }) => Promise<void>
}

const ManagerGroupContext = createContext<ManagerGroupContextProps | undefined>(undefined);

export const ManagerGroupProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const { callApi } = useApi();
    const pathName = usePathname();
    const [topics, setTopics] = useState<Topic[]>([]);
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

    const fetchTopics = async () => {
        const response = await callApi("fuc/topics/manager");
        if (response?.isSuccess) {
            const pendingTopics = response.value.filter((topic: any) => topic.status === "Approved");
            setTopics(pendingTopics || []);
            return pendingTopics;
        }

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

    const assignPendingTopicForGroup = async (data: { TopicId: string; GroupId: string }) => {
        const response = await callApi("fuc/group/assign/pending-topic", {
          method: "POST",
          body: data,
        });
      
        if (response?.isSuccess) {
          toast.success("Topic assigned successfully!");
          getAllGroupByCapstone();
        } 
      
        return response;
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
                topics,
                groupList,
                fetchTopics,
                remainStudentList,
                assignPendingTopicForGroup,
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
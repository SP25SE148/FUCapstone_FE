"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../hooks/use-api";

interface Member {
  id: string;
  groupId: string;
  studentId: string;
  studentFullName: string;
  studentEmail: string;
  isLeader: boolean;
  status: string;
}

interface Request {
  groupMemberRequestSentByLeader: Member[];
  groupMemberRequested: Member[] ;
}

interface Group {
  id: string;
  campusName: string;
  semesterName: string;
  majorName: string;
  capstoneName: string;
  groupCode: string;
  topicCode: string;
  groupMemberList: Member[];
  status: string;
}

interface StudentGroupContextType {
  groupInfo: Group | null;
  listrequest: Request | null;
  createGroup: () => Promise<void>;
  fetchGroupInfo: () => Promise<void>;
  getGroupMemberReq: () => Promise<void>;
  inviteMember: (data: any) => Promise<void>;
  registerGroup: (groupId: string) => Promise<void>;
  updateStatusInvitation: (data: any) => Promise<void>;
  updateStatusReq: (data: any) => Promise<void>;
}

const StudentGroupContext = createContext<StudentGroupContextType | undefined>(
  undefined
);

export const StudentGroupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { callApi } = useApi();
  const [groupInfo, setGroupInfo] = useState<Group | null>(null);
  const [listrequest, setListRequest] = useState<Request | null>(null);

  const fetchGroupInfo = async () => {
    try {
      const response = await callApi("fuc/Group/get-by-student-id", {
        method: "GET",
      });
      setGroupInfo(response?.value);
    } catch (error) {
      toast.error("Error fetching group info", {
        description: `${error}`,
      });
    }
  };

  const getGroupMemberReq = async () => {
    try {
      const response = await callApi(
        "fuc/Group/student/get-group-member-request",
        {
          method: "GET",
        }
      );
      setListRequest(response?.value);
    } catch (error) {
      toast.error("Error fetching group info", {
        description: `${error}`,
      });
    }
    // const response = await callApi(
    //   "fuc/Group/student/get-group-member-request",
    //   {
    //     method: "GET",
    //   }
    // );
    // if (response?.isSuccess === true) {
    //   toast.success("Get re successfully");
    // }
    // return response.value;
  };

  const createGroup = async () => {
    const response = await callApi("fuc/Group", {
      method: "POST",
    });
    if (response?.isSuccess === true) {
      toast.success("Create group successfully");
      fetchGroupInfo();
    }
    return response;
  };

  const inviteMember = async (data: any) => {
    const response = await callApi("fuc/Group/add-member", {
      method: "POST",
      body: data,
    });
    if (response?.isSuccess === true) {
      toast.success("Send invitation successfully");
      fetchGroupInfo();
      getGroupMemberReq();
    }
    return response;
  };

  const updateStatusInvitation = async (data: any) => {
    const response = await callApi("fuc/Group/update-group-member-status", {
      method: "PUT",
      body: data,
    });
    if (response?.isSuccess === true) {
      toast.success("Update status invitation successfully");
      fetchGroupInfo();
      getGroupMemberReq();
    }
    return response;
  };

  const registerGroup = async (groupId: string) => {
    const response = await callApi(`fuc/Group/${groupId}`, {
      method: "PUT",
    });
    if (response?.isSuccess === true) {
      toast.success("Register group successfully");
      fetchGroupInfo();
    }
    return response;
  };


  const updateStatusReq = async (data: any) => {
    const response = await callApi("fuc/Group/update-group-member-status", {
      method: "PUT",
      body: data,
    });
    if (response?.isSuccess === true) {
      toast.success("Update status invitation successfully");
      getGroupMemberReq();
      fetchGroupInfo();
    }
    return response;
  };

  useEffect(() => {
    fetchGroupInfo();
    getGroupMemberReq();
  }, []);


  return (
    <StudentGroupContext.Provider
      value={{
        groupInfo,
        listrequest,
        fetchGroupInfo,
        createGroup,
        inviteMember,
        getGroupMemberReq,
        updateStatusInvitation,
        registerGroup,
        updateStatusReq,
      }}
    >
      {children}
    </StudentGroupContext.Provider>
  );
};

export const useStudentGroup = () => {
  const context = useContext(StudentGroupContext);
  if (context === undefined) {
    throw new Error(
      "useStudentGroup must be used within a StudentGroupProvider"
    );
  }
  return context;
};

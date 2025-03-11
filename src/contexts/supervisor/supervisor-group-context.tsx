"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/use-api";
import { usePathname } from "next/navigation";

export interface Group {
  groupId: string,
  semesterCode: string,
  topicCode: string,
  groupCode: string,
  englishName: string
}

interface SupervisorGroupContextType {
  groupList: Group[];
  groupTopicInfo: {};
}

const SupervisorGroupContext = createContext<
  SupervisorGroupContextType | undefined
>(undefined);

export const SupervisorGroupProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { callApi } = useApi();
  const pathName = usePathname();
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [groupTopicInfo, setGroupTopicInfo] = useState<{}>({});

  const getGroupManageBySupervisor = async () => {
    const response = await callApi("fuc/group/manage");
    setGroupList(response?.value);
  };

  const getTopicGroupInformation = async (groupId: string) => {
    const response = await callApi("fuc/Group/information");
    setGroupTopicInfo(response?.value);
  };

  useEffect(() => {
    if (pathName === "/supervisor/groups") {
      getGroupManageBySupervisor();
    }
  }, []);

  return (
    <SupervisorGroupContext.Provider
      value={{
        groupList,
        groupTopicInfo
      }}
    >
      {children}
    </SupervisorGroupContext.Provider>
  );
};

export const useSupervisorGroup = () => {
  const context = useContext(SupervisorGroupContext);
  if (context === undefined) {
    throw new Error(
      "useSupervisorGroup must be used within a SupervisorGroupProvider"
    );
  }
  return context;
};

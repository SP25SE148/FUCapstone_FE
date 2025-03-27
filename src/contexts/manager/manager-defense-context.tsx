"use client";

import { toast } from "sonner";
import React, { createContext, useContext } from "react";

import { useApi } from "@/hooks/use-api";

interface ManagerDefenseContextProps {
  getDefensesCalendarTemplate: () => Promise<string>;
  importDefenseCalendar: (data: any) => Promise<void>;
}

const ManagerDefenseContext = createContext<
  ManagerDefenseContextProps | undefined
>(undefined);

export const ManagerDefenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { callApi } = useApi();
//   const [defenseCalendar, setDefenseCalendar] = useState<ReviewCalendar[]>([]);

  const getDefensesCalendarTemplate = async () => {
    const response = await callApi("fuc/Documents/defense-calendar");
    return response?.value;
  };

//   const getReviewCalendar = async () => {
//     const response = await callApi("fuc/user/defend/calendar");
//     setReviewCalendar(response?.value);
//   };

const importDefenseCalendar = async (data: any) => {
        const response: any = await callApi("fuc/user/defend/calendar", {
            method: "POST",
            body: data,
        });

        if (response?.isSuccess === true) {
            // getReviewCalendar();
            toast.success("Import denfense calendar successfully");
        }
        return response
    };

  return (
    <ManagerDefenseContext.Provider
      value={{
        getDefensesCalendarTemplate,
        importDefenseCalendar,
      }}
    >
      {children}
    </ManagerDefenseContext.Provider>
  );
};

export const useManagerDefense = () => {
  const context = useContext(ManagerDefenseContext);
  if (!context) {
    throw new Error(
      "useManagerDefense must be used within a ManagerDefenseProvider"
    );
  }
  return context;
};

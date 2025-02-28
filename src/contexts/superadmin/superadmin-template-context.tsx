"use client";

import { useApi } from "@/hooks/use-api";
import React, { createContext, useContext, useState, useEffect } from "react";

export interface Template {
  id: string;
  fileUrl: string;
  isActive: boolean;
  createdBy: string;
  createdDate: string;
}

interface SuperadminTemplateContextProps {
  isLoading: boolean;
  templates: Template[];
  fetchTemplateList: () => Promise<void>;
  getPresignedUrlTemplateDocument: (id: string) => Promise<string>;
}

const SuperadminTemplateContext = createContext<SuperadminTemplateContextProps | undefined>(undefined);

export const SuperadminTemplateProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [templates, setTemplates] = useState<Template[]>([]);

  const fetchTemplateList = async () => {
    setIsLoading(true);
    try {
      const response = await callApi("fuc/Documents/templates", {
        method: "GET",
      });
      setTemplates(response?.value || []);
    } finally {
      setIsLoading(false);
    }
  };

  const getPresignedUrlTemplateDocument = async (id: string) => {
    const response = await callApi(`fuc/Documents/template/presigned/${id}`, {
      method: "GET",
    });    
    return (response?.value);
  };

  useEffect(() => {
    fetchTemplateList();
  }, []);

  return (
    <SuperadminTemplateContext.Provider value={{ templates, isLoading, fetchTemplateList, getPresignedUrlTemplateDocument }}>
      {children}
    </SuperadminTemplateContext.Provider>
  );
};

export const useSuperadminTemplate = () => {
  const context = useContext(SuperadminTemplateContext);
  if (!context) {
    throw new Error("useSuperadminTemplate must be used within an SuperadminTemplateProvider");
  }
  return context;
};
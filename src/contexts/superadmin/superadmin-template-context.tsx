"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useState, useEffect } from "react";

import { useApi } from "@/hooks/use-api";
import { Template } from "@/types/types";

interface SuperadminTemplateContextProps {
  isLoading: boolean;
  templates: Template[];
  subFolder: Template[];
  fetchTemplateList: () => Promise<void>;
  getTemplateById: (id: string) => Promise<any>;
  deleteTemplateDocument: (id: string) => Promise<any>;
  createFileTemplateDocument: (data: any) => Promise<any>;
  updateStatusTemplateDocument: (id: string) => Promise<any>;
  getPresignedUrlTemplateDocument: (id: string) => Promise<string>;
  createFolderTemplateDocument: (data: { parentId: string, folderName: string }) => Promise<any>;
}

const SuperadminTemplateContext = createContext<SuperadminTemplateContextProps | undefined>(undefined);

export const SuperadminTemplateProvider = ({ children }: { children: React.ReactNode }) => {
  const { callApi } = useApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [subFolder, setSubFolder] = useState<Template[]>([]);

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
    const response = await callApi(`fuc/Documents/templates/presigned/${id}`, {
      method: "GET",
    });
    return (response?.value);
  };

  const createFolderTemplateDocument = async (data: { parentId: string, folderName: string }) => {
    const response = await callApi("fuc/Documents/templates/folder", {
      method: "POST",
      body: data
    });
    if (response?.isSuccess === true) {
      toast.success("Create folder successfully")
    }
    return response;
  };

  const getTemplateById = async (templateId: string) => {
    const response = await callApi(`fuc/Documents/templates?templateid=${templateId}`, {
      method: "GET",
    });
    setSubFolder(response?.value || []);
  };

  const createFileTemplateDocument = async (data: any) => {
    const response: any = await callApi("fuc/Documents/templates/file", {
      method: "POST",
      body: data,
    });

    if (response?.isSuccess === true) {
      toast.success("Upload file successfully");
    }
    return response
  };

  const deleteTemplateDocument = async (templateId: string) => {
    const response = await callApi(`fuc/Documents/templates/${templateId}`, {
      method: "DELETE",
    });
    if (response?.isSuccess === true) {
      toast.success("Delete folder/file successfully");
    }
    return response
  };

  const updateStatusTemplateDocument = async (templateId: string) => {
    const response = await callApi(`fuc/Documents/templates/${templateId}`, {
      method: "PUT",
    });
    if (response?.isSuccess === true) {
      toast.success("Update status file successfully");
    }
    return response
  };

  useEffect(() => {
    fetchTemplateList();
  }, []);

  return (
    <SuperadminTemplateContext.Provider
      value={{
        templates,
        subFolder,
        isLoading,
        getTemplateById,
        fetchTemplateList,
        deleteTemplateDocument,
        createFileTemplateDocument,
        updateStatusTemplateDocument,
        createFolderTemplateDocument,
        getPresignedUrlTemplateDocument,
      }}
    >
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
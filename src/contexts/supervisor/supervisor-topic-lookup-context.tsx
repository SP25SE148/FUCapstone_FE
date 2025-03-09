"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/use-api";

interface Campus {
  id: string,
  name: string,
  address: string,
  phone: string,
  email: string,
  isDeleted: boolean,
  createdDate: string,
  updatedDate: string | null,
  createdBy: string,
  updatedBy: string | null,
  deletedAt: string | null
}

interface Semester {
  id: string,
  name: string,
  startDate: string,
  endDate: string,
  isDeleted: boolean,
  createdDate: string,
  updatedDate: string | null,
  createdBy: string,
  updatedBy: string | null,
  deletedAt: string | null
}

interface Capstone {
  id: string,
  majorId: string,
  name: string,
  minMember: number,
  maxMember: number,
  reviewCount: number,
  durationWeeks: number,
  isDeleted: boolean,
  deletedAt: string | null
}

interface BusinessArea {
  id: string;
  name: string;
  description: string;
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

export interface LookupProp {
  mainSupervisorEmail: string,
  searchTerm: string,
  status: string,
  difficultyLevel: string,
  businessAreaId: string,
  capstoneId: string,
  semesterId: string,
  campusId: string,
  pageNumber: string,
}

interface LookupList {
  items: Topic[],
  totalNumberOfItems: number,
  currentPage: number,
  totalNumberOfPages: number,
}

interface SupervisorTopicLookupContextType {
  lookupList: LookupList;
  campusList: Campus[];
  semesterList: Semester[];
  capstoneList: Capstone[];
  businessAreaList: BusinessArea[];
  lookupTopic: (data: LookupProp) => Promise<any>;
  getPresignedUrlTopicDocument: (id: string) => Promise<string>;
}

const SupervisorTopicLookupContext = createContext<
  SupervisorTopicLookupContextType | undefined
>(undefined);

export const SupervisorTopicLookupProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { callApi } = useApi();
  const [lookupList, setLookupList] = useState<LookupList>({
    items: [],
    totalNumberOfItems: 0,
    currentPage: 0,
    totalNumberOfPages: 0,
  });
  const [campusList, setCampusList] = useState<Campus[]>([]);
  const [semesterList, setSemesterList] = useState<Semester[]>([]);
  const [capstoneList, setCapstoneList] = useState<Capstone[]>([]);
  const [businessAreaList, setBusinessAreaList] = useState<BusinessArea[]>([]);

  const fetchCampusList = async () => {
    const response = await callApi("fuc/AcademicManagement/campus");
    setCampusList(response?.value);
  };

  const fetchSemesterList = async () => {
    const response = await callApi("fuc/AcademicManagement/semester");
    setSemesterList(response?.value);
  };

  const fetchCapstoneList = async () => {
    const response = await callApi("fuc/AcademicManagement/capstone");
    setCapstoneList(response?.value);
  };

  const fetchBusinessArea = async () => {
    const response = await callApi(`fuc/topics/business`);
    setBusinessAreaList(response.value);
  };

  const lookupTopic = async (data: LookupProp) => {
    const response = await callApi(`fuc/topics?MainSupervisorEmail=${data?.mainSupervisorEmail}&SearchTerm=${data?.searchTerm}&Status=${data?.status}&DifficultyLevel=${data?.difficultyLevel}&BusinessAreaId=${data?.businessAreaId}&CapstoneId=${data?.capstoneId}&SemesterId=${data?.semesterId}&CampusId=${data?.campusId}&PageNumber=${data?.pageNumber}&PageSize=5`, {
      method: "GET",
    });
    setLookupList(response?.value);
    return response;
  };

  const getPresignedUrlTopicDocument = async (id: string) => {
    const response = await callApi(`fuc/topics/presigned/${id}`);
    return (response?.value);
  };

  useEffect(() => {
    fetchCampusList();
    fetchSemesterList();
    fetchCapstoneList();
    fetchBusinessArea();
  }, []);

  return (
    <SupervisorTopicLookupContext.Provider
      value={{
        lookupList,
        campusList,
        semesterList,
        capstoneList,
        businessAreaList,
        lookupTopic,
        getPresignedUrlTopicDocument,
      }}
    >
      {children}
    </SupervisorTopicLookupContext.Provider>
  );
};

export const useSupervisorTopicLookup = () => {
  const context = useContext(SupervisorTopicLookupContext);
  if (context === undefined) {
    throw new Error(
      "useSupervisorTopicLookup must be used within a SupervisorTopicLookupProvider"
    );
  }
  return context;
};

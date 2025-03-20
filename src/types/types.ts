// support types
export interface BusinessArea {
  id: string;
  name: string;
  description: string;
}

// main types

export type Campus = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string | null;
  createdBy: string;
  updatedBy: string | null;
  deletedAt: string | null;
};

export interface StudentProfile {
  id: string;
  fullName: string;
  majorId: string;
  majorName: string;
  capstoneId: string;
  capstoneName: string;
  campusId: string;
  campusName: string;
  email: string;
  isEligible: boolean;
  status: string;
  gpa: number;
  businessArea: string;
  isHaveBeenJoinGroup: boolean;
}


export interface Topic {
  id: string;
  code: string;
  numberOfTopicRequest: number;
  mainSupervisorName: string;
  mainSupervisorEmail: string;
  englishName: string;
  vietnameseName: string;
  abbreviation: string;
  description: string;
  fileName: string;
  fileUrl: string;
  status: string;
  difficultyLevel: string;
  businessAreaName: string;
  capstoneId: string;
  semesterId: string;
  campusId: string;
  createdDate: string;
  coSupervisors: any[];
  topicAppraisals: any[];
}

export interface ProjectProgressWeek {
  id: string;
  weekNumber: number;
  taskDescription: string;
  status: number;
  meetingLocation: string | null;
  meetingContent: string | null;
  summary: string | null;
}

export interface ProjectProgress {
  id: string;
  meetingDate: string;
  projectProgressWeeks: ProjectProgressWeek[]
}

export interface RequestsOfTopic{
  topicRequestId: string;
  groupCode: string;
  groupId: string;
  supervisorId: string;
  supervisorFullName: string;
  topicId: string;
  topicCode: string;
  topicEnglishName: string;
  status: string;
  requestedBy: string;
  gpa: number;
  leaderFullName: string;
  createdDate: string

}

// support types
export interface BusinessArea {
    id: string;
    name: string;
    description: string;
}

// main types
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

export interface ProjectProgressWeek {
  id: string,
  weekNumber: number,
  taskDescription: string,
  status: number,
  meetingLocation: string | null,
  meetingContent: string | null
}

export interface ProjectProgress {
  id: string,
  meetingDate: string,
  projectProgressWeeks: ProjectProgressWeek[]
}

import { Topic } from "@/types/types";

export interface DefendCapstoneProjectCouncilMember {
  id: string;
  name: string;
  isPresident: boolean;
  isSecretary: boolean;
}

export interface DefendCapstoneProjectInformation {
  id: string;
  topic: Topic; // Update to use Topic type
  defendAttempt: boolean;
  semesterName: string;
  roomNo: string;
  date: string;
  isActive: boolean;
  councilMembers: DefendCapstoneProjectCouncilMember[];
}

export const defenseData: DefendCapstoneProjectInformation[] = [
  {
    id: "1",
    topic: {
      id: "T1",
      code: "AIH-2025",
      numberOfTopicRequest: 5,
      mainSupervisorName: "Dr. John Smith",
      mainSupervisorEmail: "john.smith@example.com",
      englishName: "AI in Healthcare",
      vietnameseName: "Trí tuệ nhân tạo trong y tế",
      abbreviation: "AIH",
      description: "Exploring the use of AI in healthcare systems.",
      fileName: "ai_healthcare.pdf",
      fileUrl: "/files/ai_healthcare.pdf",
      status: "Approved",
      difficultyLevel: "Medium",
      businessAreaName: "Healthcare",
      capstoneId: "C1",
      semesterId: "S1",
      campusId: "Campus1",
      createdDate: "2025-01-15",
      coSupervisors: [
        {
          SupervisorName: "Dr. Alice Johnson",
          SupervisorEmail: "alice.johnson@example.com",
        },
      ],
      topicAppraisals: [],
    },
    defendAttempt: true,
    semesterName: "Fall 2025",
    roomNo: "Room 101",
    date: "2025-04-15",
    isActive: true,
    councilMembers: [
      { id: "1", name: "Dr. John Smith", isPresident: true, isSecretary: false },
      { id: "2", name: "Dr. Jane Doe", isPresident: false, isSecretary: true },
      { id: "3", name: "Dr. Alice Johnson", isPresident: false, isSecretary: false },
      { id: "4", name: "Dr. Bob Brown", isPresident: false, isSecretary: false },
      { id: "5", name: "Dr. Charlie White", isPresident: false, isSecretary: false },
    ],
  },
  // Add more topics as needed...
];
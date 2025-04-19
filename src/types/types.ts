//#region Support Types

export interface User {
  name: string;
  MajorId: string;
  CampusId: string;
  CapstoneId: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
}

export interface DecodedToken extends User {
  iss: string;
  aud: string;
  exp: number;
}

export interface Campus {
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

export interface Semester {
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

export interface MajorGroup {
  id: string;
  name: string;
  description: string;
  isDeleted: boolean;
  deletedAt: string | null;
};

export interface Major {
  id: string,
  majorGroupId: string,
  name: string,
  description: string,
  isDeleted: boolean,
  deletedAt: string | null
}

export interface Capstone {
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

export interface BusinessArea {
  id: string;
  name: string;
  description: string;
}

export interface Admin {
  userId: string;
  userCode: string;
  fullName: string;
  email: string;
  majorId: string;
  campusId: string;
  capstoneId: string;
};

export interface Manager {
  userId: string
  fullName: string
  userCode: string
  email: string
  campusId: string
  majorId: string
  capstoneId: string
}

export interface Supervisor {
  id: string;
  fullName: string;
  majorId: string;
  majorName: string;
  campusId: string;
  campusName: string;
  email: string;
}

export interface Student {
  id: string;
  fullName: string;
  majorId: string;
  majorName: string;
  capstoneId: string;
  capstoneName: string;
  campusId: string;
  campusName: string;
  email: string;
  status: string;
  gpa: number;
  skills: string;
  businessArea: string;
  isHaveBeenJoinGroup: boolean;
}

export interface InviteStudent {
  id: string;
  email: string;
}

//#endregion

//#region Template Types

export interface Template {
  id: string;
  fileUrl: string;
  fileName: string;
  isActive: boolean;
  isFile: boolean;
  createdBy: string;
  createdDate: string;
}

//#endregion

//#region Config Types

export interface SystemConfig {
  maxTopicsForCoSupervisors: number;
  maxTopicAppraisalsForTopic: number;
  expirationTopicRequestDuration: number;
  expirationTeamUpDuration: number;
  maxAttemptTimesToDefendCapstone: number;
  maxAttemptTimesToReviewTopic: number
  semanticTopicThroughSemesters: number;
  timeConfigurationRemindInDaysBeforeDueDate: number;
  projectProgressRemindInDaysBeforeDueDate: number;
}

export interface TimeConfig {
  id: string,
  teamUpDate: string,
  teamUpExpirationDate: string,
  registTopicDate: string,
  registTopicExpiredDate: string,
  isActived: boolean,
  campusId: string
}

//#endregion 

//#region Topic Types

export interface PassedTopic {
  items: Topic[],
  totalNumberOfItems: number,
  currentPage: number,
  totalNumberOfPages: number,
}

export interface PassedTopicProp {
  mainSupervisorEmail: string,
  searchTerm: string,
  difficultyLevel: string,
  businessAreaId: string,
  pageNumber: string,
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
  coSupervisors: {
    supervisorCode: string,
    supervisorName: string,
    supervisorEmail: string
  }[];
  topicAppraisals: any[];
}

export interface StatisticItem {
  analysisTopicId: string,
  englishName: string,
  similarity: number
}

export interface Statistic {
  analysises: StatisticItem[],
  over80Ratio: number,
  over90Ratio: number,
  createdDate: string,
  processedBy: string,
  statusSemantic: string
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

export interface LookupList {
  items: Topic[],
  totalNumberOfItems: number,
  currentPage: number,
  totalNumberOfPages: number,
}

export interface TopicAppraisal {
  topicAppraisalId: string,
  topicId: string,
  supervisorId: string | null,
  topicEnglishName: string,
  appraisalContent: string | null,
  appraisalComment: string | null,
  status: string | number,
  attemptTime: number,
  appraisalDate: string | null,
  createdDate: string | null
}

export interface RequestsOfTopic {
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
  reason: string;
  createdDate: string
}

export interface TopicRequest {
  [key: string]: RequestsOfTopic[];
}

//#endregion

//#region Group Types

export interface Member {
  id: string;
  groupId: string;
  studentId: string;
  studentFullName: string;
  studentEmail: string;
  gpa: number;
  skills: string;
  isLeader: boolean;
  createdBy: string,
  createdDate: string,
  status: string;
}

export interface GroupShortInfo {
  groupId: string,
  semesterCode: string,
  topicCode: string,
  groupCode: string,
  englishName: string
}

export interface GroupFullInfo {
  id: string;
  supervisorId: string,
  supervisorName: string,
  campusName: string;
  semesterName: string;
  majorName: string;
  capstoneName: string;
  groupCode: string;
  topicCode: string;
  isUploadGroupDocument: true;
  averageGPA: number;
  currentNumberOfGroupPerMax: string;
  status: string;
  groupMemberList: Member[];
  topicResponse: Topic
}

//#endregion

//#region Project Progress Types

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
  slot: string;
  projectProgressWeeks: ProjectProgressWeek[]
}

export interface EvaluationData {
  studentId: string;
  contributionPercentage: number;
  comments: string;
  status: number | null;
}

export interface EvaluationWeek {
  weekNumber: number,
  contributionPercentage: number,
  summary: string | null,
  meetingContent: string,
  comments: string,
  status: string
}

export interface EvaluationStudent {
  studentCode: string,
  studentName: string,
  studentRole: string,
  averageContributionPercentage: number,
  evaluationWeeks: EvaluationWeek[]
}

//#endregion

//#region Task Types

export interface TaskRequest {
  KeyTask: string;
  Description: string;
  Summary: string;
  AssigneeId: string;
  ProjectProgressId: string;
  Priority: number;
  DueDate: string;
}

export interface FucTaskHistory {
  id: string,
  taskId: string,
  content: string,
  createdDate: string
}

export interface Task {
  id: string;
  keyTask: string;
  description: string;
  summary: string;
  assigneeId: string;
  assigneeName: string;
  reporterId: string;
  reporterName: string;
  status: number;
  priority: number;
  dueDate: string;
  createdDate: string;
  projectProgressId: string | null;
  lastUpdatedDate: string | null;
  completionDate: string | null;
  fucTaskHistories: FucTaskHistory[]
}

export interface DashBoardFucTask {
  totalTasks: number,
  totalInprogressTasks: number,
  totalToDoTasks: number,
  totalDoneTasks: number,
  totalExpiredTasks: number
}

export interface DashBoardFucTasksStudents {
  dashBoardFucTask: DashBoardFucTask,
  studentId: string
}

export interface DashBoardTask {
  dashBoardFucTask: DashBoardFucTask,
  dashBoardFucTasksStudents: DashBoardFucTasksStudents[]
}

//#endregion 

//#region Review Types

export interface ReviewCalendar {
  id: string,
  topicId: string,
  topicCode: string,
  groupId: string,
  groupCode: string,
  topicEnglishName: string,
  mainSupervisorCode: string,
  coSupervisorsCode: [],
  attempt: number,
  time: string,
  room: string,
  date: string,
  reviewers: string[]
  status: string
}

export interface ReviewCriteria {
  id: string,
  attempt: number,
  name: string,
  description: string,
  requirement: string
}

export interface ResultDetail {
  suggestion: string | undefined,
  comment: string | undefined,
  isReview: boolean,
  author: string
}

export interface ReviewResult {
  attempt: number,
  reviewCalendarResultDetailList: ResultDetail[]
}

//#endregion

//#region Decision Types

export interface StudentDecision {
  studentId: string,
  studentFullName: string,
  decision: string
}

export interface Decision {
  groupId: string,
  groupCode: string,
  topicId: string,
  supervisorName: string,
  topicCode: string,
  decision: string,
  comment: string | null,
  studentDecisionList: StudentDecision[]
}

//#endregion

//#region Defense Types

export interface CouncilMember {
  id: string;
  supervisorId: string;
  defendCapstoneProjectInformationCalendarId: string;
  supervisorName: string;
  isPresident: boolean;
  isSecretary: boolean;
}

export interface DefenseCalendarItem {
  id: string;
  topicId: string;
  topicCode: string;
  groupId: string;
  groupCode: string;
  campusId: string;
  semesterId: string;
  defendAttempt: number;
  defenseDate: string;
  location: string;
  time: string;
  status: string;
  councilMembers: CouncilMember[];
}

export interface DefenseCalendarItemFullInfo extends DefenseCalendarItem {
  supervisorId: string;
  supervisorName: string;
  topicEngName: string;
  topicVietName: string;
  abbreviation: string;
  description: string;
  capstoneId: string;
}

export interface DefenseCalendar {
  [key: string]: DefenseCalendarItem[];
}

export interface DefenseResult extends DefenseCalendarItem {
  groupStatus: string,
  isReDefendCapstone: boolean,
}

//#endregion